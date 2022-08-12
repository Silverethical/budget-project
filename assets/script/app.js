"use strict";

// variables
let expenseHistory = [],
  incomeHistory = [];

const htmlIncmoeBtn = document.querySelector("#income-btn"),
  htmlExpenseBtn = document.querySelector("#expense-btn"),
  htmlIncomeForm = document.querySelector("#income-form"),
  htmlExpenseForm = document.querySelector("#expense-form"),
  htmlCurrentBudget = document.querySelector("#current-budget"),
  htmlExpenseHistory = document.querySelector("#expense-history"),
  htmlIncomeHistory = document.querySelector("#income-history");

// event listeners
document.addEventListener("DOMContentLoaded", appInit);
htmlIncmoeBtn.addEventListener("click", showIncomeForm);
htmlExpenseBtn.addEventListener("click", showExpenseForm);
htmlIncomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addIncome();
});
htmlExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpense();
});

// do these at the start
function appInit() {
  checkLocalStorage();
  noBudgetActivateIncome();
  showUserBudget();
}

// check local storage if this is the first run
function checkLocalStorage() {
  if (!!localStorage.getItem("expenseHistory")) {
    expenseHistory = JSON.parse(localStorage.getItem("expenseHistory"));

    if (expenseHistory.length > 0) {
      expenseHistory.forEach((item) => {
        createExpenseItem(item[0], item[1], item[2]);
      });
    }
  }

  if (!!localStorage.getItem("incomeHistory")) {
    incomeHistory = JSON.parse(localStorage.getItem("incomeHistory"));

    if (incomeHistory.length > 0) {
      incomeHistory.forEach((item) => {
        createIncomeItem(item[0], item[1]);
      });
    }
  }
}

// activate income form
function showIncomeForm() {
  hideExpenseForm();
  htmlIncmoeBtn.classList.add("active");
  htmlIncomeForm.classList.remove("hidden");
}

// de-activate income form
function hideIncomeForm() {
  htmlIncmoeBtn.classList.remove("active");
  htmlIncomeForm.classList.add("hidden");
}

// activate expense form
function showExpenseForm() {
  hideIncomeForm();
  htmlExpenseBtn.classList.add("active");
  htmlExpenseForm.classList.remove("hidden");
}

// de-activate expense form
function hideExpenseForm() {
  htmlExpenseBtn.classList.remove("active");
  htmlExpenseForm.classList.add("hidden");
}

// activate income form if there is no budget
function noBudgetActivateIncome() {
  let userBudget = Number(localStorage.getItem("userBudget"));
  if (!userBudget) {
    showIncomeForm();
  } else {
    showExpenseForm();
  }
}

// add income to local storage and show in page
function addIncome() {
  let userBudget = Number(localStorage.getItem("userBudget")),
    htmlIncomeAmount = Number(
      document.querySelector("#income-form > #transaction-amount").value
    );
  if (htmlIncomeAmount >= 10_000) {
    if (!!userBudget) {
      userBudget += htmlIncomeAmount;
      localStorage.setItem("userBudget", userBudget);
    } else {
      localStorage.setItem("userBudget", htmlIncomeAmount);
    }
    createIncomeItem(htmlIncomeAmount);
    showUserBudget();
    showExpenseForm();
    saveIncomeHistory(htmlIncomeAmount);

    htmlIncomeForm.reset();
  } else {
    alert("error");
  }
}

// get user budget from local storage and show it in page
function showUserBudget() {
  let userBudget = Number(localStorage.getItem("userBudget"));
  if (!userBudget) {
    htmlCurrentBudget.textContent = `لطفا بودجه خود را وارد کنید`;
  } else {
    htmlCurrentBudget.textContent = `${userBudget} ریال`;
  }
}

// add income to local storage and show in page
function addExpense() {
  let htmlExpenseTransactionName = document.querySelector(
      "#expense-form #transaction-name"
    ).value,
    htmlExpenseTransactionPrice = Number(
      document.querySelector("#expense-form #transaction-price").value
    ),
    htmlExpenseTransactionAmount = Number(
      document.querySelector("#expense-form #transaction-amount").value
    );

  if (!htmlExpenseTransactionName || !htmlExpenseTransactionPrice) {
    alert("error");
  } else {
    if (!htmlExpenseTransactionAmount) {
      htmlExpenseTransactionAmount = 1;
    }

    let userBudget = Number(localStorage.getItem("userBudget")),
      price = htmlExpenseTransactionPrice * htmlExpenseTransactionAmount;

    if (userBudget < price) {
      alert("موجودی ناکافی!");
    } else {
      userBudget -= price;
      localStorage.setItem("userBudget", userBudget);
      showUserBudget();
      createExpenseItem(
        htmlExpenseTransactionName,
        htmlExpenseTransactionAmount,
        htmlExpenseTransactionPrice
      );
      saveExpenseHistory(
        htmlExpenseTransactionName,
        htmlExpenseTransactionAmount,
        htmlExpenseTransactionPrice
      );

      htmlExpenseForm.reset();
    }
  }
}

// create html element for expense
function createExpenseItem(name, amount, price) {
  const itemDiv = document.createElement("div"),
    removeDiv = document.createElement("div");

  removeDiv.innerHTML = `<span id="remove-btn" onclick="removeExpenseItem(this.parentElement)"><img src="./assets/img/remove-icon.png" alt="remove-icon"></span>`;
  itemDiv.innerHTML = `
      <span>${name}</span>
      <span>تعداد ${amount}</span>
      <span>${price} ریال</span>`;
  itemDiv.appendChild(removeDiv);
  const expenseList = document.querySelectorAll("#expense-history > div");
  itemDiv.setAttribute("id", expenseList.length);
  htmlExpenseHistory.appendChild(itemDiv);
}

// create html element for income
function createIncomeItem(price) {
  const itemDiv = document.createElement("div"),
    removeDiv = document.createElement("div"),
    shamsiDate = new Date().toLocaleDateString("fa-IR-u-nu-latn");

  removeDiv.innerHTML = `<span id="remove-btn" onclick="removeIncomeItem(this.parentElement)"><img src="./assets/img/remove-icon.png" alt="remove-icon"></span>`;
  itemDiv.innerHTML = `
      <span>${price} ریال</span>
      <span>${shamsiDate}</span>
`;
  itemDiv.appendChild(removeDiv);
  const incomeList = document.querySelectorAll("#income-history > div");
  itemDiv.setAttribute("id", incomeList.length);
  htmlIncomeHistory.appendChild(itemDiv);
}

// remove expense item from page and local storage
function removeExpenseItem(target) {
  target.parentElement.remove();
  expenseHistory.splice(target.parentElement.id, 1);
  localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));

  // adjust the IDs of items
  const expenseList = document.querySelectorAll("#expense-history > div");
  for (let i = 0; i < expenseList.length; i++) {
    expenseList[i].setAttribute("id", i);
  }
}

// remove income item from page and local storage
function removeIncomeItem(target) {
  target.parentElement.remove();

  incomeHistory.splice(target.parentElement.id, 1);
  localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));

  // adjust the IDs of items
  const incomeList = document.querySelectorAll("#income-history > div");
  for (let i = 0; i < incomeList.length; i++) {
    incomeList[i].setAttribute("id", i);
  }
}

// save expense items to local storage
function saveExpenseHistory(name, amount, price) {
  expenseHistory.push([name, amount, price]);
  localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));
}

// save income items to local storage
function saveIncomeHistory(price) {
  const shamsiDate = new Date().toLocaleDateString("fa-IR-u-nu-latn");
  incomeHistory.push([price, shamsiDate]);
  localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));
}
