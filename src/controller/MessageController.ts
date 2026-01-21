import db from '@/lib/database.js';
import { GeminiController } from './GeminiController.js';
import { CloudinaryService } from '@/service/CloudinaryService.js';

const formatarDataBR = (dataStr: string): string => {
    const data = new Date(dataStr);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).format(data);
};

export const MessageController = {
    getMessages: async (): Promise<any[]> => {
        const rows = db.prepare('SELECT * FROM messages ORDER BY createdAt ASC').all() as any[];
        return rows.map(row => ({
            id: row.id.toString(),
            text: row.text,
            sender: row.sender,
            imageUrl: row.imageUrl,
            createdAt: formatarDataBR(row.createdAt),
            updateAt: formatarDataBR(row.createdAt)
        }));
    },

    sendMessage: async (args: { text: string; image?: string }): Promise<any> => {
        const { text, image } = args;
        let finalImageUrl = null;

        if (image) {
            finalImageUrl = await CloudinaryService.uploadImage(image);
        }

        const insert = db.prepare('INSERT INTO messages (text, sender, imageUrl) VALUES (?, ?, ?)');
        insert.run(text, "user", finalImageUrl);
        const userMsgId = (db.prepare('SELECT last_insert_rowid() as id').get() as any).id;

        const rawHistory = db.prepare('SELECT text, sender FROM messages WHERE id < ? ORDER BY createdAt DESC LIMIT 10').all(userMsgId) as any[];
        const formattedHistory = rawHistory.reverse().map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        }));

        const pureBase64 = image ? image.split(',')[1] : undefined;
        const aiResponseText = await GeminiController.generateResponse(
            text,
            formattedHistory,
            pureBase64,
            image ? "image/jpeg" : undefined
        );

        insert.run(aiResponseText, "ai", null);
        const aiMsgId = (db.prepare('SELECT last_insert_rowid() as id').get() as any).id;
        const msg = db.prepare('SELECT * FROM messages WHERE id = ?').get(aiMsgId) as any;

        return {
            id: msg.id.toString(),
            text: msg.text,
            sender: msg.sender,
            imageUrl: msg.imageUrl,
            createdAt: formatarDataBR(msg.createdAt)
        };
    },

    deleteAllMessages: async (): Promise<string> => {
        db.prepare('DELETE FROM messages').run()
        return `Todas as mensagens foram deletadas!`;
    }
};