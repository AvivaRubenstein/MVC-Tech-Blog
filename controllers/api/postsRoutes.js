const router = require('express').Router();
const {Post} = require('../../models');
const withAuth = require('../../utils/auth');

//a post request to this route, /api/posts/ will allow a user to add a new Post to their account
//this post request will be made from a user clicking to create a post on their /dashboard page, using dashboard.js functionality
router.post('/', withAuth, async (req, res) =>{
try {
    const newPost = await Post.create({
        //we are passing in the entire request body
        ...req.body,
        //and specifying that the user id should be set the the user's id which is stored in the session so that all of a user's posts will be associated with their account
        user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
} catch (err){
    res.status(400).json(err);
}
});

//this is a delete request to the /api/posts/:id route
//it will take in an id from the data-id associated with the delete button for the specific post which had a delete button clicked --using dashboard.js functionality
router.delete('/:id', withAuth, async (req, res) => {
try{
    const postData = await Post.destroy({
        //we are deleting the post which has the id associated with the post we clicked to delete which is also associated with our user who is signed in
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        },
    });

    if(!postData){
        res.status(404).json({message: "No post was found with this id."});
        return;
    }

    res.status(200).json(postData);

} catch (err){
    res.status(500).json(err);

}
});


  //route to create a new comment on a post 
  // route is /api/posts/comment
  router.post('/comment', async (req, res) => {
    try {
      const newComment = await Comment.create({
          //we are passing in the entire request body
          ...req.body,
          //and specifying that the user id should be set the the user's id which is stored in the session so that all of a user's posts will be associated with their account
          user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
  } catch (err){
      res.status(400).json(err);
  }
  });

module.exports = router;