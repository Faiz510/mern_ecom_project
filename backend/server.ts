import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//////////
dotenv.config();

const app = express();

const DB: string = process.env.DATABASE || "";
const PORT = process.env.PORT;

//////Database connection//////
if (!DB) throw new Error("DATABASE environment variable is not defined");
mongoose.connect(DB).then(() => console.log("connect to db"));

////listen to port////////
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
