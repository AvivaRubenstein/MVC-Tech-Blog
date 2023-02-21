const router = require('express').Router();
const {User} = require('../../models');

//this is the post route to create a new user 
//Route: /api/users/
//hitting submit on the create new user form will send a post request to the api/users/ route
//we will pass in the information from the signup form (username, password, etc) as the request body
router.post('/', async (req, res) => {
try{
    const newUserData = await User.create(req.body);

    req.session.save(()=> {
        //the user's session id will be equal to the new User's id 
        req.session.user_id = newUserData.id;
        //we will set the session's logged in value to true, so that we can reference the logged in attribute later to check login status
        req.session.logged_in = true;

        //returning the new User's info to the page
        res.status(200).json(newUserData);

        //when signup is successful, the login.js file reroutes the user to the /dashboard endpoint
    });
} catch (err) {
    res.status(400).json(err);
}
});

//Route: /api/users/login
//hitting the submit button on the /login page will send a post request to the /api/users/login page
router.post('/login', async (req,res)=> {
try{
    //we try to find a User whose email matches the email entered in the login form (which goes in as the req body)
    const userData = await User.findOne({where: {email: req.body.email}});
    //if we don't find a User associated with that email, we tell the user that login failed 
    if(!userData){
        res.status(400).json({message: "Incorrect email or password!"});
        return;
    }
    //otherwise, we continue, and check the password using the checkPassword function we defined in the User model
    const validPassword = await userData.checkPassword(req.body.password);
    //if the entered password does not match the password stored with the User, we tell the user login failed
    if(!validPassword) {
        res.status(400).json({message: 'Incorrect email or password!'});
        return;
    }

    //if the User is found by their email, and their password entry matches the pw associated with the User's account, we save the session and log them in
    req.session.save(()=> {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({user: userData, message: "You are now logged in!"});
        //if login is successful, login.js file will reroute the user to their dashboard page
    });

}catch(err){
    res.status(400).json(err);

}
});

//Route: /api/users/logout
//this is the route to log out of a User account (note that sessions will also expire automatically if left alone)
router.post('/logout', (req, res) => {
//if the User is logged in according to their session info, we destroy the session
if(req.session.logged_in){
    req.session.destroy(()=> {
        res.status(204).end();
    });
} else {
    res.status(404).end();
}
});

module.exports = router;