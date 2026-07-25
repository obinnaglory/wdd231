// Replace wiconst currentTemp = document.querySelector("#current-temp");
const description = document.querySelector("#weather-desc");
const forecast = document.querySelector("#forecast");

const lat = 7.15;
const lon = 7.25;

const apiKey = "be8c73a53953ec3d7eb113a42fe10803";

const weatherURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather(){

    try{

        const response = await fetch(weatherURL);

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        console.log(error);

    }

}

function displayWeather(data){

    currentTemp.textContent =
        Math.round(data.list[0].main.temp);

    description.textContent =
        data.list[0].weather[0].description;

    forecast.innerHTML="";

    const days=[8,16,24];

    days.forEach(index=>{

        const item=data.list[index];

        const li=document.createElement("li");

        const date=new Date(item.dt_txt);

        li.textContent=
            `${date.toLocaleDateString("en-US",{weekday:"long"})}: ${Math.round(item.main.temp)}°C`;

        forecast.appendChild(li);

    });

}

getWeather();