import Application from '../Model/application.model.js'
import Job from '../Model/job.model.js'

// APPLY FOR JOB — Sirf JobSeeker
export const applyJob = async (req, res) => {
  try {
    const { coverLetter } = req.body
    const jobId = req.params.id

    // Job exist karta hai?
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job nahi mili!'
      })
    }

    // Pehle se apply kiya?
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    })
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'Pehle se apply kar chuke ho!'
      })
    }

    // Application banao
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      coverLetter
    })

    res.status(201).json({
      success: true,
      message: 'Apply ho gaya!',
      data: application
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// MY APPLICATIONS — JobSeeker ki sab applications
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title location salary company status')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: applications.length,
      data: applications
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// JOB KE APPLICANTS — Company dekhe
export const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.id })
      .populate('applicant', 'name email phone')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: applications.length,
      data: applications
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// UPDATE APPLICATION STATUS — Company
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application nahi mili!'
      })
    }

    res.json({
      success: true,
      message: `Application ${status} ho gayi!`,
      data: application
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}