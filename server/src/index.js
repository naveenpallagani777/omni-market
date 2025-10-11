const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const routes = require("./routes");
const gobalErrorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
	origin: "*", // change to frontend URL in prod
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(gobalErrorHandler);

// Start server and connect to DB
const { PORT } = config;
mongoose.connect(config.MONGO_URI).then(() => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
	console.error("Failed to connect to MongoDB", err);
	process.exit(1);
});
