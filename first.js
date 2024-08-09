const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns = document.querySelectorAll(".selectto");
const selectcontainers = document.querySelectorAll(".selectcontainers");
const button = document.querySelector("form button");
const tocurr = document.querySelector(".selectto");
const message = document.querySelector(".message")

for (let select of dropdowns) {
    for (let code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    let cntcode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${cntcode}/flat/64.png`;
    let img = element.closest(".selectcontainers").querySelector("img");
    img.src = newsrc;
}

button.addEventListener("click", async (hello) => {
    hello.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountvalue = amount.value;
    if (amountvalue < 1 || amountvalue === "") {
        amountvalue = 1;
        amount.value = "1";
    }
    let selectedValue = tocurr.value.toLowerCase();
    let newurl = `${URL}${selectedValue}.json`;
    console.log(selectedValue);
    let response = await fetch(newurl);
    let data = await response.json();
    let rate = data[selectedValue];
    let sel= `${URL}inr.json`;
    let response1 = await fetch(sel);
    let data1 = await response1.json();
    let rate1 = data1.inr;
    let answer=rate1[selectedValue];
    let answer1=1/answer;
    console.log(answer1);
    let convertedValue = amountvalue / answer1;
    message.innerText = `${amountvalue} INR = ${convertedValue.toFixed(2)} ${selectedValue.toUpperCase()}`
});

