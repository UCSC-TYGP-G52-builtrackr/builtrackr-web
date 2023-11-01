import React ,{useState} from "react";

function Weather() {
    const [weatherDetails, setWeatherDetails] = useState({
      city_name: "",
      temp: null,
      desc: ""
    });
  
    const onChangeHandler = event => {
      let name = event.target.name;
      let value = event.target.value;
      setWeatherDetails(weatherDetails => ({
        ...weatherDetails,
        [name]: value
      }));

      //bd5e378503939ddaee76f12ad7a97608
    };
  
    const fetchData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          weatherDetails.city_name
        }&appid=9be0d4fa00980cc0a436a361070dbfd0`
      )
        .then(response => {
          console.log(response.status);
          if (response.status === 404) {
            alert("No city found!");
            setWeatherDetails({
              ...weatherDetails,
              temp: "",
              desc: ""
            });
          } else if (response.status === 400) {
            alert("City name is required!");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setWeatherDetails({
            ...weatherDetails,
            temp: Math.round(data.main.temp - 273.15),
            desc: data.weather[0].description
          });
        })
        .catch(error => console.log(error));
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter city"
          name="city_name"
          value={weatherDetails.city_name}
          onChange={onChangeHandler}
        />
        <button onClick={fetchData}>Fetch</button>
        {weatherDetails.city_name === "" ? null : (
          <p>
            {weatherDetails.city_name}, {weatherDetails.temp}°C,
            {weatherDetails.desc}
          </p>
        )}
      </div>
    );
  }
  

  export default Weather;