//when someone clicks update on dashboard, render updateOrDelete page, query for that post that was clicked
//render the post info about that post
//set value of textareas to be the title and content of original post
//submit button should do a put request to update the content

const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector('#post-title').value.trim();
        const content = document.querySelector('#post-content').value.trim();

if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
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
}}

} 


const deleteButtonHandler = async (event) =>{
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
}
var updateButton = document.querySelector('#update-btn');
updateButton.addEventListener('click', updateButtonHandler);

var deleteButton = document.querySelector("#del-btn");
deleteButton.addEventListener("click", deleteButtonHandler);
