let cities = [["Oslo", 59.9115, 10.7579], ["New York City", 40.7306, -73.9352], ["London", 51.5099, -0.1181], ["Tokyo", 35.6528, 139.8395], ["Paris", 48.8647, 2.3490]]

function fetchData() {

    let content = document.getElementById("page3content");
    content.innerHTML = "";

    for (let i = 0; i < cities.length; i++) {

        fetch("https://api.open-meteo.com/v1/forecast?latitude="+cities[i][1]+"&longitude="+cities[i][2]+"&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((jsonResponse) => {

            let city = document.createElement("span");
            city.setAttribute("class", "page3city");

            const name = document.createElement("h4");
            name.textContent = cities[i][0];
            city.appendChild(name);

            const temp = document.createElement("p");
            temp.textContent = "Temperature: " + jsonResponse.current.temperature_2m + jsonResponse.current_units.temperature_2m;
            city.appendChild(temp);

            const apparentTemp = document.createElement("p");
            apparentTemp.textContent = "Apparent temperature: " + jsonResponse.current.apparent_temperature + jsonResponse.current_units.apparent_temperature;
            city.appendChild(apparentTemp);

            const precipitation = document.createElement("p");
            precipitation.textContent = "Precipitation: " + jsonResponse.current.precipitation + jsonResponse.current_units.precipitation;
            city.appendChild(precipitation);

            const wind = document.createElement("p");
            wind.textContent = "Wind: " + jsonResponse.current.wind_speed_10m + jsonResponse.current_units.wind_speed_10m;
            city.appendChild(wind);

            content.appendChild(city);
        })
    }
}

window.onload = function() {
    fetchData();
    window.setInterval(fetchData, 300000);
}