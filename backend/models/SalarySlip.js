import mongoose from 'mongoose'

const SalarySlipSchema = new mongoose.Schema({
  employeeName: String,
  empId: String,
  email: String,
  designation: String,
  month: String,
  year: String,
  basic: Number,
  hra: Number,
  allowances: Number,
  pf: Number,
  tax: Number,
  otherDeductions: Number,
  totalEarnings: Number,
  totalDeductions: Number,
  netPay: Number,
  pdfPath: String,
}, { timestamps: true })

export default mongoose.models.SalarySlip || mongoose.model('SalarySlip', SalarySlipSchema)
