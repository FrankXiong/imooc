var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');

module.exports = function(app){
    // pre handler user
    app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        return next()
    })

    app.get('/',Index.index)


    app.get('/signin',User.showSigninPage)
    app.get('/signup',User.showSignupPage)
    app.post('/user/signin',User.signin)
    app.post('/user/signup',User.signup)
    app.get('/logout',User.logout)
    app.get('/admin/user/list',User.list)
    app.delete('/admin/user/list',User.del)

    app.get('/movie/:id',Movie.detail)
    app.get('/admin/movie/add',Movie.add)
    app.get('/admin/update/:id',Movie.update)
    app.post('/admin/movie',Movie.save)
    app.delete('/admin/movie/list',Movie.del)
    app.get('/admin/movie/list',Movie.list)

}