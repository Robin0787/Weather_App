
const cloud_pct = document.getElementById('cloud_pct');
const temp = document.getElementById('temp');
const temp2 = document.getElementById('temp2');
const feels_like = document.getElementById('feels_like');
const humidity = document.getElementById('humidity');
const humidity2 = document.getElementById('humidity2');
const min_temp = document.getElementById('min_temp');
const max_temp = document.getElementById('max_temp');
const wind_speed = document.getElementById('wind_speed');
const wind_speed2 = document.getElementById('wind_speed2');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
// const wind_degrees = document.getElementById('wind_degrees');


const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// for setting recent searches

let searches = [];
let index = -1;
const first = document.getElementById('firstItem');
const second = document.getElementById('secondItem');
const third = document.getElementById('thirdItem');

first.addEventListener('click', function () {
  const name = first.innerHTML;
  name && getWeather(name);
})

second.addEventListener('click', function () {
  const name = second.innerHTML;
  name && getWeather(name);
  searches.push(name);
  localStorage.setItem('searches', JSON.stringify(searches));
  displayRecentSearches();
})

third.addEventListener('click', function () {
  const name = third.innerHTML;
  name && getWeather(name);
  searches.push(name);
  localStorage.setItem('searches', JSON.stringify(searches));
  displayRecentSearches();
})

searchBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    index++;
    const cityName = searchInput.value;
    searches[index] = cityName;
    localStorage.setItem('searches', JSON.stringify(searches));
    displayRecentSearches();
    console.log(!!cityName);
    cityName && getWeather(cityName);
})

const getWeather = (city) => {
    document.getElementById('city').innerHTML = city;
    const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b2a53e12d9mshc1308f11dabd240p128799jsn9856802a89e1",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };
      
      fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          if(response.temp) {
          cloud_pct.innerHTML = response.cloud_pct + ' Deg'
          temp.innerHTML = response.temp 
          temp2.innerHTML = response.temp + ' ℃';
          feels_like.innerHTML = response.feels_like + " ℃";
          humidity.innerHTML = response.humidity
          humidity2.innerHTML = response.humidity + " %";
          min_temp.innerHTML = response.min_temp + ' ℃';
          max_temp.innerHTML = response.max_temp + ' ℃';
          wind_speed.innerHTML = response.wind_speed
          wind_speed2.innerHTML = response.wind_speed + " Km/hr";
          sunrise.innerHTML = response.sunrise + " S"
          sunset.innerHTML = response.sunset + " S";

          searchInput.value = '';
          const forCSS = response;
          calculatePercentageInCSSCard(forCSS.temp, forCSS.humidity, forCSS.wind_speed);

          }else {
            // Showing error
            const sendError = document.querySelector('.sendError');
            sendError.classList.add('sendError2');
            console.log(sendError);
            setTimeout(() => {
              sendError.classList.remove('sendError2');
            }, 1100);
            cloud_pct.innerHTML = '';
            temp.innerHTML = '';
            temp2.innerHTML = '';
            feels_like.innerHTML = '';
            humidity.innerHTML = '';
            humidity2.innerHTML = '';
            min_temp.innerHTML = '';
            max_temp.innerHTML = '';
            wind_speed.innerHTML = '';
            wind_speed2.innerHTML = '';
            sunrise.innerHTML = '';
            sunset.innerHTML = '';

            calculatePercentageInCSSCard(0,0,0);
          }
        //   wind_degrees.innerHTML = response.wind_degrees

        })
        .catch((err) => console.error(err));
}

getWeather('Dhaka');
khulna_info();
chittagong_info();
brahmanbaria_info();
rajshahi_info();


// for calculate percentage in css

function calculatePercentageInCSSCard (temp, humidity, wind) {
  const root = document.querySelector(':root');
  root.style.setProperty('--temp', temp);
  root.style.setProperty('--humidity', humidity);
  root.style.setProperty('--wind', wind);
}



function displayRecentSearches () {
  dropdown = true;
  const recentSearches = JSON.parse(localStorage.getItem('searches'));
  if(recentSearches.length) {
    let lengthOfRecentSearches  = recentSearches.length;
    if(lengthOfRecentSearches >= 1) {
            first.innerHTML = recentSearches[lengthOfRecentSearches - 1];
            if(lengthOfRecentSearches >= 2) {
                    second.innerHTML = recentSearches[lengthOfRecentSearches - 2];
                    if(lengthOfRecentSearches >= 3) {
                            third.innerHTML = recentSearches[lengthOfRecentSearches - 3];
                    }
            }
    }
  }
}



