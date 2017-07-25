let mm;
var cfg = new apicfg();

var cityCoords;
var cityObj;
var cityName;

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let city = $('#searchCity').val();
    getCityCoords(city);
    //console.log(city);
    e.preventDefault();
  });
});


// get lat & lng for city via google geocode
//https://maps.googleapis.com/maps/api/geocode/json?&address=dortmund
function getCityCoords (city) {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + city)
    .then((response) => {
      cityObj = response.data.results[0];
      cityName = cityObj.formatted_address;
      cityCoords = cityObj.geometry.location.lat + ',' + cityObj.geometry.location.lng;
      getWeather(cityCoords);
    })
    .catch((error) => {
      console.log(error);
    });

  return;
}

function getWeather (cityCoords) {
  /*console.log('https://api.darksky.net/forecast/' + cfg.DARKSKY_API_KEY + '/' + cityCoords);
  return;*/
  axios.get('https://api.darksky.net/forecast/' + cfg.DARKSKY_API_KEY + '/' + cityCoords).then((res) => {
  console.log(res);
  });
}
