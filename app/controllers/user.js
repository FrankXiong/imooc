var User = require('../models/user');
//userlist page
exports.list = function(req,res){
    User.fetch(function(err,users){
        if(err) console.log(err)
        res.render('user-list',{
            title:'用户列表页',
            users:users
        })  
    })
}

//signup
exports.signup = function(req,res){
    // 表单提交的是一个user对象
    var _user = req.body.user
    var name = _user.name
    console.log(_user)

    // findOne查找匹配到的第一个user
    User.findOne({name:name},function(err,user){
        if(err) console.log(err)

        if(user){
            console.log('error:用户名已存在！')
            return res.redirect('/signup')
        }else{
            var user = new User(_user)
            user.save(function(err,user){
                if(err) console.log(err)
                console.log('success:注册成功！')
                res.redirect('/')
            })
        }
    })  
}

// signin
exports.signin = function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name:name},function(err,user){
        if(err) console.log(err)
        //用户不存在 
        if(!user){
            console.log('error:用户名不存在！')
            return res.redirect('/signin')
        }
        //调用comparePassword方法比对密码
        user.comparePassword(password,function(err,isMatch){
            if(err) console.log(err)
            if(isMatch){
                // session存储登录信息
                req.session.user = user
                console.log('success:密码正确！')
                return res.redirect('/')
            }else{
                console.log('error:密码错误！')
                return res.redirect('/')
            }

        })
    })
}


// logout
exports.logout = function(req,res){
    delete req.session.user
    // delete app.locals.user
    res.redirect('/')
}

// user delete
exports.del = function(req,res){
    var id = req.query.id
    if(id){
        User.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            res.json({success:1});
        })
    }
}

// signin page
exports.showSigninPage = function(req,res){
    res.render('signin',{
        title:'登录'
    })
}

// signup page
exports.showSignupPage = function(req,res){
    res.render('signup',{
        title:'注册'
    })
}