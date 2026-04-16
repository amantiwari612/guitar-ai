import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const corsOriginsEnv = process.env.CORS_ORIGINS;

console.log("corsOriginsEnv", corsOriginsEnv);
const allowedOrigins = corsOriginsEnv
  ? corsOriginsEnv.split(",").map((origin) => origin.trim())
  : [];

console.log("a", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`❌ Blocked by CORS: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

const app = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

export default app;