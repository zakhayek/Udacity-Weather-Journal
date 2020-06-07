const appID = '49b9b809e566d9d0cb35f31930cdff2e';
const baseURL = 'api.openweathermap.org/data/2.5/weather?';
const zipIn = document.getElementById('zip');
const userIn = document.getElementById('feelings');
const dateHold = document.getElementById('date');
const tempHold = document.getElementById('temp');
const contHold = document.getElementById('content');
const postURL = 'http://localhost:3000';
const getURL = 'http://localhost:3000/all';

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = async (baseURL, zip = '94712,us', api) => {
  const url = `http://${baseURL}zip=${zip}&appID=${api}`;
  const response = await fetch(url);
  let jsonResponse = await response.json();
  return jsonResponse;
};

const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};

function kelvinConvert(kelvin){
  const convert = ((kelvin - 273.15) * (9/5)) + 32;
  return convert.toFixed(1);
}

const updateUI = async () => {
  const response = await fetch(getURL);
  const jsonResponse = await response.json();
  dateHold.innerHTML = `Date: ${jsonResponse.date}`;
  tempHold.innerHTML = `Temperature: ${kelvinConvert(`${jsonResponse.temperature}`)}F`;
  contHold.innerHTML = `You feel: ${jsonResponse.userResponse}`;
}

const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zipIn.value, appID);
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userIn.value
  };
  await postData(postURL, data);
  updateUI();
}

const ele = document.getElementById('generate');
ele.addEventListener('click', handleClick);
