const city = document.querySelector("form").city;
const form = document.querySelector("form");
const h5City = document.querySelector("div.details h5");
const weatherCondition = document.querySelector(
  "body > div > div > div:nth-child(3) > div > div.my-3"
);
const temp = document.querySelector(
  "body > div > div > div:nth-child(3) > div > div.display-4.my-4 > span:nth-child(1)"
);
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {
  const cityDets = await getCityKey(city);
  const weather = await getCurrentConditions(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

const updateUI = (data) => {
  const { cityDets, weather } = data;
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
  </div>
  `;

  //update the night/dat & icon images

  let timeSrc = weather.IsDayTime
    ? "./images/icons/day.svg"
    : "./images/icons/night.svg";
  time.setAttribute("src", timeSrc);
  icon.setAttribute("src", `./images/icons/${weather.WeatherIcon}.svg`);

  //remove the d-none class if present
  card.classList.contains("d-none") && card.classList.remove("d-none");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  updateCity(e.target.city.value)
    .then((data) => updateUI(data))
    .catch((e) => console.log(e));

  //set local storage
  localStorage.setItem("city", e.target.city.value);

  e.target.reset();
});

//show info on load
let savedCity = localStorage.getItem("city");
if (savedCity) {
  updateCity(savedCity)
    .then((data) => updateUI(data))
    .catch((e) => console.log(e));
}
