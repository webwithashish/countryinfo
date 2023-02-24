"use strict";

// const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
let test;
const btnSearch = document.querySelector(".search");
const inputSearch = document.querySelector(".search-country-name");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const removeElement = function () {
    countriesContainer
        .querySelectorAll(".country")
        .forEach((ele) => ele.remove());
};
//////////////////////////////////////////////
btnSearch.addEventListener("click", function () {
    if (!inputSearch.value) return;
    removeElement();
    const req = inputSearch.value;
    // console.log(inputSearch.value);
    getInfoCountry(req);
    inputSearch.value = "";
});
inputSearch.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        if (!inputSearch.value) return;
        removeElement();
        const req = inputSearch.value;
        // console.log(inputSearch.value);
        getInfoCountry(req);
        inputSearch.value = "";
    }
});
const renderError = function (msg) {
    countriesContainer.insertAdjacentText = `Something went wrong! ${msg}❌❌`;
    // countriesContainer.style.opacity = 1;
};
////////////////////////////////////////////////////////////////
const renderCountry = function (data) {
    const html = `
        <article class="country ">
            <img title="${data.flags.alt}" class="country__img" src="${
        data.flags.png
    }" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    +data.population * 0.000001
                ).toFixed(1)} M. people</p>
                <p class="country__row"><span>🗣️</span>${
                    Object.values(data.languages)[0]
                }</p>
                <p class="country__row"><span>💰</span>${
                    Object.values(data.currencies)[0].name
                }</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    // countriesContainer.style.opacity = 1;
};

/////////////////////////////////////
const getInfoCountry = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((Response) =>
            Response.json().then((data) =>
                // console.log(data);
                data.forEach((data) => {
                    renderCountry(data);
                })
            )
        )
        .catch((err) => {
            console.log(`Error ${err.message}`);
            renderError(err.message);
        })
        .finally((countriesContainer.style.opacity = 1));
};
///////////////////////////////////////////////////////////////////
const getLocation = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
const whereAmI = async function () {
    // GET CURRENT USER LOCATION
    try {
        const resPos = await getLocation();
        const { latitude: lat, longitude: lng } = resPos.coords;

        // GET DATA FROM REVERSE GEO CODEING API
        const resGeo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (!resGeo.ok) throw new Error("not able to get location data");
        const data = await resGeo.json();
        const country = data.address.country_code;

        // GET COUNTRY INFORMATION
        const resInfo = await fetch(
            `https://restcountries.com/v3.1/alpha/${country}`
        ).finally((countriesContainer.style.opacity = 1));
        if (!resInfo.ok) throw new Error("not able to get country info");
        const resdata = await resInfo.json();
        renderCountry(resdata[0]);
    } catch (err) {
        console.log(err.message);
    }
};
whereAmI();
