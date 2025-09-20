import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

connectDB();
app.listen(port, () => {
  console.log(`App is runnign on port ${port}`);
});
