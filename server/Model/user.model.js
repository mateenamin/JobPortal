import mongoose from "mongoose";


const userScheme = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type: String,
    required: true
    },
    company : {
         type: String    // Sirf company wala fill karega
    },
    phone: {
    type: String
  },
    role : {
        type: String,
    enum: ['admin', 'company', 'jobseeker'],
    default: 'jobseeker'
    }
},
      {timestamps : true}
    
)

export default mongoose.model('user' , userScheme
)



// Kyun yeh fields:
// name     → Sab ka naam
// email    → Login ke liye
// password → Secure login
// role     → Kaun hai? Admin/Company/JobSeeker
// company  → Company ka naam — sirf company fill karega
// phone    → Contact number


