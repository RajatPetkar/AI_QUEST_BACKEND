import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors'
import userRoutes from "./routes/Users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatbotRoutes from "./routes/Chatbot.js";
import connectDB from './config/connectDB.js'
import searchRoute from './routes/search.js';
import Questions from './models/questions.js';
import bodyParser from "body-parser";
// import companyRoutes from "./routes/companies.js";
import { companyController } from "./controllers/company.js";

// import fetchDataAndSendToPython from "./model/index.js";

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json({ limit: "300mb", extended: true }))
app.use(express.urlencoded({ limit: "300mb", extended: true }))
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/chatbot", chatbotRoutes)
app.use('/api', searchRoute);
app.use('/api/company',companyController)


app.get('/', (req, res) => {
  res.send("This is a stack overflow clone's API by Rajat Petkar")
})

// app.get('/api/fetch-data', async (req, res) => {
//   try {
//     await fetchDataAndSendToPython();  // Call your function here
//     res.status(200).json({ message: "Data fetched and sent to Python script." });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue.white)
})
