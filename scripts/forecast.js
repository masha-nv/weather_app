const key = "1hsh2LItTHbsa6cK83DUK5Sw0YRMdnd9";

const getCityKey = async (city) => {
  const baseUrl =
    "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(baseUrl + query);
  if (response.status === 200) {
    const data = await response.json();
    console.log(response.status);
    return data[0];
  } else {
    throw new Error("failed to fetch data");
  }
};

const getCurrentConditions = async (cityKey) => {
  const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
  const response = await fetch(`${baseUrl}${cityKey}?apikey=${key}`);
  const data = await response.json();
  return data[0];
};
