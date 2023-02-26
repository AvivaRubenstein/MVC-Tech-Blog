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

  //delete a specific comment
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const delComment = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
      },
      });
      res.status(200).json(delComment);
      
  } catch (err){
      res.status(400).json(err);
  }
  });

    //update a specific comment
  //route: /api/comment/id
    router.put('/:id', withAuth, async (req, res) =>  {
      try {
        const delComment = await Comment.update(
          {
            content: req.body.content,
          },
          {
          where: {
            id: req.params.id,
            user_id: req.session.user_id
        }},
        );
        res.status(200).json(delComment);
        
    } catch (err){
        res.status(400).json(err);
    }
    });

  router.get('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.findOne({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
      },
      });
    
      const comment = commentData.get({ plain: true });
      
      res.render('updateComment', {
        comment,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
        
      });
      
  } catch (err){
      res.status(500).json(err);
  }
  });

  module.exports = router;