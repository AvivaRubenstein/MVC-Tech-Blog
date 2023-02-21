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

module.exports = router;