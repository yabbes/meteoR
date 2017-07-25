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
function getCityCoords(city){

  axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address='+city)
    .then(function (response) {
      cityObj = response.data.results[0];
      cityName = cityObj.formatted_address;
      console.log(cityObj.geometry.location.lat + ',' + cityObj.geometry.location.lng);
    })
    .catch(function (error) {
      console.log(error);
    });

  return;
}

function getWeather(city){
  console.log(city + 'key= ' +cfg.DARKSKY_API_KEY);
}
