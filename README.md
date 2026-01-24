# 🧠 Nexus Backend

The **Nexus Backend** is the intelligent processing core of the Nexus platform.  
It handles data persistence, GraphQL communication, and integration with the **Google Gemini API** to deliver smart conversational responses and image analysis.

---

## 🚀 Tech Stack

This project is built using the following technologies:

- **Node.js** – JavaScript runtime environment  
- **GraphQL** – Flexible and efficient API query language  
- **Better-SQLite3** – Lightweight and extremely fast SQL database  
- **Google Gemini API** – AI engine for text generation and computer vision  
- **Cloudinary** – Cloud-based image storage and optimization  
- **TypeScript** – Static typing for improved safety and productivity  

---

## 🛠️ Features

- **Intelligent Chat** – Message processing with contextual history  
- **Image Analysis** – Multimodal input support (text + image)  
- **Local Persistence** – Message history stored in SQLite  
- **Timezone Handling** – Automatic timezone handling (`America/Sao_Paulo`)  
- **Media Management** – Image upload and optimization via Cloudinary  

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nexus-backend.git
cd message-backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
GEMINI_API_KEY=your_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the server

```bash
pnpm run dev
```

---

## 🔌 GraphQL API

The server runs by default at:

```
http://localhost:4000/graphql
```

### Main Queries

- **getMessages** – Retrieves the full formatted conversation history

### Main Mutations

- **sendMessage(text, image)** – Sends a new message (optionally with an image) and returns the AI response  
- **deleteAllMessages** – Clears the entire message history from the database  

---

## 🗄️ Project Structure

```
src/
├── config/         # CORS configuration
├── controllers/    # Business logic and formatting
├── lib/            # Database configuration
├── service/        # External integrations (Cloudinary)
├── schema/        # Schemas GraphQL
└── index.ts       # Application entry point
```
