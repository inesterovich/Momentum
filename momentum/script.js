'use strict'


const time = document.querySelector('[data-time]');
const greeting = document.querySelector('[data-greeting]')
const name = document.querySelector('[data-name]');
const focus = document.querySelector('[data-focus]');
const date = document.querySelector('[data-date]');

const blockquote = document.querySelector('[data-blockquote]');
const blockquoteButton = document.querySelector('[data-blockquoteButton]');
const figCaption = document.querySelector('[data-figCaption]');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const bgButton = document.querySelector('.bgButton');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind__speed');


let objDefalut = {
    'name': '[Введите ваше имя]',
    'focus': '[Введите вашу цель]',
    'city': 'Москва',
};

let index = new Date().getHours();
// Вернуть прошлую логику в таймер фона и добавить еще один интервал запуска той же функции - через минуту


function showTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    time.innerHTML = `${hours}<span>:</span>${addZeros(minutes)}<span>:</span>${addZeros(seconds)}`;

    setTimeout(showTime, 1000)
}

function showDate() {
    let today = new Date();
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let dateString = today.toLocaleString('ru', options);

    date.innerText = `${dateString}`;

    setTimeout(showDate, 1200000);
}


function addZeros(number) {

    return number < 10 ? `0${number}`: `${number}`;
}


function greet() {
    let today = new Date;
    let hours = today.getHours();
    let textGreeting;

    if (hours < 6) {
        //Night
        textGreeting = "Доброй ночи, "
    } else if (hours < 12) {
        // Morning
        textGreeting = "Доброе утро, "
    } else if (hours < 18) {
        // Day
        textGreeting = "Хорошего дня, "
    } else {
        // Evening
        textGreeting = "Удачного вечера, "
    }

    greeting.textContent = textGreeting;

}

function generateSet(size, minNumber, maxNumber) {
    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      }

    let set = new Set();
  
    while (set.size < size) {
      let randomNumber = randomInteger(minNumber, maxNumber);
      set.add(randomNumber);
    }

    let result = Array.from(set)
  
    return result;
  }


function generateBgArray() {
    
    let nightArray = generateSet(6, 0, 19).map(item => item = `assets/images/night/${item}.jpg`);
    let morningArray = generateSet(6, 0, 19).map(item => item = `assets/images/morning/${item}.jpg`);
    let dayArray = generateSet(6, 0, 19).map(item => item = `assets/images/day/${item}.jpg`);
    let eveningtArray = generateSet(6, 0, 19).map(item => item = `assets/images/evening/${item}.jpg`);
    
let result = nightArray.concat(morningArray, dayArray, eveningtArray)

    return result;
}

function setBgImage(array) {
    let currentIndex = index % array.length;
    const body = document.querySelector('body');
    const src = array[currentIndex];
    let img = document.createElement('img');
    img.src = `${src}`;

    img.onload = () => {
        body.style.backgroundImage = `url('${src}')`
    }
    index++;


}


function checkBgTime() {

    let mins = new Date().getMinutes();
    let secs = new Date().getSeconds();

    
  
    if (mins === 0 && secs === 0) {
        setBgImage(bgArray);   
        
    }

    setTimeout(checkBgTime, 1000)
    

}

function getElement(node, obj) {
    if (localStorage.getItem(node.className) === null) {
        node.textContent = obj[node.className];
    } else {
        node.textContent = localStorage.getItem(node.className);
    }
}

function setElement(event) {

if (event.type == 'keypress') {

    if (event.code === 'Enter') {
        if (validateInput(event)) {
            localStorage.setItem(event.target.className, event.target.innerText);
            event.target.blur();
        } else {
            let node = event.target;
            getElement(node, objDefalut);
            node.blur();
        }   
    }


} 


if (event.type == 'blur') {
    if (validateInput(event)) {
        localStorage.setItem(event.target.className, event.target.innerText);
        event.target.blur();
    } else {
        let node = event.target;
        getElement(node, objDefalut);
        node.blur();
    }   

}


}


async function getQuote() {

    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const result = await fetch(url);
    const data = await result.json();
    blockquote.textContent = data.quoteText;
    figCaption.textContent = data.quoteAuthor;
}


function validateInput(event) {
    let result;
    let regExp = /\S/g;
    
   let string = event.target.innerText.match(regExp);
    string == null ? result = false : result = true;

    return result;
}


async function getWeather() {
    let apiId = 'e5b193f3446e8898381fa7fc857b8fcd';
    let lang = 'ru';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${lang}&appid=${apiId}&units=metric`

    const result = await fetch(url);

    if (result.status === 200) {
        const data = await result.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
        weatherDescription.textContent = `${data.weather[0].description}`;
       humidity.textContent = `относительная влажность воздуха - ${data.main.humidity} %`;
       windSpeed.textContent = `скорость ветра - ${data.wind.speed} м/с`;
    } else if (result.status === 404) {
        weatherIcon.className = '';
        weatherIcon.textContent = '';
        temperature.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
        weatherDescription.textContent = 'Осторожно, ошибка! Неправильно набран город';
        localStorage.removeItem(city.className);
    }


    



    

   // Требуется ещё относительная влажность и скорость ветра
}

function setCity(event) {
   
if (event.type == 'keypress') {

    if (event.code === 'Enter') {
        if (validateInput(event)) {
            getWeather();
            localStorage.setItem(event.target.className, event.target.innerText);
            event.target.blur();
        } else {
            let node = event.target;
            getElement(node, objDefalut);
            node.blur();
        }   
    }


} 


if (event.type == 'blur') {
    if (validateInput(event)) {
        getWeather();
        localStorage.setItem(event.target.className, event.target.innerText);
        event.target.blur();
    } else {
        let node = event.target;
        getElement(node, objDefalut);
        node.blur();
    }   

}

   
   

  }


showDate();
showTime();
greet();
getElement(name, objDefalut);
getElement(focus, objDefalut);
getElement(city, objDefalut)

name.addEventListener('keypress', setElement);
name.addEventListener('blur', setElement);
focus.addEventListener('keypress', setElement);
focus.addEventListener('blur', setElement);
city.addEventListener('keypress', setCity); 
city.addEventListener('blur', setCity); 

document.addEventListener('DOMContentLoaded', getQuote);
blockquoteButton.addEventListener('click', getQuote)
document.addEventListener('DOMContentLoaded', getWeather);
let bgArray = generateBgArray();
setBgImage(bgArray);
checkBgTime();

bgButton.addEventListener('click', () => {
    setBgImage(bgArray)
})


/* Сделать функцию-планировщик - пусть каждую секунду проверяет не изменился ли контент на странице (соответствует ли он условию) 


*/
/*
//1. Дополнить прогноз погоды.
//2. Сделать проверку на неправильный ввод города
3. Сделать функцию смены фона. Теперь сделаем кнопочку фона и запустим таймер. 
4. Стилизовать приложение
5. Заадаптивить дизайн
6. Прикрутить анимацию, зависящую от погоды 


*/

