const apiKey = "a59531589d8d9c7e9aa6ad1725228297"; // <<< Replace with your OpenWeatherMap API key (e.g. a1b2c3d4e5f6)
const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=Owerri,NG&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        console.log("Fetching weather from:", currentWeatherUrl);
        const res = await fetch(currentWeatherUrl);
        console.log("Response status:", res.status);

        if (!res.ok) {
            throw new Error(`OpenWeather response status ${res.status}`);
        }

        const data = await res.json();
        console.log("Weather data received:", data);

        const tempEl = document.getElementById("temp");
        const descEl = document.getElementById("desc");
        const forecastEl = document.getElementById("forecast");

        tempEl.textContent = `Temperature in ${data.name}: ${Math.round(data.main.temp)}°C`;
        descEl.textContent = `${data.weather[0].main}: ${data.weather[0].description}`;

        forecastEl.innerHTML = `
            <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</p>
        `;

    } catch (error) {
        console.error("Weather error:", error);

        const tempEl = document.getElementById("temp");
        const descEl = document.getElementById("desc");

        if (tempEl) tempEl.textContent = "Unable to load weather data.";
        if (descEl) descEl.textContent = "Please check API key and network status.";
    }
}

getWeather();


// SPOTLIGHTS
async function getSpotlights() {
    try {
        const res = await fetch("data/members.json");
        const data = await res.json();

        const filtered = data.filter(m =>
            m.level === "gold" || m.level === "silver"
        );

        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const container = document.querySelector(".spotlight-container");

        selected.forEach(m => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${m.name}</h3>
                <img src="${m.logo}" alt="${m.name}">
                <p>${m.phone}</p>
                <p>${m.address}</p>
                <a href="${m.website}" target="_blank">Visit</a>
                <p>${m.level}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

getSpotlights();