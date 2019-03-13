import mongoose, { Schema } from 'mongoose'

const marketSchema = new Schema({
  name: {
    type: String
  },
  categoryId: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
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
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
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
