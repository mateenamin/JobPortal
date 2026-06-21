import mongoose from "mongoose";

const jobseeker = mongoose.Schema(
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

  
    }
)


// title       → Job ka naam
// description → Poori detail
// company     → Kaun si company ne post ki — User se link
// salary      → Kitni salary
// location    → Kahan
// category    → Konsi field
// status      → pending/approved/rejected — admin decide kare
// skills      → Kaunsi skills chahiye
// jobType     → Full time/Part time/Remote