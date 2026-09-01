import e from "express";
import { collectionName, connection } from "./dbconfig.js";

const app = e();

app.use(e.json());

app.get("/", (req, res) => {
    res.send({
        message: "Basic API is working ...",
        success: true
    });
});

app.listen(3200, () => {
    console.log("Server running on port 3200");
});