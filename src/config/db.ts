import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");

export const db = client.db("ferreteria");
console.log("URL de Mongo:", process.env.MONGO_URI);
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
}
