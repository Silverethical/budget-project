"use strict";

// variables
let htmlRemoveBtn = document.querySelector("#remove-btn"),
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
  activateForm();
  showUserBudget();
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

    showUserBudget()
    showExpenseForm()
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

    let userBudget = Number(localStorage.getItem("userBudget"));
    userBudget -= htmlExpenseTransactionPrice * htmlExpenseTransactionAmount;
    localStorage.setItem("userBudget", userBudget);
    showUserBudget();

    const itemDiv = document.createElement("div"),
      removeDiv = document.createElement("div");

    removeDiv.innerHTML = `<span id="remove-btn" onclick="removeItem(this)">x</span>`;
    itemDiv.innerHTML = `
            <span>${htmlExpenseTransactionName}</span>
            <span>تعداد ${htmlExpenseTransactionAmount}</span>
            <span>${htmlExpenseTransactionPrice} ریال</span>`;
    itemDiv.appendChild(removeDiv);

    htmlExpenseHistory.appendChild(itemDiv);
  }
}

function removeItem(target) {
    target.parentElement.parentElement.remove()
  }
  