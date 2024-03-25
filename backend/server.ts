import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
//////////
dotenv.config();

const DB: string = process.env.DATABASE || "";
const PORT = process.env.PORT;

//////Database connection//////
if (!DB) throw new Error("DATABASE environment variable is not defined");
mongoose.connect(DB).then(() => console.log("connect to db"));

////listen to port////////
const server = app.listen(PORT, () =>
  console.log(`app is running on port ${PORT}`)
);

process.on("unhandledRejection", (err: any) => {
  console.log(`unhandledRejection Errors : ${err.message}, ${err.name}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err: any) => {
  console.log(`uncaughtException Errors : ${err.message}, ${err.name}`);
  server.close(() => {
    process.exit(1);
  });
});
