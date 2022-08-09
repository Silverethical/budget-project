"use strict";

// variables
let expenseHistory = [],
  incomeHistory = [],
  htmlRemoveBtn = document.querySelector("#remove-btn"),
  htmlIncmoeBtn = document.querySelector("#income-btn"),
  htmlExpenseBtn = document.querySelector("#expense-btn"),
  htmlIncomeForm = document.querySelector("#income-form"),
  htmlExpenseForm = document.querySelector("#expense-form"),
  htmlIncomeSubmit = document.querySelector("#income-form > #submit-btn"),
  htmlCurrentBudget = document.querySelector("#current-budget"),
  htmlExpenseSubmit = document.querySelector("#expense-form #submit-btn"),
  htmlExpenseHistory = document.querySelector("#expense-history"),
  htmlIncomeHistory = document.querySelector("#income-history");

// event listeners
document.addEventListener("DOMContentLoaded", appInit);
htmlIncmoeBtn.addEventListener("click", showIncomeForm);
htmlExpenseBtn.addEventListener("click", showExpenseForm);
htmlIncomeSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addIncome();
});
htmlExpenseSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addExpense();
});

function appInit() {
  checkLocalStorage();
  activateForm();
  showUserBudget();
}

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

function showIncomeForm() {
  htmlIncmoeBtn.classList.add("active");
  htmlIncomeForm.classList.remove("hidden");
  htmlExpenseBtn.classList.remove("active");
  htmlExpenseForm.classList.add("hidden");
}

function showExpenseForm() {
  htmlExpenseBtn.classList.add("active");
  htmlExpenseForm.classList.remove("hidden");
  htmlIncmoeBtn.classList.remove("active");
  htmlIncomeForm.classList.add("hidden");
}

function activateForm() {
  let userBudget = Number(localStorage.getItem("userBudget"));
  if (!!userBudget) {
    htmlExpenseBtn.classList.add("active");
    htmlExpenseForm.classList.remove("hidden");
  } else {
    htmlIncmoeBtn.classList.add("active");
    htmlIncomeForm.classList.remove("hidden");
  }
}

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
    saveIncomeHistory(htmlIncomeAmount)
  } else {
    alert("error");
  }
}

function showUserBudget() {
  let userBudget = Number(localStorage.getItem("userBudget"));
  if (!userBudget) {
    htmlCurrentBudget.textContent = `لطفا بودجه خود را وارد کنید`;
  } else {
    htmlCurrentBudget.textContent = `${userBudget} ریال`;
  }
}

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
    }
  }
}

function createExpenseItem(name, amount, price) {
  const itemDiv = document.createElement("div"),
    removeDiv = document.createElement("div");

  removeDiv.innerHTML = `<span id="remove-btn" onclick="removeExpenseItem(this.parentElement)">x</span>`;
  itemDiv.innerHTML = `
      <span>${name}</span>
      <span>تعداد ${amount}</span>
      <span>${price} ریال</span>`;
  itemDiv.appendChild(removeDiv);
  const expenseList = document.querySelectorAll("#expense-history > div");
  itemDiv.setAttribute("id", expenseList.length);
  htmlExpenseHistory.appendChild(itemDiv);
}

function createIncomeItem(price) {
  const itemDiv = document.createElement("div"),
    removeDiv = document.createElement("div"),
    shamsiDate = new Date().toLocaleDateString("fa-IR-u-nu-latn");

  removeDiv.innerHTML = `<span id="remove-btn" onclick="removeIncomeItem(this.parentElement)">x</span>`;
  itemDiv.innerHTML = `
      <span>${price} ریال</span>
      <span>${shamsiDate}</span>
`;
  itemDiv.appendChild(removeDiv);
  const incomeList = document.querySelectorAll("#income-history > div");
  itemDiv.setAttribute("id", incomeList.length);
  htmlIncomeHistory.appendChild(itemDiv);
}

function removeExpenseItem(target) {
  target.parentElement.remove();
  expenseHistory.splice(target.parentElement.id, 1);
  localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));

  const expenseList = document.querySelectorAll("#expense-history > div");
  for (let i = 0; i < expenseList.length; i++) {
    expenseList[i].setAttribute("id", i);
  }
}

function removeIncomeItem(target) {
  target.parentElement.remove();

  incomeHistory.splice(target.parentElement.id, 1);
  localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));

  const incomeList = document.querySelectorAll("#income-history > div");
  for (let i = 0; i < incomeList.length; i++) {
    incomeList[i].setAttribute("id", i);
  }

}

function saveExpenseHistory(name, amount, price) {
  expenseHistory.push([name, amount, price]);
  localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));
}

function saveIncomeHistory(price) {
  const shamsiDate = new Date().toLocaleDateString("fa-IR-u-nu-latn");
  incomeHistory.push([price, shamsiDate]);
  localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));
}
