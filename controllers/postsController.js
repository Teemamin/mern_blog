
exports.getAllPosts = async (req,res,next)=>{
    res.send('all posts view')
}

exports.addPost = async (req,res,next)=>{
    res.send('add view')
}

exports.editPost = async (req,res,next)=>{
    res.send('edit view')  
}

exports.deletePost = async (req,res,next)=>{
    res.send('delete view')
    
}