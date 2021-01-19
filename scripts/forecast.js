class Forecast {
  constructor() {
    this.key = "1hsh2LItTHbsa6cK83DUK5Sw0YRMdnd9";
    this.weatherURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    this.cityURI = "https://dataservice.accuweather.com/currentconditions/v1/";
  }
  async updateCity(city) {
    const cityDets = await this.getCityKey(city);
    const weather = await this.getCurrentConditions(cityDets.Key);
    return {
      cityDets,
      weather,
    };
  }
  async getCityKey(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.weatherURI + query);
    if (response.status === 200) {
      const data = await response.json();
      console.log(response.status);
      return data[0];
    } else {
      throw new Error("failed to fetch data");
    }
  }
  async getCurrentConditions(cityKey) {
    const response = await fetch(
      `${this.cityURI}${cityKey}?apikey=${this.key}`
    );
    const data = await response.json();
    return data[0];
  }
}

// const key = "1hsh2LItTHbsa6cK83DUK5Sw0YRMdnd9";

// const getCityKey = async (city) => {
//   const baseUrl =
//     "https://dataservice.accuweather.com/locations/v1/cities/search";
//   const query = `?apikey=${key}&q=${city}`;
//   const response = await fetch(baseUrl + query);
//   if (response.status === 200) {
//     const data = await response.json();
//     console.log(response.status);
//     return data[0];
//   } else {
//     throw new Error("failed to fetch data");
//   }
// };

// const getCurrentConditions = async (cityKey) => {
//   const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
//   const response = await fetch(`${baseUrl}${cityKey}?apikey=${key}`);
//   const data = await response.json();
//   return data[0];
// };
