import mongoose from 'mongoose'

const LoginActivitySchema = new mongoose.Schema({
  email: String,
  success: Boolean,
  ip: String,
  userAgent: String,
  reason: String,
}, { timestamps: true })

export default mongoose.models.LoginActivity || mongoose.model('LoginActivity', LoginActivitySchema)
