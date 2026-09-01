import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.MONGO_URL;

const client = new MongoClient(url);

const connection = client.connect();

const collectionName = "notes";

export { collectionName, connection };