const openIndividualPostHandler = async (event) => {
    event.preventDefault();
    
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        console.log(id);
// get route /post/:id from homeRoutes.js
        const response = await fetch(`/post/${id}`, {
            method: 'GET'
        });
        console.log(response);
        if(response.ok) {
            //the detailed info is rendered at /post/:id, but we need to redirect the user there so they can see it
            document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText);
        }
    }
}

const buttonList = document.querySelectorAll('.post-list');
buttonList.forEach(Element => Element.addEventListener('click', openIndividualPostHandler));