let amount = document.getElementById("amount");
let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let convertBtn = document.getElementById("convertBtn");
let swapBtn = document.getElementById("swapBtn");
let result = document.getElementById("result");
let rates;
const api_LINK = "https://api.exchangerate-api.com/v4/latest/USD"

const fetch_API = async () => {
   try {
      const response = await fetch(api_LINK);
      const data = await response.json();
      return data;
   }
   catch (err) {
      console.log(`API ERROR ${err}`)
   }

}


const initApp = async () => {
   const data = await fetch_API();
   let currency_List = Object.keys(data.rates);
   rates = data.rates;
   currency_List.forEach(curr_List => {
      let option_from = document.createElement("option");
      option_from.value = curr_List
      option_from.textContent = curr_List;
      fromCurrency.appendChild(option_from);

      let option_To = document.createElement("option");
      option_To.value = curr_List
      option_To.textContent = curr_List;
      toCurrency.appendChild(option_To);

      if (curr_List === "USD") option_from.selected = true;
      if (curr_List === "INR") option_To.selected = true;


   });
}
initApp()


convertBtn.addEventListener("click", () => {
   let amount_value = Number(amount.value);
   let fromCurrency_value = fromCurrency.value;
   let toCurrency_value = toCurrency.value;

   let fromRate = rates[fromCurrency_value];
   let toRate = rates[toCurrency_value];

   if (amount_value <= 0) {
      result.style.color = "red"
      return result.textContent = "Please enter a valid amount";

   }
   result.style.color = "black"
   result.textContent = "Converting...";

   setTimeout(() => {
      let final_Price = (amount_value / fromRate) * toRate;
      result.style.color = "green"
      result.textContent = `${amount_value} ${fromCurrency_value} = ${final_Price.toFixed(2)} ${toCurrency_value}`;
   }, 600);



});

swapBtn.addEventListener("click", () => {
   let temp = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = temp;

   if (amount.value > 0) {
      convertBtn.click();
   }
});


document.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      e.preventDefault();
      convertBtn.click();
   }
});

