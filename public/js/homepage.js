const openIndividualPostHandler = async (event) => {
    event.preventDefault();
    //event.stopPropagation();
    console.log("test");
    if(event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        console.log(id);
// get route /post/:id from homeRoutes.js
        const response = await fetch(`/post/${id}`, {
            method: 'GET'
        });
        // if(response.ok) {
        //     //document.location.replace('/');
        //    // document.location.reload()
        // } else {
        //     alert('Failed to get that post.')
        // }
    }
}

const buttonList = document.querySelectorAll('.post-list')
buttonList.forEach(Element => Element.addEventListener('click', openIndividualPostHandler));