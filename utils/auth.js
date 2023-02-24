const withAuth = (req, res, next) => {
  console.log("WithAuth called");
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      console.log("Attemt to redirect");
      res.redirect('/login');
    } else {
      console.log("Ahould not get here");
      next();
    }
  };
  
  module.exports = withAuth;