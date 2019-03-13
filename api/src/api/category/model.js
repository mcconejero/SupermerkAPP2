import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String
  },
  message: {
    type: String
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

categorySchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      name: this.name,
      message: this.message,
      product: this.product,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      
    } : view
  }
}

const model = mongoose.model('Category', categorySchema)

export const schema = model.schema
export default model
