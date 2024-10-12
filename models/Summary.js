import mongoose from 'mongoose'

const summarySchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    status: { type: String, required: true },
    summary: { type: String, required: false },
    errorMessage: { type: String, required: false }
  },
  { versionKey: false, timestamps: true }
)

summarySchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    return ret
  }
})

export default mongoose.model('Summary', summarySchema)
