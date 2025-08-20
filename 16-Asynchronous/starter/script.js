'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

//old school data request

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//         </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('new zealand')

//Render country and neighbour, on the precipise of call back hell (2 AJAX calls)
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
// const getCountryDataAndNeighbour = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         renderCountry(data);

//         //Get neighbour country
//         const [neighbour] = data.borders
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener('load', function(){
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');

//         });
// });
// };
// getCountryDataAndNeighbour('united kingdom');

//ES6, promises, fetch api

// const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//First promise, returns a promise which can be consumed in the future
// const country = 'united kingdom'
// const request = fetch(`https://restcountries.com/v2/name/${country}`)
// console.log(request)

// Lets Build and consume the promise

// const getCountryData = function (country){
//     // returns a promise which we handle by using the .then() method
//   const request = fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
//   console.log(response)
//   return response.json() //json method returns another promise
//    }).then(function(data){ //so we must handle this promise by using the then method
//     console.log(data)
//     renderCountry(data[0])
//    })

// }

//Lets simplify the code with arrow functions  simple fetch
// const getCountryData = function (country){
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(response => response.json())
//   .then(data => {
//     renderCountry(data[0]);
// });
// };

// call the country data
// getCountryData('usa')

//chain promises to render the neighbour country

// const getCountryData = function (country){
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(response => response.json())
//   .then(data => {
//     renderCountry(data[0]);
//     const neighbour = data[0].borders[0];

//     if(!neighbour) return;
//     //Neighbouring country
//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
// })
// .then(response => response.json())
// .then(data =>
//     renderCountry(data, 'neighbour')) //passing in the neighbour css class for styling
// }

// getCountryData('united kingdom')

//Handling rejected promises. Promises only get rejected if the user loses internet connection

// const getCountryData = function (country){
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(response => { console.log(response)
//         if (!response.ok)
//             throw new Error(`Country not found(${response.status})`)
//         return response.json()
//     })
//     .then(data => {
//     renderCountry(data[0]);
//     const neighbour = data[0].borders[0];

//     if(!neighbour) return;
//     //Neighbouring country
//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
// })
// .then(response => { console.log(response)
//         if (!response.ok)
//             throw new Error(`Neighbour not found(${response.status})`)
//         return response.json()
//     }) //then() happen when the request is fufilled
// .then(data =>
//     renderCountry(data, 'neighbour')) //passing in the neighbour css class for styling
// .catch(err => {  console.error(`${err} 💥💥💥`) // catch() happens when there is an error fufilling request
//     renderError(`Something went wrong 💥💥💥 ${err.message}.Try again`)
// })
// .finally(() => {countriesContainer.style.opacity = 1;}) // finally() happens no matter what i.e like rendering a loading spinner, or In our case we will change the opacity of our container so it either renders our country cards or our error message

// }
// btn.addEventListener('click', function(){
// getCountryData('portugal')
// })

// add a new function to stop repeating code getJSON (further up the file)

// const getCountryData = function (country){
//     getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
//     .then(data => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];

//         if(!neighbour) throw new Error('No Neighbour found!');
//         //Neighbouring country
//         return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `Country not found` );
// })
// .then(data => renderCountry(data, 'neighbour')) //passing in the neighbour css class for styling
// .catch(err => {  console.error(`${err} 💥💥💥`) // catch() happens when there is an error fufilling request
//     renderError(`Something went wrong 💥💥💥 ${err.message}.Try again`)
// })
// .finally(() => {countriesContainer.style.opacity = 1;}) // finally() happens no matter what i.e like rendering a loading spinner, or In our case we will change the opacity of our container so it either renders our country cards or our error message

// }
// btn.addEventListener('click', function(){
// getCountryData('united kingdom')
// })

//Event loop in practice

// console.log('Test start'); // will fire first because it is synchronous code
// setTimeout(() => console.log('0 sec timer', 0)); // will execute fourth because it will go to the callback queue which has a lower prority than synchronous and microtasks queue
// Promise.resolve('Resolve promise 1').then(res => console.log(res)) //will fire 3rd because promises are allocated to the microtasks queue that has a higher priority than the callback queue
// console.log('Test end') // will fire second because it is synchronous code

// Building promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lottery draw is happening')
//     setTimeout(function() {
//         if(Math.random() >= 0.5) {
//         resolve('You win 💰');
//     } else {
//         reject(new Error ('You lost your money 💩'));
//     }
//     }, 2000)
// })

// //consume promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// promisifying setTimeout, multiple timers better than the callback hell that we showed  earlier
// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve, seconds * 1000);
//     });
// }
// wait(1)
//     .then(() => {
//         console.log( "I waited for 1 seconds")
//         return wait(1);
//     })
//     .then(() => {
//         console.log('I waited 2 seconds')
//         return wait(1)
//     })
//     .then(() => {
//         console.log('I waited 3 seconds')
//         return wait(1)
//     })
//     .then(() => {
//         console.log('I waited 4 seconds')
//         return wait(1)})
//     .then(() => console.log('I waited 5 seconds'))

//Promisifying geolocation

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    //shorter version of above
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
};

// getPosition().then(pos => console.log(pos))

// const whereAmI = function () {
//     getPosition().then(pos => {
//         const {latitude: lat, longitude: lng } = pos.coords;

//         return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
// `)
//     })
//     .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//     })
//     .then(data => {
//         console.log(`Data: ${data}`);
//         console.log(`you are in ${data.city}, ${data.countryName}`);
//         return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
//     })
//     .then(res => {
//         if (!res.ok) throw new Error(`Country not found ${res.status}`);
//         return res.json();
//     })
//     .then(data = renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`))
// }

// btn.addEventListener('click', whereAmI);

//make it async

getPosition().then(pos => console.log(pos))

// const whereAmI = async function () {

//   // Geolocation
//   const pos = await  getPosition();
//   const {latitude: lat, longitude: lng } = pos.coords;

//   // Reverse geocoding
//   const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   // Country data
//   const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
//   const data = await res.json();

//   console.log(data);
//   renderCountry(data[0])

// }

// btn.addEventListener('click', whereAmI);

// adding error handling

const whereAmI = async function () {

  // Geolocation
  const pos = await  getPosition();
  const {latitude: lat, longitude: lng } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country data
  const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryName}`);
  const data = await res.json();

  console.log(data);
  renderCountry(data[0])


  try {
    let y = 1;
    const x = 2;
    x = 3;
  } catch (err) {
    alert(err.message);
  }

}

btn.addEventListener('click', whereAmI);
