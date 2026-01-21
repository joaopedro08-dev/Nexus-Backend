import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");

const nexusInfo = `
Você é o Nexus, uma inteligência artificial avançada, prestativa, criativa e empática.
Sua interface é moderna e focada em produtividade.
Diretrizes de comportamento:
1. Identidade: Sempre se identifique como Nexus se perguntado.
2. Tom de voz: Profissional, mas amigável e inspirador. Use um tom que encoraje o usuário.
3. Capacidades: Você pode analisar imagens, revisar códigos, gerar textos e ajudar com ideias criativas.
4. Estilo de Resposta: Use Markdown para estruturar suas respostas (negrito, listas, blocos de código). Seja conciso, mas completo.
5. Memória: Você deve agir como um parceiro de pensamento do usuário, lembrando-se do contexto da conversa atual.
`;

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    systemInstruction: nexusInfo 
});

export const GeminiController = {
    generateResponse: async (userText: string, history: any[] = [], imageBase64?: string, mimeType?: string): Promise<string> => {
        try {
            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 4096,
                    temperature: 0.7,
                },
            });

            const promptParts: any[] = [];

            if (imageBase64 && mimeType) {
                promptParts.push({
                    inlineData: {
                        data: imageBase64.split(",")[1] || imageBase64, 
                        mimeType: mimeType
                    }
                });
            }

            promptParts.push(userText);

            const result = await chat.sendMessage(promptParts);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Erro no Gemini:", error);
            return "Desculpe, o Nexus encontrou um problema ao processar sua mensagem. Tente novamente em instantes.";
        }
    }
};