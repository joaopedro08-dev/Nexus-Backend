import { DatabaseSync } from "node:sqlite";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

const isProd = process.env.NODE_ENV === "production";

const dbDirectory = isProd ? "/app/data" : join(process.cwd(), "database");

if (!existsSync(dbDirectory)) {
    mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = join(dbDirectory, 'messages.db');
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    sender TEXT NOT NULL,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;