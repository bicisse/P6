const Sauces = require('../models/sauces');
const fs = require('fs');


//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
//▶▶▶▶▶ CREATE A SAUCE
//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
// exports.createASauce = (req, res, next) => {
//   const sauce = new Sauces({
//    ...req.body
//   });

//   console.log('sauce', sauce);
//   sauce.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Sauce created successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

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
  .then(() => { res.status(201).json({message: 'Sauce enregistée !'})})
  .catch(error => { res.status(400).json( { error })})
};

/*〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
▶▶▶▶▶ GET A SINGLE SAUCE
〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰*/
exports.getASauce = (req, res, next) => {
 
  Sauces.findOne({_id : req.params.id}
  ).then(
    (sauce) => {
      console.log(sauce);
      // res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        notWorkingBecause: error
      });
    }
  );
};

//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
//▶▶▶▶▶ UPDATE A SAUCE
//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰

exports.updateASauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauces.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Sauces.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
//▶▶▶▶▶ DELETE A SAUCE
//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
exports.deleteASauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
//▶▶▶▶▶ GET ALL SAUCES
//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
//▶▶▶▶▶ LIKE A SAUCE
//〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰
exports.likeSauce = (req, res, next) => {
  delete req.body.userId; 
  const like = new Sauces({...req.body});
  like.save()
    .then(() => res.status(201).json({ message: 'LIKE enregistré !'}))
    .catch(error => res.status(400).json({error}));

};