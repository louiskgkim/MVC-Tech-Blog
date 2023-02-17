const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: "This is so cool!"
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Wow, amazing work! I didn't know this much about partials."
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: "So that is what cookies are meant for!"
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: "Cookies sound good..."
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: "This is amazing! Thank you!"
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "Keep up the good work!"
  }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;