import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
  message: String,
  status: { type: String, default: 'open' },
}, { timestamps: true })

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema)
