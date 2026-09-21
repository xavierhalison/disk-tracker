import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import generateFakeData from "./generateFakeData";
import authRoutes from "./routes/auth.route";
import connectToDatabase from "./config/db";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);

app.get("/my-disks", (req, res) => {
  const data = generateFakeData(100);
  res.status(200).json(data);
});

app.get("/my-disks/:id", (req, res) => {
  const data = generateFakeData(1)[0];
  res.status(200).json(data);
});

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  await connectToDatabase();
});
console.log("hot-reload-2");
