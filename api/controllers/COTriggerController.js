var cotrigger = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var cOTriggerObj = {
      cObject: req.param('cObject'),

    }
    COTrigger.create(cOTriggerObj, function cObjectCreated(err, COTrigger) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log("err");
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.send('error');
      }
      //  res.redirect('/project/index/' + project.id);
      console.log("new TRigger",COTrigger);
      res.send(COTrigger);
      });
  },

    delete: function(req,res,next){
    COTrigger.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted COTrigger", req.param('id'));
    });
      res.send(COTrigger);

    },



};

module.exports = cotrigger;
