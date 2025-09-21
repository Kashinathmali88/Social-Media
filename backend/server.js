import express from "express";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest/index.js";

const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

// app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/inngest", (req, res, next) => {
  try {
    return serve({ client: inngest, functions })(req, res, next);
  } catch (err) {
    console.error("Inngest serve error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

connectDB();
app.listen(port, () => {
  console.log(`App is runnign on port ${port}`);
});
