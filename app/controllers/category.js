var Category = require('../models/category');
var _ = require('underscore');

// exports.detail = function(req,res){
//     var id = req.params.id;
//     category.findById(id,function(err,category){
//         Comment
//             .find({category:id})
//             // populate()根据from的objectId拿到catogory.name
//             .populate('from','name')
//             .populate('reply.from reply.to','name')
//             .exec(function(err,comments){
//                 console.log(comments)
//                 res.render('detail',{
//                     title:category.title,
//                     category:category,
//                     comments:comments
//                 })
//             })
//     });
// }

// admin add category page
exports.add = function(req,res){
    res.render('admin-category',{
        title:'后台分类录入页',
        category:{}
    });
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

// amdin category post
exports.save = function(req,res){
    var _category = req.body.category
    var category = new Category(_category)

    // if(id !== 'undefined'){
    //     category.findById(id,function(err,category){
    //         if(err){
    //             console.log(err)
    //         }
    //         _category = _.extend(category,categoryObj);
    //         _category.save(function(err,category){
    //             if(err){
    //                 console.log(err)
    //             }
    //             res.redirect('/category/'+category._id)
    //         })
    //     })
    // }else{

        category.save(function(err,category){
            if(err){
                console.log(err)
            }
            res.redirect('/admin/category/list')
        })
    // }
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


exports.list = function(req,res){
    Category.fetch(function(err,categories){
        if(err) console.log(err)
        res.render('admin-category-list',{
            title:'分类列表页',
            categories:categories
        })  
    })
}