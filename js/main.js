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

  // "Currently" data and city name
  // Calculations
  let dateToday = new Date(result.currently.time * 1000);
  dateToday = dateToday.toLocaleDateString();
  // I don't need to calculate the mean temp because the temp is the current temp
  // Data binding
  $('#fieldCityName').html(cityName);
  $('#cTime').html(dateToday);
  $('#cSummary').html(result.currently.summary);
  $('#cTemperature').html((result.currently.temperature + '°C'));
  $('#cTemperatureMinMax').html((result.daily.data[0].temperatureMin + ' - ' + result.daily.data[0].temperatureMax + '°C'));
  $('#cPrecipProbability').html(Math.floor((result.currently.precipProbability * 100)) + '%');
  $('#cApparentTemperature').html((result.currently.apparentTemperature + '°C'));
  $('#cWindSpeed').html(result.currently.windSpeed);
  $('#cOzoneUvIndex').html((result.currently.ozone + ' ' + result.daily.data[0].uvIndex));
  $('#cHumidity').html(Math.floor((result.currently.humidity * 100)) + '%');

  // Tomorrow
  // Calculations
  let mTempMin = result.daily.data[1].temperatureMin;
  let mTempMax = result.daily.data[1].temperatureMax;
  let mTempMean = Math.floor((mTempMin + mTempMax) / 2);

  let mApparentTempMin = result.daily.data[1].apparentTemperatureMin;
  let mApparentTempMax = result.daily.data[1].apparentTemperatureMax;
  let mApparentTempMean = Math.floor((mApparentTempMin + mApparentTempMax / 2));

  let dateTomorrow = new Date(result.daily.data[1].time * 1000);
  dateTomorrow = dateTomorrow.toLocaleDateString();
  // Data binding
  $('#mTime').html(dateTomorrow);
  $('#mSummary').html(result.daily.data[1].summary);
  $('#mTemperature').html((mTempMean + '°C'));
  $('#mTemperatureMinMax').html((mTempMin + ' - ' + mTempMax + '°C'));
  $('#mPrecipProbability').html(Math.floor((result.daily.data[1].precipProbability * 100)) + '%');
  $('#mApparentTemperature').html((mApparentTempMean + '°C'));
  $('#mWindSpeed').html(result.daily.data[1].windSpeed);
  $('#mOzoneUvIndex').html((result.daily.data[1].ozone + ' ' + result.daily.data[1].uvIndex));
  $('#mHumidity').html(Math.floor((result.daily.data[1].humidity * 100)) + '%');


  // The day after tomorrow
  // Calculations
  let daTempMin = result.daily.data[2].temperatureMin;
  let daTempMax = result.daily.data[2].temperatureMax;
  let daTempMean = Math.floor((daTempMin + daTempMax) / 2);

  let daApparentTempMin = result.daily.data[2].apparentTemperatureMin;
  let daApparentTempMax = result.daily.data[2].apparentTemperatureMax;
  let daApparentTempMean = Math.floor((daApparentTempMin + daApparentTempMax / 2));

  let dateDaTomorrow = new Date(result.daily.data[2].time * 1000);
  dateDaTomorrow = dateDaTomorrow.toLocaleDateString();

  // Data binding for the day after tomorrow
  $('#da_Time').html(dateDaTomorrow);
  $('#da_Summary').html(result.daily.data[2].summary);
  $('#da_Temperature').html((daTempMean + '°C'));
  $('#da_TemperatureMinMax').html((daTempMin + ' - ' + daTempMax + '°C'));
  $('#da_PrecipProbability').html(Math.floor((result.daily.data[2].precipProbability * 100)) + '%');
  $('#da_ApparentTemperature').html((daApparentTempMean + '°C'));
  $('#da_WindSpeed').html(result.daily.data[2].windSpeed);
  $('#da_OzoneUvIndex').html((result.daily.data[2].ozone + ' ' + result.daily.data[2].uvIndex));
  $('#da_Humidity').html(Math.floor((result.daily.data[2].humidity * 100)) + '%');



}
