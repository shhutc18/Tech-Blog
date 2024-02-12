// Define an asynchronous function to handle the delete post action
async function deleteFormHandler(event) {
    // Prevent the default button click behavior
    event.preventDefault();
  
    // Get the post id from the URL
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // Make a DELETE request to the posts API endpoint with the post id
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE', // Specify the request method
      body: JSON.stringify({
        post_id: id // Include the post id in the request body
      }),
      headers: {
        'Content-Type': 'application/json' // Specify the content type in the request headers
      }
    });
  
    // If the response is okay (status in the range 200-299)
    if (response.ok) {
      // Redirect the user to the dashboard page
      document.location.replace('/dashboard/');
    } else {
      // Otherwise, alert the user with the status text of the response
      alert(response.statusText);
    }
  }
  
  // Add an event listener to the button with the class 'delete-post-btn'
  // When the button is clicked, the deleteFormHandler function will be called
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);