const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{type:String, required:true},
    companyName: {type:String, required:true},
    location: {type:String, required:true},
    jobType: {type:String, enum:["full-time", "part-time", "contract", "internship", "remote"], default:"full-time"},
    salaryRange: {type:String, required:true},
    jobDescription: {type:String, required:true},
    requirements: {type:String, required:true},
    benefits: {type:String, required:true},
    contactEmail: {type:String, required:true},
    applicationDeadline: {type:Date, required:true},
    postedBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    embedding: { type: [Number], default: [] },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{
    timestamps: true
});


module.exports = mongoose.model('Job',jobSchema);