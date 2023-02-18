async function editFormHandler(event) {
  event.preventDefault();

  // Get the user name, user id, email, and password from the form
  // friend helped me out with this. I got really confused in putting this together.
  let username = document.querySelector('input[name="user-name"]').value.trim();
  if (username.length) username = '"username": "' + username + '"';
  let email = document.querySelector('input[name="email"]').value.trim();
  if (email.length) email = '"email": "' + email + '"';
  let password = document.querySelector('input[name="password"]').value.trim();
  if (!password.length) {
    alert('You must enter your current password to confirm the changes or enter a new password.');
    return
  } else {
    password = '"password": "' + password + '"';
  }
  const id = document.querySelector('input[name="user-id"]').value;

  let userUpdate = '{' + [username, email, password].filter(value => value).join(',') + '}';
  userUpdate = JSON.parse(userUpdate)

  // update route to update post
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userUpdate),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // redirect to the dashboard page if response is good, otherwise display the error
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);