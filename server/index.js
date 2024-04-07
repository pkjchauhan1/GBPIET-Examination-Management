import express from "express";
const app = express();
import bodyParser from "body-parser";
import connectDB from "./config/connection.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";

app.use(cors("*"));
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

connectDB(process.env.CONNECTION_URL);

app.listen(4000, () =>
  console.log(`Server running on -> http://localhost:${PORT}`)
);
