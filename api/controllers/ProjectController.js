/**
 * ProjectController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {

  'new': function (req,res){
  	res.view();
  },
  create: function(req, res, next) {

    var projectObj = {
      name: req.param('name'),
      owner: req.param('owner')
    }
    Project.create(projectObj, function projectCreated(err, project) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/user/projectList');
      }
      res.redirect('/project/open/' + project.id);
      //res.json(project)
    });
  },

  'open': function(req, res, next) {
    Project.findOne(req.param('id'), function foundProject(err, project) {
      if (err) return next(err);
      if (!project) return next();
      res.view({
        project: project
      });
    });
  },


  'show': function(req, res, next) {
    Project.findOne({id:req.param('id')}).populate('cObjects').populate('wServices').populate('connections').exec(function foundProject(err, project) {
      if (err) return next(err);
      if (!project) return next();
      // pass the array down to the /views/index.ejs page
      res.send(project)
      //  res.json(user)

    });
  },

  subscribe: function(req, res) {
 
    // Find all current users in the user model
    Project.find(function foundUsers(err, projects) {
      if (err) return next(err);
 
      // subscribe this socket to the User model classroom
      Project.subscribe(req.socket);
 
      // subscribe this socket to the user instance rooms
      Project.subscribe(req.socket, projects);
 
      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  },




  
};
