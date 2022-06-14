



// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

let userDetails = {};

// get and set userDetails when page refreshes
if (localStorage.userDetails) {
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${userDetails.name}: ${userDetails.email}`));
    userList.appendChild(li);
}


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    // construct object
    userDetails.name = nameInput.value;
    userDetails.email = emailInput.value;
    // store in local sorage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
    userList.appendChild(li);
    nameInput.value = '';
    emailInput.value = '';
  }
}