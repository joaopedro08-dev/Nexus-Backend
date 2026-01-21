export const corsOptions = {
  origin: ['http://localhost:3000', 'https://anotherdomain.com'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 201,
};