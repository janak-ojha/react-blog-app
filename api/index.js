const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import CORS middleware

dotenv.config();

// Use CORS middleware to allow requests from your frontend
app.use(cors({
    origin: process.env.REACT_APP_BASE_URL_BACKEND, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true // Allow cookies or authentication headers
}));

app.use(express.json()); // Middleware to parse JSON data

app.get("/", (req, res) => {
    res.send("API is running successfully");
});

// Serve static files (e.g., images)
app.use("/images", express.static(path.join(__dirname, "/images")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
