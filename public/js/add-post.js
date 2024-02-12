// Define an asynchronous function to handle the form submission
async function newFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Select the title input, get its value
    const title = document.querySelector('input[name="post-title"]').value;
    // Select the post content input, get its value
    const post_content = document.querySelector('input[name="post-content"]').value;
  
    // Make a POST request to the posts API endpoint
    const response = await fetch(`/api/posts`, {
      method: 'POST', // Specify the request method
      body: JSON.stringify({
        title, // Include the title in the request body
        post_content // Include the post content in the request body
      }),
      headers: {
        'Content-Type': 'application/json' // Specify the content type in the request headers
      }
    });
  
    // If the response is okay (status in the range 200-299)
    if (response.ok) {
      // Redirect the user to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // Otherwise, alert the user with the status text of the response
      alert(response.statusText);
    }
  }
  
  // Add an event listener to the form with the class 'new-post-form'
  // When the form is submitted, the newFormHandler function will be called
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);