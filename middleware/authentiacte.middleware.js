const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.token;
    if(token===undefined){
        res.send("Please Login And Send As Header")
    }else{
        try {  
            let data= jwt.verify(token,process.env.KEY)
            req.body.user_id=data.user_id
            next()
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports={
    authenticate
}
