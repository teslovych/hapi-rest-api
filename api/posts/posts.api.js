const Post = require('../../models/post.model');

const postsPlugin = {
    name: 'posts-api',
    register
}

async function register(server, options) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/posts',
            handler: (req, h) => {
                return Post.find();
            }
        }, {
            method: 'POST',
            path: '/api/v1/posts',
            handler: (req, h) => {
                const {title, tags, content} = req.payload;
                const post = new Post({
                    title,
                    tags,
                    content
                });
                return post.save();
            }
        }, {
            method: 'GET',
            path: '/api/v1/posts/{post}',
            handler: (req, h) => {
                const postId = req.params.post;
                return Post.findById(postId);
            }
        }, {
            method: 'DELETE',
            path: '/api/v1/posts/{post}',
            handler: (req, h) => {
                const _id = req.params.post;
                return Post.deleteOne({_id});
            }
        }
    ]);
}

module.exports = postsPlugin;