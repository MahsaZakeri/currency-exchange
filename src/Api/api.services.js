import axios from 'axios';

// const CURRENCY_EXCHANGE_BASE_URL =
const http = axios.create({
  baseURL: 'https://api.exchangerate.host/',
});

export const convertCurrency = async data => {
  const response = await http.get(
    `convert?from=${data.from}&to=${data.to}&amount=${
      data.amount ? data.amount : 1
    } `
  );
  if (response.status === 200) {
    return response;
  } else {
    alert('Sorry something went wrong, please try again!');
  }
};

export const rateInDays = async data => {
  const response = await http.get(
    `timeseries?start_date=${data.startDate}&end_date=${data.endDate}&symbols=${data.base}`
  );
  if (response.status === 200) {
    return response;
  } else {
    alert('Sorry something went wrong, please try again!');
  }
};
