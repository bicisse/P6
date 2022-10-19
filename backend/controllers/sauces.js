const Sauces = require('../models/sauces');
const fs = require('fs');

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ CREATE A SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/

exports.createASauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauces({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => {
            res.status(201).json({
                message: 'Sauce enregistée !'
            })
        })
        .catch(error => {
            res.status(400).json({
                error
            })
        })
};

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ GET A SINGLE SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/
exports.getASauce = (req, res, next) => {

    Sauces.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                notWorkingBecause: error
            });
        }
    );
};

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ UPDATE A SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/

exports.updateASauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };

    delete sauceObject._userId;
    Sauces.findOne({
            _id: req.params.id
        })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                Sauces.updateOne({
                        _id: req.params.id
                    }, {
                        ...sauceObject,
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce modifiée!'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }));
            }
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        });
};

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ DELETE A SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/

exports.deleteASauce = (req, res, next) => {
    Sauces.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({
                    message: 'Not authorized'
                });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauces.deleteOne({
                            _id: req.params.id
                        })
                        .then(() => {
                            res.status(200).json({
                                message: 'Objet supprimé !'
                            })
                        })
                        .catch(error => res.status(401).json({
                            error
                        }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
};
/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ GET ALL SAUCES
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then(
            (sauce) => {
                res.status(200).json(sauce);
            })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ LIKE A SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/
exports.likeSauce = (req, res, next) => {

    Sauces.findOne({
            _id: req.params.id
        })
        .then((sauce) => {

            console.log('UsersLiked', sauce.usersLiked);
            console.log('UsersDisliked', sauce.usersDisliked);
            const userId = req.body.userId;
            const previousLikeVote = sauce.usersLiked.findIndex(element => element == userId);
            const previousDislikeVote = sauce.usersDisliked.findIndex(element => element == userId);
            console.log('REQ BODY LIKE', req.body.like);
            console.log('TEST TEST ', sauce.dislike);
            const thumb = req.body.like;
            //
            console.log('------');

            switch (thumb) {
                // ALREADY VOTED
                case 0:
                    if (previousDislikeVote !== -1) {
                        console.log("Don't dislike anymore");
                        Sauces.updateOne(
                          { _id: req.params.id},
                          {$inc: {dislikes: -1}, 
                       $pull: {usersDisliked: userId}
                      }
                        )
                            .then(() => res.status(200).json({
                                message: 'Dislike decreased'
                            }))
                            .catch(error => res.status(401).json({
                                error
                            }));
                    } else if (previousLikeVote !== -1) {
                        console.log("Don't like anymore");
                        Sauces.updateOne(
                          { _id: req.params.id},
                          {$inc: {likes: -1}, 
                       $pull: {usersLiked: userId}
                      }
                        )
                            .then(() => res.status(200).json({
                                message: 'Like decreased'
                            }))
                            .catch(error => res.status(401).json({
                                error
                            }));
                    }
                    break;
                    //LIKE
                case 1:
                    console.log('Like');
                    Sauces.updateOne(
                      { _id: req.params.id},
                      {$inc: {dislikes: +1}, 
                   $push: {usersDisliked: userId}
                  }
                    )
                    .then(() => res.status(200).json({
                        message: 'Like increased'
                    }))
                    .catch(error => res.status(401).json({
                        error
                    }));
                      break;

                    //DISLIKE
                case -1:
                    console.log('dislike');
                    Sauces.updateOne(
                      { _id: req.params.id},
                      {
                        $inc: {dislikes: +1}, 
                   $push: {
                          usersDisliked: userId
                      }
                  })
                  .then(() => res.status(200).json({
                      message: 'Dislike increased'
                  }))
                  .catch(error => res.status(401).json({
                      error
                  }));
                    break;
                default:
                    'Unexpected error'

            }

            console.log(req.body.like);
            console.log('UsersLiked', sauce.usersLiked);
            console.log('UsersDisliked', sauce.usersDisliked);

        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });


};