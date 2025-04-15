import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
      },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
    },
    taglist:{
        type:[String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
)

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
export default Blog
