import mongoose from "mongoose";

const jobseeker = new mongoose.Schema(
    {
       title: {
    type: String,
    required: true        // Job ka title — zaroori
  },
  description: {
    type: String,
    required: true        // Job ki detail
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',          // User model se link — company kaun hai
    required: true
  },
  salary: {
    type: String          // "50,000 - 80,000"
  },
  location: {
    type: String,
    required: true        // Lahore, Karachi etc
  },
  category: {
    type: String,
    enum: ['IT', 'Marketing', 'Sales', 'Design', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'    // Pehle pending — admin approve kare
  },
  skills: [String],       // ["React", "Node", "MongoDB"]
  jobType: {
    type: String,
    enum: ['fulltime', 'parttime', 'remote'],
    default: 'fulltime'
  }

  
    },
    { timestamps: true }
)

export default mongoose.model('Job', jobseeker)

// title       → Job ka naam
// description → Poori detail
// company     → Kaun si company ne post ki — User se link
// salary      → Kitni salary
// location    → Kahan
// category    → Konsi field
// status      → pending/approved/rejected — admin decide kare
// skills      → Kaunsi skills chahiye
// jobType     → Full time/Part time/Remote