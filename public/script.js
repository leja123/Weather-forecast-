async function loadWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        console.log(data);

        if (data.main) {
            document.getElementById("weatherData").innerHTML =
                "Temperature: " + data.main.temp +
                "<br>Description: " + data.weather[0].description;
        } else {
            document.getElementById("weatherData").innerHTML =
                data.error;
        }

    } catch (error) {
        console.error("Error loading weather:", error);
    }
}

function searchCity() {
    const city = document.getElementById("searchedCity").value;
    loadWeather(city);
}

loadWeather();



