const router = require('express').Router();
//const { userInfo } = require('os');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
router.get('/dashboard', withAuth, async (req, res) => {
try{
    //we are finding the user by their session user id, and getting all posts associated with that user's account
    const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include:[{model: Post}, {model: Comment}],
    });
    //data serialization to get only the userData we want to target
    const user = userData.get({plain: true});
    console.log(user);
    //we are rendering the dashboard page and passing in all the values from the user array and the logged in status
    res.render('dashboard', {
        user,
        logged_in: true
    });
    
    
} catch(err){
    res.status(500).json(err);
}
});

router.get('/login', (req, res)=>{
//if the user is already logged in, pressing login will reroute them to their personal dashboard 
if(req.session.logged_in) {
    res.redirect('/dashboard');
    return;
}
res.render('login');
});

// get an individual post in detail by clicking on it
router.get('/post/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        //we are searching for an individual post based on which one the user clicked on
        //homepage.js handles the click event which triggers this request
      const postData = await Post.findByPk(req.params.id, 
        {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            //we also want to be able to access the comments
            model: Comment,
            include: [ {
              model: User,
              attributes: ['name'],
            } ]
          },
        ],
      }
      );
     
  
      const post = postData.get({ plain: true });
      console.log(post);


      res.render('viewPost', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  


module.exports = router;


//TODO:

//set up js for click event to select one of the blog posts
//set up route to query for the comments on that post
//display blog posts and comments on handlebars page
//set up form to add comment
//set up js functionality to add comment
//set up POST request route to add comment
//force refresh?  show new comments on page

//my dashboard: 
//set up route for PUT request to update own past posts
//set up form to update past posts


