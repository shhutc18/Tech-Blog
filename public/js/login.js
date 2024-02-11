// Define an asynchronous function 'loginFormHandler' to handle the login form submission
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the email and password values from the form, trimming any leading/trailing whitespace
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // If both email and password were provided
    if (email && password) {
      // Send a POST request to the '/api/users/login' endpoint with the email and password as the request body
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response was OK (status code in the range 200-299), redirect the user to the home page
      // Otherwise, show an alert indicating that the login failed
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
};
  
// Define an asynchronous function 'signupFormHandler' to handle the signup form submission
const signupFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the username, email, and password values from the form, trimming any leading/trailing whitespace
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // If username, email, and password were all provided
    if (username && email && password) {
      // Send a POST request to the '/api/users' endpoint with the username, email, and password as the request body
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response was OK (status code in the range 200-299), redirect the user to the home page
      // Otherwise, show an alert indicating that the signup failed
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
};
  
// Add an event listener to the login form to call 'loginFormHandler' when the form is submitted
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
// Add an event listener to the signup form to call 'signupFormHandler' when the form is submitted
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);