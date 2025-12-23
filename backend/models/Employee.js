import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  name: { type: String },
  empId: { type: String },
  email: { type: String, lowercase: true, trim: true, unique: false },
  password: { type: String },
  designation: { type: String },
  joinDate: { type: Date },
  status: { type: String, default: 'Active' },
}, { timestamps: true })

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)
