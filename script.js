async function fetchWeather() {
       function degToCompass(num) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(num / 45) % 8;
          return directions[index];
         }
  
    const city = document.getElementById('cityInput').value;
    const apiKey = 'f0406563addcee8e3f73ce7270b33108'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const windSpeed = data.wind.speed;
      const windDeg = data.wind.deg;

      const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>  
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${windSpeed} m/s (${degToCompass(windDeg)})</p>
        `;
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${data.name},${data.sys.country}`;


      document.getElementById('weatherResult').innerHTML = weatherInfo;
    } catch (error) {
      document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }  

document.getElementById('toggleMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  