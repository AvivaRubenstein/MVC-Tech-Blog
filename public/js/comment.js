let post_id;

//Post route to create a new comment on a blog post
const newFormHandler = async (event) => {
    event.preventDefault();
    
    const content = document.querySelector('#comment-content').value.trim();
    console.log(content);
    if (event.target.hasAttribute('data-id')) {
        post_id = event.target.getAttribute('data-id');
       
}
    if (content) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({content, post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  //delete a user's comment
  const deleteCommentButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete the comment');
      }
    }
  };
  
  //route to page to update a user's comment --- this will only render the update page, not submit an actual update/put request
  const updateCommentButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        document.location.replace(`/api/comment/${id}`)
      } else {
        alert('Failed to delete the comment');
      }
    }
  }



  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
    var updateBtn = document.querySelectorAll('.update-comment-btn');
    for (i of updateBtn){
      i.addEventListener("click", updateCommentButtonHandler);
    }
    
    var deleteBtn = document.querySelectorAll('.delete-comment-btn');
    for (i of deleteBtn){
      i.addEventListener("click", deleteCommentButtonHandler);
    }