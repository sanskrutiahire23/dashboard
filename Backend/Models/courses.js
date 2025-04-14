const mongoose=require('mongoose')

 
const courseSchema = new mongoose.Schema(
{
    image:{type:String, require:true},
    title:{type:String,require:true},
    subtitle:{type:String,require:true},
    rating:{type:Number,require:true}
}
);

 
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
