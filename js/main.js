var cfg = new apicfg();

var cityCoords;
var cityObj;
var cityName;
var result;

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
  $.ajax({
      url: 'https://api.darksky.net/forecast/' + cfg.DARKSKY_API_KEY + '/' + cityCoords,
      type: 'GET',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      crossDomain: true,
      dataType: 'jsonp'
    }).done(function(data) {

      result = data;
      updateApp();
  });

}

function updateApp(){
  console.log(result);
  $('#fieldCityName').html(cityName);
  
}
