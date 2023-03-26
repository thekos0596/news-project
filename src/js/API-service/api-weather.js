const apiKey = "edcdf24847596a8bc6f71c1052f5a8e5";
const latitudeDefault = 40.778793;
const longitudeDefault = -73.966587;

const fetchweather = function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetchWeather(latitude, longitude, apiKey);
    }, error => {
      console.log(error);
      fetchWeather(latitudeDefault, longitudeDefault, apiKey);
    }

    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    fetchWeather(latitudeDefault, longitudeDefault, apiKey);
  }

  function fetchWeather(latitude, longitude, apiKey) {


    // Make the API request
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract relevant weather information
        // console.log(data);
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius and round to the nearest integer
        const cloud = data.weather[0].main;

        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        const iconUrl = `https://openweathermap.org/img/wn/04n@2x.png`;
        
        const weekday = new Date().toLocaleString('en-US', { weekday: 'short' });
        const day = new Date().toLocaleString('en-US', { day: 'numeric' });
        const month = new Date().toLocaleString('en-US', { month: 'short' });
        const year = new Date().toLocaleString('en-US', { year: 'numeric' });

        const weatherLayout = `
        <div id = \"weather__header\">
          <div id = \"weather__degree\">${temperature}&#186; </div>
            <div id = \"weather__description\">
              <div id = \"weather__cloud\">
                  ${cloud} 
              </div>
              <div id = \"weather__location\">
                <div>
                  <svg width="18" height="23" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.00001 0.125C5.35957 0.126935 3.78688 0.779452 2.62692 1.93941C1.46696 3.09938 0.814442 4.67207 0.812507 6.3125C0.810542 7.65306 1.24843 8.95725 2.05901 10.025C2.05901 10.025 2.22776 10.2472 2.25532 10.2793L7.00001 15.875L11.7469 10.2764C11.7717 10.2466 11.941 10.025 11.941 10.025L11.9416 10.0233C12.7517 8.95603 13.1894 7.65245 13.1875 6.3125C13.1856 4.67207 12.5331 3.09938 11.3731 1.93941C10.2131 0.779452 8.64044 0.126935 7.00001 0.125ZM7.00001 8.5625C6.555 8.5625 6.11998 8.43054 5.74997 8.18331C5.37996 7.93607 5.09157 7.58467 4.92128 7.17354C4.75098 6.7624 4.70642 6.31 4.79324 5.87355C4.88006 5.43709 5.09435 5.03618 5.40902 4.72151C5.72368 4.40684 6.1246 4.19255 6.56105 4.10573C6.99751 4.01892 7.44991 4.06347 7.86104 4.23377C8.27218 4.40407 8.62358 4.69246 8.87081 5.06247C9.11805 5.43248 9.25001 5.86749 9.25001 6.3125C9.24926 6.90901 9.01197 7.48087 8.59017 7.90267C8.16838 8.32446 7.59652 8.56176 7.00001 8.5625Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  ${cityName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img id = \"weather__image\" src="${iconUrl}" alt="${description}" />
        <div id = \"weather__time\">${weekday}<br />${day} ${month} ${year}</div>`;
        document.querySelector('#weather').innerHTML = weatherLayout;

      })
      .catch(error => console.log(error));

  }
}

fetchweather();