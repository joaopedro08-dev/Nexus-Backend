import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME as string,
    api_key: process.env.CLOUDINARY_KEY as string,
    api_secret: process.env.CLOUDINARY_SECRET as string,
});

export const CloudinaryService = {
    uploadImage: async (fileBase64: string): Promise<string> => {
        try {
            const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
                folder: 'chat-gemini',
            });
            return uploadResponse.secure_url;
        } catch (error) {
            console.error("Erro no Cloudinary:", error);
            throw new Error("Falha ao subir imagem");
        }
    }
};