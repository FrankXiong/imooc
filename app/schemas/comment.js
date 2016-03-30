var mongoose = require('mongoose');
var Schema = mongoose.Schema
//  使用ObjectId实现关联文档的查询
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
    movie:{
        type:ObjectId,
        // 引用MovieSchema
        ref:'Movie'
    },
    from:{
        type:ObjectId,
        ref:'User'
    },
    to:{
        type:ObjectId,
        ref:'User'
    },
    content:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});

CommentSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = CommentSchema;