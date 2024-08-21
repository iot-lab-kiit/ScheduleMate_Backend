import express, {Application} from "express";
import Server from "./src/index";
import {PrismaClient} from "@prisma/client";
import {initializeApp} from 'firebase-admin/app';
import {credential} from "firebase-admin";
import 'dotenv/config';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const prisma = new PrismaClient();
export {prisma};


const firebaseApp = initializeApp({
    credential: credential.cert(
        {
            projectId: process.env.PROJECT_ID,
            privateKey: process.env.PRIVATE_KEY,
            clientEmail: process.env.CLIENT_EMAIL
        }
    )
});

export default firebaseApp;

app.listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
})
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });
