var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var User = require('./models/user');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 3000;
var app = new express();

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views/pages');
app.set('view engine','jade');

app.use(express.static(path.join(__dirname,'dist/static')));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.locals.moment = require('moment');

app.listen(port);

console.log('imooc started on port '+port);

// index page
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'首页',
            movies:movies
        })
    });
});

// detail page
app.get('/movie/:id',function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:movie.title,
            movie:movie
        });
    });
});

// admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'后台录入页',
        movie:{
            title:'',
            director:'',
            country:'',
            language:'',
            year:'',
            poster:'',
            flash:'',
            summary:''
        }
    });
});

// amdin post
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    console.log(req.headers['content-type']);

    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)
            })
        })
    }else{
        _movie = new Movie({
            title:movieObj.title,
            director:movieObj.director,
            language:movieObj.language,
            country:movieObj.country,
            summary:movieObj.summary,
            flash:movieObj.flash,
            poster:movieObj.poster,
            year:movieObj.year
        })

        _movie.save(function(err,movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movie._id)
        })
    }

});

// list page
app.get('/admin/list/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title:'后台列表页',
            movies:movies
        })
    });
});

app.get('/admin/update/:id',function(req,res){
    var id = req.params.id;

    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'后台更新页',
                movie:movie
            })
        })
    }
});

// list delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            res.json({success:1});
        })
    }
})

//signup
app.post('/user/signup',function(req,res){
    // 表单提交的是一个user对象
    var _user = req.body.user
    console.log(_user)
    var user = new User(_user)

    User.find({name:_user.name},function(err,user){
        if(err) console.log(err)

        if(user){
            res.redirect('/admin/userlist')
        }else{
            user.save(function(err,user){
                if(err) console.log(err)

                res.redirect('/')
            })
        }
    })

    
})

//userlist page
app.get('/admin/userlist',function(req,res){
    User.fetch(function(err,users){
        if(err) console.log(err)
        res.render('user-list',{
            title:'用户列表页',
            users:users
        })  
    })
})

// userlist delete movie
app.delete('/admin/userlist',function(req,res){
    var id = req.query.id
    if(id){
        User.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            res.json({success:1});
        })
    }
})