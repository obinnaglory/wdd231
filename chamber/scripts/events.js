const spotlightContainer =
document.querySelector("#spotlights");

async function loadSpotlights(){

    const response =
        await fetch("data/members.json");

    const data =
        await response.json();

    let members =
        data.members.filter(member =>

            member.membership === "Gold" ||
            member.membership === "Silver"

        );

    members.sort(()=>0.5-Math.random());

    members = members.slice(0,3);

    members.forEach(displaySpotlight);

}

function displaySpotlight(member){

    const card=document.createElement("section");

    card.className="spotlight";

    card.innerHTML=`

    <h3>${member.name}</h3>

    <img src="${member.image}"
         alt="${member.name}">

    <p>${member.address}</p>

    <p>${member.phone}</p>

    <p>${member.membership}</p>

    <a href="${member.website}" target="_blank">
        Visit Website
    </a>

    `;

    spotlightContainer.appendChild(card);

}

loadSpotlights();