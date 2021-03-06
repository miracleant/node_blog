var config=require('config-lite')(__dirname);
var Mongolass=require('mongolass');
var mongolass=new Mongolass();
mongolass.connect(config.mongodb);

var moment=require('moment');
var objectIdToTimestamp=require('objectid-to-timestamp');

exports.User=mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
});

//根据id生成创建时间create_at
mongolass.plugin('addCreateAt',{
    afterFind:function(results){
        results.forEach(function(item){
            item.created_at=moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },

    afterFindOne:function (result){
        if(result){
            result.create_at=moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User.index({name:1},{unique:true}).exec();//根据用户名找到用户，用户明全局唯一

exports.Post=mongolass.model('Post',{
    author:{type:Mongolass.Types.ObjectId},
    title:{type:'string'},
    content:{type:'string'},
    pv:{type:'number'}
    })
exports.Post.index({author:1,_id:-1}).exec();//按创建时间降序查看用户的文章列表

exports.Comment=mongolass.model('comment',{
    author:{type:Mongolass.Types.ObjectId},
    content:{type:'string'},
    postId:{type:Mongolass.Types.ObjectId}
});
exports.Comment.index({postId:1,_id:1}).exec();
exports.Comment.index({author:1,_id:1}).exec();