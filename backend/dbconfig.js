import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

const connection = async () => {
    const db = await client.connect();
    return db.db("notes-manager");
};

const collectionName = "notes";

export { collectionName, connection };