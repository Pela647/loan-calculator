// listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // hide results
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults() {
  // UI Vars
  const amount = document.getElementById("amount"),
        interest = document.getElementById("interest"),
        years = document.getElementById("years"),
        monthlyPayment = document.getElementById("monthly-payment"),
        totalPayment = document.getElementById("total-payment"),
        totalInterest = document.getElementById("total-interest"),
        principal = parseFloat(amount.value),
        calculatedInterest = parseFloat(interest.value) / 100 / 12,
        calculatedPayments = parseFloat(years.value) * 12;

  // monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please check your numbers");
    document.getElementById("loading").style.display = "none";
  }
}

function showError(error) {
  const errorDiv = document.createElement("div"),
        card = document.querySelector(".card"),
        heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
