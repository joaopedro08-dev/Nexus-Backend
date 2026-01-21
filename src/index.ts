import express from "express";
import cors from "cors"; 
import { readFileSync } from 'fs';
import { join } from 'path';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { MessageController } from "@/controller/MessageController";
import { corsOptions } from "@/config/cors"; 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const isProd = process.env.NODE_ENV === "production";

const schemaPath = isProd 
    ? join(process.cwd(), 'dist/schema/schema.graphql') 
    : join(process.cwd(), 'src/schema/schema.graphql');

const schemaString = readFileSync(schemaPath, 'utf8');
const schema = buildSchema(schemaString);

const root = {
    getMessages: MessageController.getMessages,
    sendMessage: MessageController.sendMessage,
    deleteAllMessages: MessageController.deleteAllMessages,
};

app.all('/graphql', createHandler({ 
    schema: schema, 
    rootValue: root 
}));

app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(PORT, () => {
    console.log(`🚀 Nexus API rodando na porta ${PORT}`);
});