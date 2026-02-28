require("dotenv").config();

const express = require("express");
const app = express();

const API_KEY = process.env.API_KEY;

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99";

// create endpoint
app.get("/weather", async (req, res) => {
    try {
        const response = await fetch(`${apiUrl}&appid=${API_KEY}`);
        const data = await response.json();

        res.json(data); // send JSON to browser
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// serve static files (your HTML, script.js)
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});