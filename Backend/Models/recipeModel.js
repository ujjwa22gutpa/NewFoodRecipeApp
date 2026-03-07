const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true,
    },
    ingrediants:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    image:{
        type:String,
      
    },
   user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
    
});

const recipeModel = mongoose.model('recipedatas',recipeSchema);
module.exports = recipeModel;