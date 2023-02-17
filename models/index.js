// user model
const User = require('./User');
// post model
const Post = require('./Post');
// comment model
const Comment = require('./Comment');

// user post relationship
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// post user relationship
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// comment user relationship
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks:true
});

// comment post relationship
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks: true
});

// user comment relationship
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks:true
});

// post comment relationship
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks:true
})

// export modules
module.exports = { User, Post, Comment };
