import express from "express";
import cors from "cors";
import bikeRoutes from "./routes/bikeRoutes.js";
import { connectDB } from "./config/db.js";

// it should .js not .ts it's normal practice

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/bikes", bikeRoutes);

app.listen(PORT, () => {
  console.log(`The server is up and running on http://localhost:${PORT}`);
  console.log("Open http://localhost:5000/api/bikes to access the bike API");
});
