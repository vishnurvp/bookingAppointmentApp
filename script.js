
// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Get crudcrud URL and create a route
let crudURL = 'https://crudcrud.com/api/a45e37be7bc34c0dba17dfb85a666ff5/appointmentData';

// get existing users data from crudcrud
axios.get(crudURL)
.then((response)=>{
    let users=response.data;
    if (users.length===0) return; // if no data, do nothing
    for (let user of users) {dispUser(user);}
})
.catch(err=>console.log(err));

// display user function
function dispUser(user) {
    const li = document.createElement('li');
    li.className = 'list-items';
    li.email = user.email;
    li.name = user.name;
    li.id = user._id;
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
    let user = {};
    user.name = nameInput.value;
    user.email = emailInput.value;
    // post to crudcrud and save user data
    axios.post(crudURL,user)
    .then((response)=>{
        dispUser(response.data);
    })
    .catch(err=>console.log(err));

    nameInput.value = '';
    emailInput.value = '';
  }
}


userList.addEventListener('click', removeItem);
function removeItem(e){
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        userList.removeChild(li);
        let url = `${crudURL}/${li.id}`;
        // delete user data in crudcrud
        axios.delete(url).catch(err=>console.log(err));
    }
}


userList.addEventListener('click', editItem);
function editItem(e){
    if (e.target.classList.contains('edit')) {
        let li = e.target.parentElement;
        userList.removeChild(li);
        nameInput.value = li.name;
        emailInput.value = li.email;
        let url = `${crudURL}/${li.id}`;
        // delete user data in crudcrud
        axios.delete(url).catch(err=>console.log(err));

    }
}