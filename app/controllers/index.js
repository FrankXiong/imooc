// index page
var Movie = require('../models/movie');
var Category = require('../models/category')
exports.index = function(req,res){
    console.log('user in session: '+req.session.user)

    Category
        .find({})
        // 限制每个分类下只显示5条数据
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,categories){
            if(err){
                console.log(err)
            }
            res.render('index',{
                title:'首页',
                categories:categories
            })
        })
}
