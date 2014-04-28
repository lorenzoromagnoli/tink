# sailsjs-angularjs-bootstrap-example #

> A suite of examples written for Sails.js, AngularJS, and Twitter Bootstrap.

Contents:

- A REST API test page using Sails' transport agnostic routing (HTTP vs. Socket.io)
- A "Todo List" app demo using Sails' Socket.io messaging and REST Blueprints
- Passport middleware authentication integrated with Sails policies.
- Twitter Bootstrap / Font Awesome custom LESS compiles (Grunt)
- Cache busting JS/CSS for production (Grunt)

If there other examples you would like to see, feel free to
[create a GitHub issue](https://github.com/cgmartin/sailsjs-angularjs-bootstrap-example/issues/new).

## Screenshots ##



## Notes ##
*(as of Jan 7, 2014)*

Be wary, this repo has been quickly hacked together as a Sails.js/AngularJS
learning project. Do not consider it as production-ready code.

**REST API example page** (see `assets/linker/js/controllers/restCtrl.js`)

This API test page was primarily made to exercise the error handling of REST
calls between HTTP and Socket modes (404, 403, 500 errors). I am currently
seeing some odd behavior when throwing 500 application errors, and when 403
forbidden errors are triggered from policy configurations. The results are not
consistent between modes. More research is needed.

**Todo List app demo** (see `assets/linker/js/controllers/todoCtrl.js`)

This demo was written to explore how the socket.io connection, comet messages,
and auto-subscriptions work in Sails. The
[AngularJS TodoMVC](http://todomvc.com/architecture-examples/angularjs-perf/#/)
examples were used a bit for reference. The Sails socket.io code, which is
provided during creation of a new Sails project, was refactored into an Angular
service (see `assets/linker/js/angular-sails.io.js`). It contains custom retry
logic that first sends a `$http.get()` request to the server for obtaining the
security token cookie, otherwise you may encounter the
`500 error: "handshake error"` when restarting your local server
(See bottom of: [FAQ](http://sailsjs.org/#!documentation/sockets)).

If you stop the server or cause a network disconnect when on the example pages,
you should see some alert modals pop up. These are managed by SailsSocketCtrl
(see `assets/linker/js/controllers/sailsSocketCtrl.js`) for reuse across examples.

**Passport Integration**

Credit goes to [this gist](https://gist.github.com/theangryangel/5060446)
and its many forks.

You can log in using the dummy user/pass: `test/test123`.

Here are the files that were touched:
```
api/controllers/PassportAuthController.js
api/models/User.js
api/policies/isPassportAuthenticated.js
config/bootstrap.js
config/express.js
config/policies.js
config/routes.js
views/passportauth/login.jade
views/passportauth/protected.jade
```

**Grunt changes**

The Sails.js asset grunt tasks have been reconfigured to allow Twitter Bootstrap
and Font Awesome custom compiles (see `/assets/linker/styles/*.less`).
The grunt `copy` task has also been reconfigured to include other Bower-managed
client-side libraries.

**You may also like...**

[sailsCasts](http://irlnathan.github.io/sailscasts/) : A great series of
screencasts showing you how to use Sails.js.

The [levid/angular-sails-socketio-mongo-demo](https://github.com/levid/angular-sails-socketio-mongo-demo)
repo may also be of interest for Sails v0.8 users.

## Utilizes... ##

- [Sails.js v0.9](http://sailsjs.org/)
- [Twitter Bootstrap v3](http://getbootstrap.com/)
- [AngularJS v1.2](http://angularjs.org/)
- [Angular-UI Bootstrap](http://angular-ui.github.io/bootstrap/)
- [Font Awesome](http://fontawesome.io/)
- [Jade Templates](http://jade-lang.com/)
- [Socket.io](http://socket.io/)
- [Passport](http://passportjs.org/)
- [Node.js](http://nodejs.org/api/)
- [Bower](http://bower.io/)

## Installation ##

Ensure that sails and bower are installed:
```sh
sudo npm -g install sails bower
```

Clone this repo:
```sh
git clone https://github.com/cgmartin/sailsjs-angularjs-bootstrap-example.git
```

Run `npm` and `bower` to install all dependencies:
```sh
cd sailsjs-angularjs-bootstrap-example
npm install ; bower install
```

Lift the server:
```sh
sails lift
```

And then visit ([http://localhost:1337/](http://localhost:1337)) to run the examples.

## License ##

[MIT License](http://cgm.mit-license.org/)  Copyright © 2014 Christopher Martin