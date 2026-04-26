const API_KEY = '368aff45051c67294dd0261581cba145';

document.getElementById('get-weather').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    getCurrentWeather(city);
    getForecast(city);
  } else {
    alert("WPROWADŹ KRYPTONIM MIASTA!");
  }
});

function getCurrentWeather(city) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log("XHR (Current) Response:", data);
      displayCurrentWeather(data);
    }
  };
  xhr.send();
}

function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Fetch (Forecast) Response:", data);
      displayForecast(data);
    })
    .catch(err => console.error("BŁĄD FETCH:", err));
}

function displayCurrentWeather(data) {
  const container = document.getElementById('current-weather');
  container.innerHTML = `
        <h3>AKTUALNY STAN SEKTORA: ${data.name.toUpperCase()}</h3>
        <p style="font-size: 2em; margin: 10px 0;">${data.main.temp} °C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>ODCZUWALNA: ${data.main.feels_like} °C</p>
        <p>WARUNKI: ${data.weather[0].description.toUpperCase()}</p>
    `;
}

function displayForecast(data) {
  const container = document.getElementById('forecast-weather');
  container.innerHTML = '<h3>PROGNOZA 5-DNIOWA (CO 3H)</h3>';

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleString('pl-PL');
    const div = document.createElement('div');
    div.classList.add('forecast-item');
    div.innerHTML = `
            <span>${date}</span>
            <span style="font-weight:bold;">${item.main.temp} °C</span>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
            <span>${item.weather[0].description}</span>
        `;
    container.appendChild(div);
  });
}
