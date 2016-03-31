// var mongoose = require('mongoose')
// var Comment = mongoose.model('Comment')
var Comment = require('../models/comment')

exports.save = function(req,res){
    var _comment = req.body.comment
    var movieId = _comment.movie

    // 请求体中带有cid，说明此时是对评论进行回复
    if(_comment.cid){
        Comment.findById(_comment.cid,function(err,comment){
            var reply = {
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            }
            comment.reply.push(reply)
            comment.save(function(err,comment){
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/' + movieId)
            })
        })
    }
    // 请求体中没有cid，说明是普通的电影评论
    else{
        var comment = new Comment(_comment)

        comment.save(function(err,comment){
            if(err){
                console.log(err)
            }

            res.redirect('/movie/' + movieId)
        })
    }
}

