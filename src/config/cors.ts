export const corsOptions = {
  origin: ['http://localhost:3000', 'https://nexus-ai-rouge.vercel.app'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 201,
};