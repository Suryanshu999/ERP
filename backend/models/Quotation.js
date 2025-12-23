import mongoose from 'mongoose'

const QuotationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
  message: String,
  status: { type: String, default: 'new' },
}, { timestamps: true })

export default mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema)
