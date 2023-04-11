let form = document.querySelector('form');

let temperatureDescription = document.querySelector('.weather');
let locationTimeZone = document.querySelector('.location-timezone');
let temperatureDegree = document.querySelector('.temperature__section-degree');
let temperatureSectionDegreeMin = document.querySelector('.temperature__section-degree-min');
let temperatureSectionDegreeMax = document.querySelector('.temperature__section-degree-max');
let temperatureUmidity = document.querySelector('.temperature__umidity');
let input = document.querySelector('input');

let lng;
let lat;

let locationIcon = document.querySelector('.location-icon');
let lang = (navigator.language).substring(0, 2);

const KELVIN_DEGREES = 273.15

const today = new Date();


if (navigator.geolocation && input.value === '') {
    //console.log(input.value);
    navigator.geolocation.getCurrentPosition((position) => {
        lng = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=9f11284868fdf52b7ff9cdb0d1e61737&lang=${lang}`;
        getData(api)
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    let city = input.value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93d38192b6981451a1f4bd494daf32ba&lang=${lang}`;
    getData(api)

function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])

}

formatDate(today, 'mm/dd/yy')
document.querySelector(".currentDate").innerHTML = today;
})

function getData(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setData(data)
        });
}

function setData(data) {
    const { name, weather, main } = data;

    temperatureDegree.textContent = main.temp ? convertTemp(main.temp, 2) : 'not available'
    temperatureDescription.textContent = weather[0]?.description.toUpperCase();
    locationTimeZone.textContent = name ? name : 'city not available';
    locationIcon.src = weather[0].icon ? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png` : ''
    temperatureSectionDegreeMin.textContent = main.temp_min ? convertTemp(main?.temp_min) : 'not available'
    temperatureSectionDegreeMax.textContent = main.temp_max ? convertTemp(main.temp_max) : 'not available'
    temperatureUmidity.textContent = `Umidità: ${main?.humidity}%`;
}

function convertTemp(temp, toFixed = 0) {
    return parseFloat(temp - KELVIN_DEGREES).toFixed(toFixed);
}

/*function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])

}

formatDate(today, 'mm/dd/yy')
document.querySelector(".currentDate").innerHTML = today;
*/