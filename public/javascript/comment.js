// Define an asynchronous function to handle the form submission
async function commentFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Select the comment textarea, get its value, and trim any whitespace
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    // Get the post id from the URL
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // Check if the comment text exists
    if (comment_text) {
      // Make a POST request to the comments API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST', // Specify the request method
        body: JSON.stringify({
          post_id, // Include the post id in the request body
          comment_text // Include the comment text in the request body
        }),
        headers: {
          'Content-Type': 'application/json' // Specify the content type in the request headers
        }
      });
  
      // If the response is okay (status in the range 200-299)
      if (response.ok) {
        // Reload the current page
        document.location.reload();
      } else {
        // Otherwise, alert the user with the status text of the response
        alert(response.statusText);
      }
    }
  }
  
  // Add an event listener to the form with the class 'comment-form'
  // When the form is submitted, the commentFormHandler function will be called
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);