import mongoose from 'mongoose'


import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',           // Kaun si job ke liye apply kiya
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',          // Kisne apply kiya
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  coverLetter: {
    type: String          // Optional — applicant ka message
  }
}, { timestamps: true })

export default mongoose.model('Application', applicationSchema)




// job         → Kaun si job — Job model se link
// applicant   → Kisne apply kiya — User model se link
// status      → pending/accepted/rejected
// coverLetter → Applicant ka message




// Ek Important Cheez — ref Kya Hai:
// jscompany: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User'
// }

// ref = Doosre model se link karo!

// Job mein company ka sirf ID save hogi

// Baad mein populate() se poora user data aa jayega!



// Teeno Models Ka Relation:
// User (Company) → posts → Job
//                               ↓
// User (JobSeeker) → applies → Application