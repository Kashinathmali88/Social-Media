import app from "../backend/src/app.js";
import "dotenv/config";
import connectDB from "./config/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port, () => {
  console.log(`App is runnign on port ${port}`);
});
connectDB();
