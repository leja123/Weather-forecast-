async function loadWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        console.log(data);

        if (data.main) {
            let iconID = data.weather[0].icon;

            document.getElementById("cityName").innerHTML = "Results for: " + document.getElementById("searchedCity").value;
            document.getElementById("weatherData").innerHTML =
                "Temperature: " + data.main.temp +
                "<br>Description: " + data.weather[0].description;

            const iconContainer = document.getElementById('weatherIcon');
            iconContainer.innerHTML = ""; 

            const weatherImage = new Image(200, 200);
            weatherImage.src = 'https://openweathermap.org/payload/api/media/file/' + iconID + '.png';
            iconContainer.appendChild(weatherImage);    

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





