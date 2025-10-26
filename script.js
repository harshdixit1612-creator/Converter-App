
const amountInput = document.getElementById("amount");
const fromSelect=document.getElementById("fromCurrency");
const toSelect=document.getElementById("toCurrency");
const resultBox=document.getElementById("result");
const exchangeRateText=document.getElementById("exchangeRate");

const currencySection=document.getElementById("currencySection");
const tempSection=document.getElementById("tempSection");
const currencyBtn=document.getElementById("currencyBtn");
const tempBtn=document.getElementById("tempBtn");

const fromTemp=document.getElementById("fromTemp");
const toTemp = document.getElementById("toTemp");
const tempInput = document.getElementById("tempInput");
const tempResult = document.getElementById("tempResult");

const resetbtn = document.getElementById("resetbtn");
//country rtaes
const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.81,
  JPY: 144.19,
  INR: 83.73,
  CAD: 1.34,
  AUD: 1.49,
  CHF: 0.91,
  CNY: 6.93,
  MXN: 17.38,
  NZD: 1.57,
  SEK: 10.33,
  SGD: 1.36,
  NOK: 11.19,
  KRW: 1326.16,
  TRY: 18.44,
  RUB: 75.38,
  BRL: 5.17,
  ZAR: 17.63,
  DKK: 6.87,
};

//local stprage
function saveSettings(){
  const settings = {
    mode: currencySection.classList.contains("hidden") ? "temp" : "currency",
    amount: amountInput.value,
    fromCurrency: fromSelect.value,
    toCurrency: toSelect.value,
    tempValue: tempInput.value,
    fromTemp: fromTemp.value,
    toTemp: toTemp.value,
  };
  localStorage.setItem("converterSettings", JSON.stringify(settings));
}
function loadSettings(){
  const saved = localStorage.getItem("converterSettings");
  if(!saved) return;
  const settings = JSON.parse(saved);
}

 amountInput.value = settings.amount || 0;
  fromSelect.value = settings.fromCurrency || "USD";
  toSelect.value = settings.toCurrency || "EUR";

  tempInput.value = settings.tempValue || 0;
  fromTemp.value = settings.fromTemp || "C";
  toTemp.value = settings.toTemp || "F";
}
// TOGGLE BETWEEN CURRENCY AND TEMPERATURE CONVERTER
currencyBtn.addEventListener("click", () =>{
  currencySection.classList.remove("hidden");
  tempSection.classList.add("hidden");
  currencyBtn.classList.add("active");
  tempBtn.classList.remove("active");
  convertCurrency(); 
});

tempBtn.addEventListener("click", () => {
  tempSection.classList.remove("hidden");
  currencySection.classList.add("hidden");
  tempBtn.classList.add("active");
  currencyBtn.classList.remove("active");
  convertTemperature(); 
});

// CURRENCY CONVERSION
function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 0;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!rates[from] || !rates[to]) {
    resultBox.textContent = "N/A";
    exchangeRateText.textContent = "Unsupported currency";
    return;
  }

  // Convert from  currency to USD and to currency
  const rateFromUSD = rates[to] / rates[from];
  const converted = amount * rateFromUSD;

  resultBox.textContent = converted.toFixed(2);
  exchangeRateText.textContent = `1 ${from} ≈ ${rateFromUSD.toFixed(4)} ${to}`;
}

// TEMPERATURE CONVERSION 
function convertTemperature() {
  const value = parseFloat(tempInput.value) || 0;
  let celsius;

  if (fromTemp.value === "C") celsius = value;
  else if (fromTemp.value === "F") celsius = (value - 32) * (5 / 9);
  else if (fromTemp.value === "K") celsius = value - 273.15;

  let result;
  if (toTemp.value === "C") result = celsius;
  else if (toTemp.value === "F") result = (celsius * 9) / 5 + 32;
  else if (toTemp.value === "K") result = celsius + 273.15;

  tempResult.textContent = result.toFixed(2);
}

//  EVENTS
amountInput.addEventListener("input", convertCurrency);
fromSelect.addEventListener("change", convertCurrency);
toSelect.addEventListener("change", convertCurrency);

tempInput.addEventListener("input", convertTemperature);
fromTemp.addEventListener("change", convertTemperature);
toTemp.addEventListener("change", convertTemperature);

// reset button functionality
const resetBtn = document.getElementById("resetbtn");

resetBtn.addEventListener("click", () => {
  // Reset Currency Converter
  amountInput.value = 0;
  fromSelect.value = "USD";
  toSelect.value = "EUR";
  convertCurrency();

  // Reset Temperature Converter
  tempInput.value = 0;
  fromTemp.value = "C";
  toTemp.value = "F";
  convertTemperature();
});
convertCurrency();
convertTemperature();
loadSettings();

// Save settings before unloading
window.addEventListener("beforeunload", saveSettings);
