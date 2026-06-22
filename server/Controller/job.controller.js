import Job from '../Model/job.model.js'

// CREATE JOB — Sirf Company
export const createJob = async (req, res) => {
  try {
    const { title, description, salary, location, category, skills, jobType } = req.body

    if (!title || !description || !location || !category) {
      return res.status(400).json({
        success: false,
        message: 'Sab zaroori fields do!'
      })
    }

    const job = await Job.create({
      title,
      description,
      salary,
      location,
      category,
      skills,
      jobType,
      company: req.user._id  // Login company ki ID
    })

    res.status(201).json({
      success: true,
      message: 'Job post ho gayi!',
      data: job
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET ALL APPROVED JOBS — Sab dekh sakte hain
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'approved' })
      .populate('company', 'name email company')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET SINGLE JOB
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name email company')

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job nahi mili!'
      })
    }

    res.json({ success: true, data: job })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET COMPANY JOBS — Sirf apni jobs
export const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user._id })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// UPDATE JOB — Sirf apni job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job nahi mili!'
      })
    }

    // Sirf apni job update karo
    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Sirf apni job update karo!'
      })
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json({
      success: true,
      message: 'Job update ho gayi!',
      data: updatedJob
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job nahi mili!'
      })
    }

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Sirf apni job delete karo!'
      })
    }

    await Job.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Job delete ho gayi!'
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ADMIN — Approve/Reject Job
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json({
      success: true,
      message: `Job ${status} ho gayi!`,
      data: job
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ADMIN — Get All Jobs
export const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name email company')
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}