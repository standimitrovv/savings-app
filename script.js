"use strict";

const btnAdd = document.querySelector("#add-trans");
const inputText = document.querySelector("#text__field");
const inputNumber = document.querySelector("#number__field");
const ul = document.querySelector("ul");
const form = document.querySelector(".transaction");

const tableInOut = document.querySelector(".in-out");
const tableOutValue = document.querySelector(".money-out");
const tableInValue = document.querySelector(".money-in");
const totalBlance = document.querySelector(".current-balance");

// Empty array for the input values
let movements = [];

// Remove the input value and text from the fields
const floorInputValues = function () {
  inputText.value = "";
  inputNumber.value = "";
};

// Render the outcome to the UI
const renderOutcomeValue = function (type, amount) {
  const markup = `
            <li class="outcome"> 
              <span class="outcome__type">${type}</span>
              <span class="outcome__size">${amount}lv.</span>
            </li>
            `;
  ul.insertAdjacentHTML("afterend", markup);
};

// Render the income to the UI
const renderIncomeValue = function (type, amount) {
  const markup = `
            <li class="income">
              <span class="income__type">${type}</span>
              <span class="income__size">${amount}lv.</span>
            </li>`;
  ul.insertAdjacentHTML("afterend", markup);
};

const renderIncomeExpenseTotal = function () {
  // Get only the values from the array
  const amounts = movements.map((el) => el.values);

  // Filter and Reduce the positive values
  const income = amounts
    .filter((mov) => mov > 0)
    .reduce((accum, curVal) => (accum += curVal), 0)
    .toFixed(2);

  //Filter and Reduce the negative values
  const outcome = amounts
    .filter((mov) => mov < 0)
    .reduce((accum, curVal) => (accum += curVal), 0)
    .toFixed(2);

  // Reduce every value
  const total = amounts.reduce((accum, curVal) => (accum += curVal)).toFixed(2);

  //Render to the screen
  totalBlance.innerText = "";
  totalBlance.innerText = `${total}lv.`;
  tableInValue.innerText = `${income}lv.`;
  tableOutValue.innerText = `${outcome}lv.`;
};

// Decide which transaction to render to the UI
const submitTransaction = function (e) {
  e.preventDefault();

  let data = {
    text: inputText.value,
    values: +inputNumber.value,
  };
  movements.push(data);

  if (
    data.values != "" &&
    data.text != "" &&
    data.values.toLocaleString().startsWith("-")
  ) {
    renderOutcomeValue(data.text, +data.values);
    floorInputValues();
    renderIncomeExpenseTotal();
    return;
  }
  if (data.text != "" && data.values != "") {
    renderIncomeValue(data.text, +data.values);
    floorInputValues();
    renderIncomeExpenseTotal();
  }
};

btnAdd.addEventListener("click", submitTransaction);
