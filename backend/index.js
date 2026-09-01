import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
const app = e();

app.use(e.json());
app.use(cors());
app.post("/add-notes", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);

    if (result) {
        res.send({
            message: "new note is added",
            success: true,
            result
        })
    } else {
        res.send({
            message: "note is not added",
            success: false
        })
    }
})

app.get("/notes", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();

    if (result) {
        res.send({
            message: "notes list fetched",
            success: true,
            result
        })
    } else {
        res.send({
            message: "error! try again letter",
            success: false
        })
    }
})



app.listen(3200, () => {
    console.log("Server running on port 3200");
});