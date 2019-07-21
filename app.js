//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //Hide the results
  document.getElementById('results').style.display = 'none';

  //Show loaders
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculatedResults, 2000);

  e.preventDefault();
});

//Calculate Results
function calculatedResults() {
  console.log('Calculating...');
  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly =
    (principal * x * calculatedInterest, calculatedPayments) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //Show Results
    document.getElementById('results').style.display = 'block';
    //Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    //console.log('Please check your numbers');
    showError('Please Check your numbers');
  }
}

function showError(error) {
  //Show Results
  document.getElementById('results').style.display = 'none';
  //Hide loader
  document.getElementById('loading').style.display = 'none';
  //Create a div
  const errorDiv = document.createElement('div');

  //Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 secs
  setTimeout(cleaerError, 3000);
}

function cleaerError() {
  document.querySelector('.alert').remove();
}
