const {default: mongoose}= require(mongoose);

const productCategorySchema= mongoose.Schema({
    producCategorytName:{
        type: String,
        required: true
    }

})

const productCategory=mongoose.model("productCategory",productCategorySchema);
module.exports=productCategoryModel;