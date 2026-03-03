const joi = require('joi');

const recipeValidation = (req,res,next)=>{
     
        const schema = joi.object({
           tittle:joi.string().min(4).max(50).required(),
           time:joi.string().min(1).max(50).required(),
           ingrediants:joi.string().min(5).max(100).required(),
           instructions:joi.string().min(4).max(500).required(),
           image:joi.string()
        })
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(403).json({
                 message:"Bad Request",
                 success:false
            })
        }
     next();
}

const idValidation = (req,res,next)=>{
    const schema = joi.object({
        id:joi.string().hex().length(24).required()
    })
    const id = req.params.id;
    const {error} = schema.validate({id});
    if(error){
        return res.status(403).json({
             message:"Bad Request",
             success:false
        })
    }
    next();
}

module.exports = {recipeValidation, idValidation};