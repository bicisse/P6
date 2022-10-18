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
            console.log(sauce.usersLiked);
            const userId = req.body.userId;
            const previousLikeVote = sauce.usersLiked.findIndex(element => element == userId);
            const previousDislikeVote = sauce.usersDisliked.findIndex(element => element == userId);
            console.log(req.body.like);
            const thumb = req.body.like;
            //
            function incLike() {
                Sauces.updateOne({
                        _id: req.params.id
                    }, {
                        $inc: {
                            like: +1
                        },
                        $push: {
                            usersLiked: userId
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'UPDATED!'
                    }))
                    .catch(error => res.status(401).json({
                        error: error
                    }));
            }


            function incDislike() {
                Sauces.updateOne({
                        _id: req.params.id
                    }, {
                        $inc: {
                            dislike: +1
                        },
                        $push: {
                            usersDisliked: userId
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Dislike increase'
                    }))
                    .catch(error => res.status(401).json({
                        error: error
                    }));
            }

            function decLike() {
                Sauces.updateOne({
                        _id: req.params.id
                    }, {
                        $inc: {
                            like: -1
                        },
                        $pull: {
                            usersLiked: userId
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Liked cancelled'
                    }))
                    .catch(error => res.status(401).json({
                        error: error
                    }));
            }

            function decDislike() {
                Sauces.updateOne(
                  {
                        _id: req.params.id
                    }, {
                        $inc: {
                            dislike: -1
                        },
                        $pull: {
                            usersDisliked: userId
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Disliked cancelled'
                    }))
                    .catch(error => res.status(401).json({
                        error: error
                    }));
            }

function top(XXX){
  Sauces.updateOne( 
    XXX
     )
.then(() => res.status(200).json({
    message: 'Disliked cancelled'
}))
.catch(error => res.status(401).json({
    error: error
}));
}


            console.log('NEWWWWWW');

            switch (thumb) {
                // ALREADY VOTED
                case 0:
                    if (previousDislikeVote !== -1) {
                        console.log("Don't dislike anymore");
                        decDislike()
                    } else if (previousLikeVote == !-1) {
                        console.log("Don't like anymore");
                        decLike()
                    }
                    break;
                    //LIKE
                case 1:
                    console.log('Like');
                    incLike()
                    break;

                    //DISLIKE
                case -1:
                    console.log('dislike');
                    incDislike()
                    break;
                default:
                    'Unexpected error'

            }

            console.log(req.body.like);
            console.log('PD', previousDislikeVote);
            console.log('PL', previousLikeVote);
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });


};