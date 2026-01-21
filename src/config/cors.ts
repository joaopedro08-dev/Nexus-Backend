export const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://nexus-ai-rouge.vercel.app',
    'https://nexus-54lgeynj3-joao-pedros-projects-e4d47d8c.vercel.app' 
  ],
  methods: ['POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, 
  optionsSuccessStatus: 200, 
};