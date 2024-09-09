

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderExpenses();
  document.getElementById('add-btn').addEventListener('click', addExpense);
});


function addExpense() {

  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  
  if (name && amount) {

    const expense = {
      id: Date.now(),
      name,
      amount
    
    };
    
    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    
    nameInput.value = '';
    amountInput.value = '';
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Expense added successfully",
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...Please enter expense details",
      position: "center",
      showConfirmButton: false,
      timer: 2000,

    });
     }
}

function renderExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';
  total = 0;

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name.toUpperCase()} => Rs ${expense.amount}</span>
      <div class="actions">
        <button class="edit-color" onclick="editExpense(${expense.id})">Edit</button>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
      </div>
    `;
    expenseList.appendChild(li);
    total += expense.amount;
  });
  
  document.getElementById('total').innerText = total.toFixed(2);
}

function editExpense(id) {
  const expense = expenses.find(e => e.id === id);
  const newName = prompt('Edit Expense Name:', expense.name);
  const newAmount = parseFloat(prompt('Edit Expense Amount:', expense.amount));
  
  if (newName && !isNaN(newAmount)) {
    expense.name = newName.trim();
    expense.amount = newAmount;
    saveExpenses();
    renderExpenses();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Expense Update successfully",
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...Something went wrong!",
      position: "center",
      showConfirmButton: false,
      timer: 1500

    });
  }
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpenses();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Expense Deleted successfully",
    showConfirmButton: false,
    timer: 1500
  });
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
