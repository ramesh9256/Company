const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name : {
        type : String
    },
    salary : {
        type : Number
    },
    language : {
         type:String
    },
    city : {
        type : String
    },
    isManager: Boolean,
});


const employee = mongoose.model("employee" , EmployeeSchema);
module.exports = employee;