const Post = require('./post')

const postByTitle = (title) => {
  return Post.findOne({ title }).exec();
}

const postsForAuthor = (authorId) => {
  return Post.find({author: authorId}).exec();
}

const fullPostById = (id) => {
  return Post.findOne({ _id: id }).populate('author').exec();
}

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}).select(fieldsToSelect).exec();  // https://mongoosejs.com/docs/api.html#query_Query-select
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    contentLength: {
      $gt: minContentLength,  // MongoDB (not Mongoose!!!) Query Operators https://docs.mongodb.com/manual/reference/operator/query/
      $lt: maxContentLength
    }
  }).exec()
}

const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate({ _id: postId }, { $push: { similarPosts: {$each: similarPosts} }}, {new: true, upsert: true}).exec();  //operator ($push) commands reference is in the mongoDB docs, not in mongoose.
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}
