"use strict";

const btn = document.querySelector(".btn-country");
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

/////////////////////////////////////////////
/* 
const getInfoCountry = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);
        test = data;
        console.log(data);
        data.forEach((ele) => {
            renderCountry(ele);
        });
        // renderCountry(data);
    });
};
// getInfoCountry("india");
*/
////////////////////////////////////////////////////////////
// promises
// const getInfoCountry = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then((Response) =>
//         Response.json().then((data) =>
//             data.forEach((data) => renderCountry(data))
//         )
//     );
// };

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
// btn.addEventListener("click", function () {
// getInfoCountry("india");
// });
// getInfoCountry("asdfaj");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHALLENGE NO 1
/* 
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �

// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).

// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �

// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”

// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console

// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.

// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)

// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
//////////////////////////////////////////////
// SOLUTION
const getInfoCountry = function (country) {
    fetch(`https://restcountries.com/v2/alpha/${country}`)
        .then((Response) => {
            if (!Response.ok)
                throw new Error(
                    `unable to find country try again (${Response.status})`
                );
            return Response.json();
        })
        .then((data) => {
            console.log(data);
            renderCountry(data);
        });
};
const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then((Response) => {
            console.log(Response);
            if (!Response.ok)
                throw new Error(
                    `unable to find country try again (${Response.status})`
                );
            return Response.json();
        })
        .then((data) => {
            console.log(data);
            getInfoCountry(data.prov);
        })
        .catch((err) => {
            console.error(`Something went wrong!!: ${err.message}`);
            renderError(err.message);
        })
        .finally((countriesContainer.style.opacity = 1));
};
btn.addEventListener("click", function () {
    whereAmI(19.037, 72.873);
});
*/
// console.log("test 1");
// setTimeout(() => {
//     console.log("0 sec timer");
// }, 0);
// Promise.resolve("promise 1").then((res) => console.log(res));
// Promise.resolve("promise 2").then((res) => {
//     // for (let i = 0; i < 10000000000; i++) {}
//     console.log(res);
// });
// console.log("test 1 ended");
