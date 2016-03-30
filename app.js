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

// signin page
app.get('/signin',function(req,res){
    res.render('signin',{
        title:'登录'
    })
});

// signin page
app.get('/signup',function(req,res){
    res.render('signup',{
        title:'注册'
    })
});

//userlist page
app.get('/admin/user/list',function(req,res){
    User.fetch(function(err,users){
        if(err) console.log(err)
        res.render('user-list',{
            title:'用户列表页',
            users:users
        })  
    })
})

// admin movie list page
app.get('/admin/movie/list/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('movie-list',{
            title:'后台电影列表页',
            movies:movies
        })
    });
});

//admin movie update page
app.get('/admin/movie/update/:id',function(req,res){
    var id = req.params.id;

    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'后台电影更新页',
                movie:movie
            })
        })
    }
});

// amdin movie post
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

// movielist delete 
app.delete('/admin/movie/list',function(req,res){
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

// userlist delete
app.delete('/admin/user/list',function(req,res){
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

//signup
app.post('/user/signup',function(req,res){
    // 表单提交的是一个user对象
    var _user = req.body.user
    var name = _user.name
    console.log(_user)

    // findOne查找匹配到的第一个user
    User.findOne({name:name},function(err,user){
        if(err) console.log(err)

        if(user){
            // req.flash('error','用户名已存在！')
            return res.redirect('/admin/user/list')
        }else{
            var user = new User(_user)
            user.save(function(err,user){
                if(err) console.log(err)
                // req.flash('success','注册成功！')
                res.redirect('/')
            })
        }
    })  
})

// signin
app.post('/user/signin',function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name:name},function(err,user){
        if(err) console.log(err)
        //用户不存在 
        if(!user){
            // req.flash('success','用户名不存在')
            return res.redirect('/signin')
        }
        //调用comparePassword方法比对密码
        user.comparePassword(password,function(err,isMatch){
            if(err) console.log(err)
            if(isMatch){
                console.log('password is matched')
                return res.redirect('/')
            }else{
                console.log('password is not matched')
                return res.redirect('/')
            }

        })
    })
})