
// dom load event

// window.addEventListener('DOMContentLoaded', (event) => {
//     userDetails = JSON.parse(localStorage.getItem('userDetails'));
// });


// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');


// use array for storage
let userDetails = [];
let count = 0;
// get and set userDetails when page refreshes
if (localStorage.userDetails) {
    // userDetails has multiple users
    userDetails = JSON.parse(localStorage.getItem('userDetails'));

    for (user of userDetails) {
        const li = document.createElement('li');
        li.className = 'list-items';
        li.email = user.email;
        li.name = user.name;
        li.index = count;
        li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));

        let edit = document.createElement('button');
        edit.className = 'lbtn edit ';
        edit.appendChild(document.createTextNode('Edit'))
        li.appendChild(edit);

        const delButton = document.createElement('button');
        delButton.className = 'lbtn delbtn delete';
        delButton.appendChild(document.createTextNode('X'));
        li.appendChild(delButton);

        userList.appendChild(li);
        count++;
    }
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
    let user = {};
    user.name = nameInput.value;
    user.email = emailInput.value;
    let flag = true;
    for (let i=0; i<userDetails.length; i++) {
        if (userDetails[i].email === user.email){
            flag = false;
            userDetails[i].name = user.name;
        } 
    }
    if (flag) {
        userDetails.push(user);
    }
    // store in local sorage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    const li = document.createElement('li');
    li.email = user.email;
    li.name = user.name;
    li.index = count;
    count++;


    let edit = document.createElement('button');
    edit.className = 'edit lbtn';
    edit.appendChild(document.createTextNode('Edit'))
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
    li.appendChild(edit);


    const delButton = document.createElement('button');
    delButton.className = 'lbtn delbtn delete';
    delButton.appendChild(document.createTextNode('X'));
    li.appendChild(delButton);

    userList.appendChild(li);


    nameInput.value = '';
    emailInput.value = '';
  }
}


userList.addEventListener('click', removeItem);
function removeItem(e){
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        userList.removeChild(li);
        for (let i=0; i<userDetails.length; i++) {
            if (userDetails[i].email === li.email) 
            userDetails.splice(i, 1);
            break;
        }
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
}


userList.addEventListener('click', editItem);
function editItem(e){
    if (e.target.classList.contains('edit')) {
        
        let li = e.target.parentElement;
        userList.removeChild(li);
        for (let i=0; i<userDetails.length; i++) {
            if (userDetails[i].email === li.email) 
            userDetails.splice(i, 1);
            break;
        }
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        nameInput.value = li.name;
        emailInput.value = li.email;


    }
}