$(document).ready(function () {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function renderExpenses(filterMonth = null) {
    $("#expense-list").empty();
    let total = 0;

    const filtered = filterMonth
      ? expenses.filter(e => e.date.startsWith(filterMonth))
      : expenses;

    filtered.forEach((expense, index) => {
      const item = $(`
        <li class="list-group-item">
          <div>
            <strong>${expense.name}</strong><br>
            <small>${expense.date}</small>
          </div>
          <div>
            ₹${expense.amount}
            <button class="btn btn-sm btn-danger ms-2 delete-expense" data-index="${index}">Delete</button>
          </div>
        </li>
      `);
      $("#expense-list").append(item);
      total += parseFloat(expense.amount);
    });

    $("#total-amount").text(`₹${total.toFixed(2)}`);
  }

  $("#expense-form").submit(function (e) {
    e.preventDefault();
    const name = $("#expense-name").val();
    const amount = $("#expense-amount").val();
    const date = $("#expense-date").val();

    expenses.push({ name, amount, date });
    saveExpenses();
    renderExpenses($("#filter-month").val());

    this.reset();
  });

  $("#expense-list").on("click", ".delete-expense", function () {
    const index = $(this).data("index");
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses($("#filter-month").val());
  });

  $("#filter-month").on("change", function () {
    renderExpenses(this.value);
  });

  renderExpenses();
});

