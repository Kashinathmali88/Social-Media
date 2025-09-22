import express from "express";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest/index.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

// connectDB();

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port, () => {
  console.log(`App is runnign on port ${port}`);
});
