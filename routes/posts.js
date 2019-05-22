const router = require("express").Router();
const mongoose = require("mongoose")
const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')

router.get("/",  async (req, res)=>{
    const posts =  await Post.find({});
    res.send(posts)
})

router.post("/", async (req,res)=>{
    //res.send(req.body)
    const post = new Post();
    post.title = req.body.title
    post.content = req.body.content
    // post.image = req.body.file
    await post.save();
    res.send(post);
})


router.get('/:postId', async (req,res) => {
    const post = await Post.find({_id :req.params.postId})
    res.send(post)
})

router.put("/:postId", async (req,res)=>{
    //res.send(req.body)
    const post = await Post.findByIdAndUpdate({
        _id :req.params.postId
    }, req.body,{
            new:true,
            runValidator :true
    });
    res.send(post);
})

router.delete("/:postId", async (req,res)=>{
    //res.send(req.body)  
    const post = await Post.findByIdAndRemove({
        _id :req.params.postId
    });
    res.send(post);
})

/*Create a comment for the post*/
router.post("/:postId/comment",async (req, res) => {
    /* Find a Post */ 
    const post = await Post.findOne({_id : req.params.postId})
    /* Create a Post */
    const comment = new Comment();
    comment.content = req.body.content;
    comment.post = post._id;
    await comment.save();
    /* Associate Post with comment */
    post.comments.push(comment._id);
    await post.save();
    res.send(comment);
})

/*Read a comment for the post*/
 router.get("/:postId/comment", async (req,res)=>{
   const post = await Post.findOne({_id : req.params.postId}).populate("comments") 
   res.send(post);
 })


 /**Edit a comment */
 router.put("/comment/:commentId", async (req,res)=>{
     const comment = await Comment.findOneAndUpdate(
        {
            _id:req.params.commentId
        },
        req.body,
        {new:true,runValidators :true}
     );
     res.send(comment);
 })

 router.delete("/comment/:commentId", async (req,res) => {
     await Comment.findByIdAndRemove(req.params.commentId);res.send({message : "Comment Successfully Deleted"});
 })

module.exports = router;