const {default: mongoose}= require(mongoose);

const productSubcategorySchema= mongoose.Schema({
    subcategoryName:{
        type: String,
        required: true
    }

})

const productSubcategory=mongoose.model("productSubcategory",productSubcategorySchema);
module.exports=productSubcategoryModel;