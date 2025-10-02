import express from "express";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest/index.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./src/routes/user.routes.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/user/", userRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

await connectDB();
