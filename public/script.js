async function loadWeather() {
    try {
        const response = await fetch("/weather");
        const data = await response.json();

        console.log(data);

        document.getElementById("weatherData").innerHTML =
            "Temperature: " + data.main.temp +
            "<br>Description: " + data.weather[0].description;

    } catch (error) {
        console.error("Error loading weather:", error);
    }
}

loadWeather();