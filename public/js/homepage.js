const openIndividualPostHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("test");
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
// get route /post/:id from homeRoutes.js
        const response = await fetch(`/post/${id}`, {
            method: 'GET'
        });
        if(response.ok) {
            document.location.replace('/');

        } else {
            alert('Failed to get that post.')
        }
    }
}

document.querySelector('.post-list').addEventListener('click', openIndividualPostHandler);