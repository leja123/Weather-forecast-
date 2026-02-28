require("dotenv").config();

const express = require("express");
const app = express();

const API_KEY = process.env.API_KEY;

// create endpoint
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    try {
        // Get latitude & longitude
        const geoResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        const geoData = await geoResponse.json();

        if (!geoData.length) {
            return res.status(404).json({ error: "City not found" });
        }

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // Get weather using lat & lon
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const weatherData = await weatherResponse.json();

        res.json(weatherData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// serve static files (your HTML, script.js)
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});




