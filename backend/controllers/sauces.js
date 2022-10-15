const Sauces = require('../models/sauces');

//▶▶▶▶▶ CREATE A NEW SAUCE
exports.createSauces = (req, res, next) => {
const sauces = new Sauces ({
    ...req.body
    
});
sauces.save()
    .then(()=> {res.status(201).json({message: 'Post saved successfully'})})
    .catch( (error) => { res.status(400).json({error})});

} 
//▶▶▶▶▶ ADD A NEW SAUCE
exports.createOneThing = (req, res, next) => {
    Sauces.findOne({ userId: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

//▶▶▶▶▶ GET ONE SAUCE
exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({
      userId: req.params.id
    }).then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

//▶▶▶▶▶ MODIFY A SAUCE
exports.modifySauce = (req, res, next) => {
    const sauces = new Sauces ({
        ...req.body
        
    });
    Sauces.updateOne({userId: req.params.id}, sauces)
    .then(() => {res.status(201).json({ message: 'Sauce updated successfully!'});})
    .catch(error => res.status(404).json({ error }));
};
      



//▶▶▶▶▶ DELETE A SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauces.deleteOne({userId: req.params.id})
    .then(() => {res.status(200).json({message: 'Deleted!'});})
    .catch((error) => {res.status(400).json({ error: error });});
  };

//▶▶▶▶▶ DISPLAY ALL SAUCES
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
    .then((sauces) => {res.status(200).json(sauces);})
    .catch((error) => {res.status(400).json({error: error});});
  };


//▶▶▶▶▶ LIKE A SAUCE
exports.likeSauce = (req, res, next) => {
    delete req.body.userId; 
    const like = new Sauces({...req.body});
    like.save()
      .then(() => res.status(201).json({ message: 'LIKE enregistré !'}))
      .catch(error => res.status(400).json({error}));
  
};


