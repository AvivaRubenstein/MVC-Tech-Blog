const router = require('express').Router();
//const { userInfo } = require('os');
const { Post, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

//this get request will display all of the existing blog posts on the homepage of the site
router.get('/', async (req, res) => {
try{
    const postData = await Post.findAll({
        include: [
            {model: User,
            attributes: ['name'],
        }
        ],
    });

    const posts = postData.map((post) => post.get({plain: true}));
    console.log(posts)
    res.render('homepage', {
        posts,
        //we are passing in logged_in status from session so that we can conditionally render the page with a login/logout button
        logged_in: req.session.logged_in
});
} catch(err) {
    res.status(500).json(err);
}
});

//this is a route for the users to see their own posts and create new
//will need to use withAuth middleware to confirm that user is logged in
// router.get('/', async (req, res) => {
// try{
//     const userData = await User.findByPk
    
// } catch(err){

// }
// });

router.get('/login', (req, res)=>{
//if the user is already logged in, pressing login will reroute them to their personal dashboard 
if(req.session.logged_in) {
    res.redirect('/dashboard');
}
res.render('login');
});



module.exports = router;


//TODO:
//set up login route
//set up login handlebars page
//set up login js file to handle login
//set up withAuth to log user in

//set up js for click event to select one of the blog posts
//set up route to query for the comments on that post
//display blog posts and comments on handlebars page
//set up form to add comment
//set up js functionality to add comment
//set up POST request route to add comment
//force refresh?  show new comments on page

//my dashboard: 
//set up route for PUT request to update own past posts
//set up route for DELETE request to delete own posts
//set up form to update past posts
//set up button to delete past posts


