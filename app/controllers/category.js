var Category = require('../models/category');
var _ = require('underscore');


// admin add category page
exports.add = function(req,res){
    res.render('category',{
        title:'后台分类录入页',
        category:{}
    })
}



// //admin category update page
// exports.update = function(req,res){
//     var id = req.params.id;

//     if(id){
//         category.findById(id,function(err,category){
//             res.render('admin',{
//                 title:'后台电影分类更新页',
//                 category:category
//             })
//         })
//     }
// }

// amdin category save
exports.save = function(req,res){
    var _category = req.body.category
    var category = new Category(_category)

    category.save(function(err,category){
        if(err){
            console.log(err)
        }
        res.redirect('/admin/category/list')
    })
}

// // categorylist delete 
// exports.del = function(req,res){
//     var id = req.query.id
//     if(id){
//         category.remove({_id:id},function(err,category){
//             if(err){
//                 console.log(err)
//             }
//             res.json({success:1});
//         })
//     }
// }

// category list page
exports.list = function(req,res){
    Category.fetch(function(err,categories){
        if(err) console.log(err)
        res.render('category-list',{
            title:'分类列表页',
            categories:categories
        })  
    })
}