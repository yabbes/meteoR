var cfg = new Apicfg();

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
  let options = '?units=si&lang=de';
  $.ajax({
      url: 'https://api.darksky.net/forecast/' + cfg.DARKSKY_API_KEY + '/' + cityCoords + options,
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
  //Daily summary
  $('#dailySummary').html(result.daily.summary);

  //"Currently" data and city name
  $('#fieldCityName').html(cityName);
  $('#cTime').html(result.currently.time);
  $('#cSummary').html(result.currently.summary);
  $('#cTemperature').html((result.currently.temperature + '°C'));
  $('#cTemperatureMinMax').html((result.daily.data[0].temperatureMin + ' - ' + result.daily.data[0].temperatureMax + '°C'));
  $('#cPrecipProbability').html(result.currently.precipProbability);
  $('#cApparentTemperature').html((result.currently.apparentTemperature + '°C'));
  $('#cWindSpeed').html(result.currently.windSpeed);
  $('#cOzoneUvIndex').html((result.currently.ozone + ' ' + result.daily.data[0].uvIndex));
  $('#cHumidity').html(result.currently.humidity);

  // Tomorrow
  // Calculations
  let mTempMin = result.daily.data[1].temperatureMin;
  let mTempMax = result.daily.data[1].temperatureMax;
  let mTempMean = Math.floor((mTempMin + mTempMax / 2));
  //
  $('#mTime').html(result.daily.data[1].time);
  $('#mSummary').html(result.daily.data[1].summary);
  $('#mTemperature').html((mTempMean + '°C'));
  $('#mTemperatureMinMax').html((mTempMin + ' - ' + mTempMax + '°C'));
  $('#mPrecipProbability').html((result.daily.data[1].precipProbability * 100) + '%');
  $('#mApparentTemperature').html((result.currently.apparentTemperature + '°C'));
  $('#mWindSpeed').html(result.currently.windSpeed);
  $('#mOzoneUvIndex').html((result.currently.ozone + ' ' + result.daily.data[0].uvIndex));
  $('#mHumidity').html(result.currently.humidity);

  // The day after tomorrow
  $('#cTime').html(result.currently.time);
  $('#cSummary').html(result.currently.summary);
  $('#cTemperature').html((result.currently.temperature + '°C'));
  $('#cTemperatureMinMax').html((result.daily.data[0].temperatureMin + ' - ' + result.daily.data[0].temperatureMax + '°C'));
  $('#cPrecipProbability').html(result.currently.precipProbability);
  $('#cApparentTemperature').html((result.currently.apparentTemperature + '°C'));
  $('#cWindSpeed').html(result.currently.windSpeed);
  $('#cOzoneUvIndex').html((result.currently.ozone + ' ' + result.daily.data[0].uvIndex));
  $('#cHumidity').html(result.currently.humidity);



}
