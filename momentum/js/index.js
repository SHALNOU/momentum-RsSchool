const time = document.querySelector('.time');
const date = document.querySelector('.date');
const textGreeting = document.querySelector('.greeting');
const body = document.getElementById('body');
const prevSlide = document.querySelector('.slide-prev');
const nextSlide = document.querySelector('.slide-next');
prevSlide.addEventListener('click', getSlidePrev);
nextSlide.addEventListener('click', getSlideNext);
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const quoteJS = document.querySelector('.change-quote');
const TextJS = document.querySelector('.quote');
const AuthorJS = document.querySelector('.author');
const city = document.querySelector('.city');







// часы с дата
function showTime() {
	const timeJS = new Date();
	const currentTimeJS = timeJS.toLocaleTimeString();
	time.textContent = currentTimeJS;
	setTimeout(showTime, 1000);
	showDate();
}
showTime();
function showDate() {
	const dateJS = new Date();
	const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
	const currentDateJS = dateJS.toLocaleDateString('ru-RU', options);
	date.textContent = currentDateJS;
	showGreeting();
}

//ПРИВЕТСТВИЕ

function getTimeOfDay() {

	const listTimeOfDay = ['night', 'morning', 'afternoon', 'evening']; // создал масивв
	const currentDateJS = new Date(); //команда текущего времени и даты
	const hours = currentDateJS.getHours(); // команда текущего часа 
	return listTimeOfDay[Math.floor(hours / 6)]; //возврат округленного вниз часа деленного на 6 потому что интервал переключения преветствия 6 часов

}
getTimeOfDay();

function showGreeting() {
	const timeOfDay = getTimeOfDay(); //обратился к функции
	const greetingText = `Good ${timeOfDay}`; //шаблонная строка которая возращает каждые 6 часов слово из масива 
	textGreeting.textContent = greetingText; // вывел на экран
}

// сохранение данных

function setLocalStorage() {
	localStorage.setItem('nami', nami.value);
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
	if (localStorage.getItem('nami')) {
		nami.value = localStorage.getItem('nami');
	}
}
window.addEventListener('load', getLocalStorage);

// слайдер 

let randomNum = getRandomNum(20);

function getRandomNum(max) {
	return Math.floor(Math.random() * max + 1);
}
getRandomNum();

function setBg(random) {
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${String(random).padStart(2, "0")}.jpg`;
	img.onload = () => {
		body.style.background = `url(${img.src})`;
	};
}

function getSlidePrev() {
	(randomNum == 1) ? randomNum = 20 : randomNum--; //цыкл на слайдере -
	setBg(randomNum);
}

function getSlideNext() {
	(randomNum == 20) ? randomNum = 1 : randomNum++; //цыкл на слайдере +
	setBg(randomNum);
}



setBg(randomNum);

// погода виджет

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=dd531f77b64208a732d937d35433130e&units=metric`;
	const res = await fetch(url);
	const data = await res.json();

	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
	weatherDescription.textContent = data.weather[0].description;
}
getWeather(city.value = 'Минск');
city.addEventListener('change', () => {
	getWeather();
});


// Цитата

async function getQuotes() {
	const quotes = 'data.json';
	const res = await fetch(quotes);
	const data = await res.json();
	TextJS.textContent = data[getRandomNum(data.length)].text;
	AuthorJS.textContent = data[getRandomNum(data.length)].author;
}
getQuotes();

function initQuotes() {
	getQuotes();
	quoteJS.addEventListener('click', getQuotes);
}
initQuotes();


// Аудио плеер 
const audioPlay = document.querySelector('.play');
const audioNext = document.querySelector('.play-next');
const audioPrev = document.querySelector('.play-prev');
const audioPlayList = document.querySelector('.play-list');
audioNext.addEventListener('click', playNext);
audioPrev.addEventListener('click', playPrev);
audioPlay.addEventListener('click', playAudio);

let isPlay = false;
let audioNumber = 0;



function playAudio() {
	audio.src = playList[audioNumber].src;
	audio.currentTime = 0;
	if (!isPlay) {
		isPlay = true;
		audio.play();
	} else {
		audio.pause();
		isPlay = false;
	}
}


function playNext() {
	if (audioNumber == audioPlayList.length - 1) {
		audioNumber = 0;
	} else {
		audioNumber++;
	}
	playAudio(audioNumber);
}

function playPrev() {
	if (audioNumber == 0) {
		audioNumber = audioPlayList.length - 1;
	} else {
		audioNumber--;
	}
	playAudio(audioNumber);
}

audioPlay.addEventListener('click', function () {
	audioPlay.classList.toggle('pause');
});

import playList from '../js/playList.js';


const audio = new Audio();

function createList() {
	playList.forEach((el) => {
		const li = document.createElement('li');
		li.classList.add('play-item');
		li.textContent = el.title;
		audioPlayList.append(li);
	}
	);
}
createList();

const audioPlayer = document.querySelector(".player");


const timeline = audioPlayer.querySelector(".progress");
timeline.addEventListener("click", event => {
	const timelineWidth = window.getComputedStyle(timeline).width;
	const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
	audio.currentTime = timeToSeek;
}, false);

const volumeSlider = audioPlayer.querySelector(".container-svuk .zvuk");
volumeSlider.addEventListener('click', e => {
	const sliderWidth = window.getComputedStyle(volumeSlider).width;
	const newVolume = e.offsetX / parseInt(sliderWidth);
	audio.volume = newVolume;
	audioPlayer.querySelector(".player-controls .progress-audio").style.width = newVolume * 100 + '%';
}, false);






















// function getTimeCodeFromNum(num) {
// 	let seconds = parseInt(num);
// 	let minutes = parseInt(seconds / 60);
// 	seconds -= minutes * 60;
// 	const hours = parseInt(minutes / 60);
// 	minutes -= hours * 60;

// 	if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
// 	return `${String(hours).padStart(2, 0)}:${minutes}:${String(
// 		seconds % 60
// 	).padStart(2, 0)}`;
// }


// setInterval(() => {
// 	const progressBar = audioPlayer.querySelector(".progress");
// 	progressBar.style.width = audio.currentTime / audio.duration / 100;
// 	audioPlayer.querySelector(".container-time .end-time").textContent = getTimeCodeFromNum(
// 		audio.currentTime
// 	);
// }, 500);


