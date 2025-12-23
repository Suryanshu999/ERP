import mongoose from 'mongoose'

const LeaveSchema = new mongoose.Schema({
  employeeName: String,
  employeeEmail: String,
  fromDate: Date,
  toDate: Date,
  days: Number,
  reason: String,
  type: String,
  status: { type: String, default: 'pending' },
  monthlyQuota: Number,
  leavesTakenThisMonth: Number,
}, { timestamps: true })

export default mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', LeaveSchema)
