//the dashboard page allows a user to add a new post to the blog
//when the user hits submit, the information they put into the form regarding their post 
//will be put into a post request to /api/dashboard/ to create a new Post
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const updateButtonHandler = async (event) =>{
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/dashboard/post/${id}`, {
        method: 'GET',
  });
  if(response.ok){
    document.location.replace(`/dashboard/post/${id}`);
  } else {
    alert(response.statusText);
  }}
  }
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
 let delBtns =  document.querySelectorAll('.del-btn');
    for (i of delBtns){
      i.addEventListener('click', delButtonHandler);
    }

  let updateBtns = document.querySelectorAll('.update-btn');
  for (i of updateBtns){
    i.addEventListener('click',updateButtonHandler )
  }
   