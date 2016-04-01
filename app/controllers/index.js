// index page
var Movie = require('../models/movie');
var Category = require('../models/category')

exports.index = function(req,res){
    console.log('user in session: '+req.session.user)

    Category
        .find({})
        // 限制每个分类下只显示5条数据
        .populate({path:'movies',options:{limit:4}})
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

// exports.search = function(req,res){
//     var catId = req.query.cat
//     var q = req.query.q
//     var count = 2

//     if(catId){

//     }else{
//         Movie
//             .find({title:})
//             .exec(function(err,movies){
//                 if(err){
//                     console.log(err)
//                 }
//                 var results = movies.slice(index,index + count)

//                 res.render('index',{
//                     title:'搜索结果',
//                     keyword:q,
//                     query:'q=' + q,
//                     movies:results
//                 })
//             })
//     }
// }

