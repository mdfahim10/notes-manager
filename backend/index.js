import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = e();

app.use(e.json());
app.use(cors());
app.post("/add-notes", async (req, res) => {

    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        res.send({
            message: "New note is added",
            success: true,
            result
        });
    } else {
        res.send({
            message: "Note is not added",
            success: false
        });
    }
});

app.get("/notes", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();
    if (result) {
        res.send({
            message: "Notes list fetched",
            success: true,
            result
        });
    } else {
        res.send({
            message: "Error! Try again later",
            success: false
        });
    }
});

app.get("/notes/:id", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const id = req.params.id;
    const result = await collection.findOne({
        _id: new ObjectId(id)
    });
    if (result) {
        res.send({
            message: "Note fetched",
            success: true,
            result
        });
    } else {
        res.send({
            message: "Note not found",
            success: false
        });
    }
});

app.put("/update/:id", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const id = req.params.id;
    const result = await collection.updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: req.body
        }
    );
    if (result.modifiedCount > 0) {
        res.send({
            message: "Note updated",
            success: true,
            result
        });
    } else {
        res.send({
            message: "Note not updated",
            success: false,
            result
        });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const id = req.params.id;
    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    });
    if (result.deletedCount > 0) {
        res.send({
            message: "Note Deleted",
            success: true,
            result
        });
    } else {
        res.send({
            message: "Note not found",
            success: false,
            result
        });
    }
});

app.listen(3200, () => {
    console.log("Server running on port 3200");
});