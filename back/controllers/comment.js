const postModel = require('../models/post');

exports.createComment = (req, res, next) => {
  postModel.findOne({ _id: req.params.id })
    .then((post) => {
      //console.log(post);
      postModel.updateOne(
        { _id: req.params.id },
        { $push: [{ comments: req.body }]}
      );
      res.status(201).json({message:'comment created'});
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.editComment = (req, res, next) => {
  postModel.findOne({ _id: req.params.id })
    .then((post) => {
      //console.log(post);
      postModel.updateOne(
        { _id: req.params.id },
        { $push: { comments: req.body } }
      );
      res.status(201).json({message:'comment edited'});
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.deleteComment = (req, res, next) => {
    postModel.findOne({ _id: req.params.id })
      .then((post) => {
        console.log(post);
        postModel.updateOne(
          { _id: req.params.id },
          { $pull: { comments: req.body } }
        );
        res.status(201).json({message:'comment deleted'});
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  };
  