import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: function() {
            const localDate = new Date();
            const localOffset = localDate.getTimezoneOffset() * 60000; 
            return new Date(localDate.getTime() - localOffset);
        }
    },
    tags: [String],
    thumbnail: {
        data: Buffer,
        filename: String,
        contentType: String
    },
    summary: {
        type: String
    },
    accUsername: {
        type: String
    },
    updatedDate:{
        type: Date,
        default: function() {
            const localDate = new Date();
            const localOffset = localDate.getTimezoneOffset() * 60000;
            return new Date(localDate.getTime() - localOffset);
        }
    }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;