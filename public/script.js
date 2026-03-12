async function loadWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        console.log(data);

        const current = data.current;
        const forecast = data.forecast;

        if (current.main) {   
            let iconID = current.weather[0].icon;   

            // CURRENT WEATHER
            document.getElementById("cityName").innerHTML =
                document.getElementById("searchedCity").value;

            document.getElementById("weatherData").innerHTML =
                current.main.temp + " °C"+
                "<br>" + current.weather[0].description;

            const iconContainer = document.getElementById('weatherIcon');
            iconContainer.innerHTML = "";

            const weatherImage = new Image(200, 200);

            weatherImage.src = `https://openweathermap.org/img/wn/${iconID}@2x.png`;

            iconContainer.appendChild(weatherImage);

            // FORECAST
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "<h3>5 day forecast:</h3><div id='forecastRow'></div>";

            const forecastRow = document.getElementById("forecastRow");

            for (let i = 0; i < forecast.list.length; i += 8) {

                const item = forecast.list[i];

                const date = new Date(item.dt * 1000).toLocaleDateString();
                const temp = item.main.temp;
                const forecastIconID = item.weather[0].icon;

                const card = document.createElement("div");
                card.className = "forecastCard";

                const icon = new Image(50, 50);
                icon.src = `https://openweathermap.org/img/wn/${forecastIconID}.png`;

                const text = document.createElement("p");
                text.innerHTML = `${date}<br>${temp} °C`;

                card.appendChild(icon);
                card.appendChild(text);

                forecastRow.appendChild(card);
            }

        } else {
            document.getElementById("weatherData").innerHTML = data.error;
        }

    } catch (error) {
        console.error("Error loading weather:", error);
    }
}

function searchCity() {
    const city = document.getElementById("searchedCity").value;
    loadWeather(city);
}