function khulna_info () {
    const khulna_cloud_pct = document.getElementById('khulna_cloud_pct');
    const khulna_temp = document.getElementById('khulna_temp');
    const khulna_feels_like = document.getElementById('khulna_feels_like');
    const khulna_humidity = document.getElementById('khulna_humidity');
    const khulna_min_temp = document.getElementById('khulna_min_temp');
    const khulna_max_temp = document.getElementById('khulna_max_temp');
    const khulna_wind_speed = document.getElementById('khulna_wind_speed');
    const khulna_wind_degrees = document.getElementById('khulna_wind_degrees');
    const khulna_sunrise = document.getElementById('khulna_sunrise');
    const khulna_sunset = document.getElementById('khulna_sunset');


    const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b2a53e12d9mshc1308f11dabd240p128799jsn9856802a89e1",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };
      
      fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=khulna`,
        options
      )
        .then((response) => response.json())
        .then((response) => {

            khulna_cloud_pct.innerHTML = response.cloud_pct;
            khulna_temp.innerHTML = response.temp;
            khulna_feels_like.innerHTML = response.feels_like;
            khulna_humidity.innerHTML = response.humidity;
            khulna_min_temp.innerHTML = response.min_temp;
            khulna_max_temp.innerHTML = response.max_temp;
            khulna_wind_speed.innerHTML = response.wind_speed;
            khulna_wind_degrees.innerHTML = response.wind_degrees;
            khulna_sunrise.innerHTML = response.sunrise;
            khulna_sunset.innerHTML = response.sunset;

        })
        .catch((err) => console.error(err));

}

function chittagong_info () {
    const chittagong_cloud_pct = document.getElementById('chittagong_cloud_pct');
    const chittagong_temp = document.getElementById('chittagong_temp');
    const chittagong_feels_like = document.getElementById('chittagong_feels_like');
    const chittagong_humidity = document.getElementById('chittagong_humidity');
    const chittagong_min_temp = document.getElementById('chittagong_min_temp');
    const chittagong_max_temp = document.getElementById('chittagong_max_temp');
    const chittagong_wind_speed = document.getElementById('chittagong_wind_speed');
    const chittagong_wind_degrees = document.getElementById('chittagong_wind_degrees');
    const chittagong_sunrise = document.getElementById('chittagong_sunrise');
    const chittagong_sunset = document.getElementById('chittagong_sunset');


    const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b2a53e12d9mshc1308f11dabd240p128799jsn9856802a89e1",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };
      
      fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=chittagong`,
        options
      )
        .then((response) => response.json())
        .then((response) => {

            chittagong_cloud_pct.innerHTML = response.cloud_pct;
            chittagong_temp.innerHTML = response.temp;
            chittagong_feels_like.innerHTML = response.feels_like;
            chittagong_humidity.innerHTML = response.humidity;
            chittagong_min_temp.innerHTML = response.min_temp;
            chittagong_max_temp.innerHTML = response.max_temp;
            chittagong_wind_speed.innerHTML = response.wind_speed;
            chittagong_wind_degrees.innerHTML = response.wind_degrees;
            chittagong_sunrise.innerHTML = response.sunrise;
            chittagong_sunset.innerHTML = response.sunset;

        })
        .catch((err) => console.error(err));

}

function brahmanbaria_info () {
    const brahmanbaria_cloud_pct = document.getElementById('brahmanbaria_cloud_pct');
    const brahmanbaria_temp = document.getElementById('brahmanbaria_temp');
    const brahmanbaria_feels_like = document.getElementById('brahmanbaria_feels_like');
    const brahmanbaria_humidity = document.getElementById('brahmanbaria_humidity');
    const brahmanbaria_min_temp = document.getElementById('brahmanbaria_min_temp');
    const brahmanbaria_max_temp = document.getElementById('brahmanbaria_max_temp');
    const brahmanbaria_wind_speed = document.getElementById('brahmanbaria_wind_speed');
    const brahmanbaria_wind_degrees = document.getElementById('brahmanbaria_wind_degrees');
    const brahmanbaria_sunrise = document.getElementById('brahmanbaria_sunrise');
    const brahmanbaria_sunset = document.getElementById('brahmanbaria_sunset');


    const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b2a53e12d9mshc1308f11dabd240p128799jsn9856802a89e1",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };
      
      fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=brahmanbaria`,
        options
      )
        .then((response) => response.json())
        .then((response) => {

            brahmanbaria_cloud_pct.innerHTML = response.cloud_pct;
            brahmanbaria_temp.innerHTML = response.temp;
            brahmanbaria_feels_like.innerHTML = response.feels_like;
            brahmanbaria_humidity.innerHTML = response.humidity;
            brahmanbaria_min_temp.innerHTML = response.min_temp;
            brahmanbaria_max_temp.innerHTML = response.max_temp;
            brahmanbaria_wind_speed.innerHTML = response.wind_speed;
            brahmanbaria_wind_degrees.innerHTML = response.wind_degrees;
            brahmanbaria_sunrise.innerHTML = response.sunrise;
            brahmanbaria_sunset.innerHTML = response.sunset;

        })
        .catch((err) => console.error(err));

}

function rajshahi_info () {
    const rajshahi_cloud_pct = document.getElementById('rajshahi_cloud_pct');
    const rajshahi_temp = document.getElementById('rajshahi_temp');
    const rajshahi_feels_like = document.getElementById('rajshahi_feels_like');
    const rajshahi_humidity = document.getElementById('rajshahi_humidity');
    const rajshahi_min_temp = document.getElementById('rajshahi_min_temp');
    const rajshahi_max_temp = document.getElementById('rajshahi_max_temp');
    const rajshahi_wind_speed = document.getElementById('rajshahi_wind_speed');
    const rajshahi_wind_degrees = document.getElementById('rajshahi_wind_degrees');
    const rajshahi_sunrise = document.getElementById('rajshahi_sunrise');
    const rajshahi_sunset = document.getElementById('rajshahi_sunset');


    const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "b2a53e12d9mshc1308f11dabd240p128799jsn9856802a89e1",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      };
      
      fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=rajshahi`,
        options
      )
        .then((response) => response.json())
        .then((response) => {

            rajshahi_cloud_pct.innerHTML = response.cloud_pct;
            rajshahi_temp.innerHTML = response.temp;
            rajshahi_feels_like.innerHTML = response.feels_like;
            rajshahi_humidity.innerHTML = response.humidity;
            rajshahi_min_temp.innerHTML = response.min_temp;
            rajshahi_max_temp.innerHTML = response.max_temp;
            rajshahi_wind_speed.innerHTML = response.wind_speed;
            rajshahi_wind_degrees.innerHTML = response.wind_degrees;
            rajshahi_sunrise.innerHTML = response.sunrise;
            rajshahi_sunset.innerHTML = response.sunset;

        })
        .catch((err) => console.error(err));

}
