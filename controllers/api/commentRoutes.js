const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

  //route to create a new comment on a post 
  // route is /api/comment
  router.post('/', withAuth, async (req, res) => {
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