import mongoose, { Schema } from 'mongoose'

const marketSchema = new Schema({
  name: {
    type: String
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  latlong: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

marketSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      product: this.product,
      latlong: this.latlong,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Market', marketSchema)

export const schema = model.schema
export default model
