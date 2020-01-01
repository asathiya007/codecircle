const express = require('express');
const tokenauth = require('../../middleware/tokenauth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const File = require('../../models/File');

const router = express.Router(); 

// @route   GET /api/posts/
// @desc    get all posts from all users 
// @access  private 
router.get('/', tokenauth, async (req, res) => {
    try {
        // get all posts, latest first 
        const posts = await Post.find().sort('-date');
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to fetch all posts from all users'}
        ]}); 
    }
});

// @route   GET /api/posts/:id
// @desc    get post by id 
// @access  private 
router.get('/:id', tokenauth, async(req, res) => {
    try {
        // get post with the provided id
        const post = await Post.findById(req.params.id);

        // check if post does not exist  
        if (!post) {
            return res.status(400).json({errors: [
                {msg: 'Post with provided id not found'}
            ]}); 
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server error - unable to get post by id'}); 
    }
}); 

// @route   POST /api/posts
// @desc    make a post 
// @access  private 
router.post('/', tokenauth, async (req, res) => {
    try {
        // check if no text and no file data are present 
        if ((!req.body.text || req.body.text === '') && (!req.body.fileData || req.body.fileData === {})) {
            return res.status(400).json({errors: [
                'Please provide text or an image to make a post'
            ]}); 
        }

        // get user name and avatar, if the user exists 
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({errors: [
                {msg: 'User not found with provided id, cannot make post'}
            ]}); 
        }
        const {name, avatar} = user; 
    
        // create and send the post 
        const post = new Post({
            user: req.user.id,
            name,
            avatar, 
            text: req.body.text, 
            file: req.body.fileData
        }); 
        await post.save(); 
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to make post'}
        ]}); 
    }
}); 

// @route   DELETE api/posts/:id
// @desc    delete a post 
// @access  private 
router.delete('/:id', tokenauth, async (req, res) => {
    try {
        // get post by id, if it exists 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({errors: [
                {msg: 'Post to delete with provided id not found'}
            ]}); 
        }

        // check if user is authorized to delete post 
        if (req.user.id !== post.user.toString()) {
            return res.status(400).json({errors: [
                {msg: 'User not authorized, cannot delete post'}
            ]}); 
        }

        // remove the post's file, if it exists
        const file = await File.findById(post.file); 
        if (file) await file.remove(); 

        // remove the post itself 
        await post.remove(); 
        res.json({msg: 'Post deleted'}); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'server error'}
        ]}); 
    }
}); 

// @route   PUT api/posts/like/:id
// @desc    like a post 
// @access  private 
router.put('/like/:id', tokenauth, async (req, res) => {
    try {
        // find the post by id, if it exists 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({errors: [
                {msg: 'Post to like with provided id not found'}
            ]}); 
        }

        // obtain new likes 
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id); 

        // if the post has not been liked, like it, else unlike it
        if (post.likes.length === newLikes.length) {
            post.likes.unshift({user: req.user.id});
        } else {
            post.likes = newLikes; 
        }

        // unlove and unlaugh at the post 
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id); 
        post.loves = newLoves; 
        const newLaughs = post.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        post.laughs = newLaughs; 

        // save the post and return the new likes, loves and laughs
        await post.save(); 
        res.json({ likes: post.likes, loves: post.loves, laughs: post.laughs}); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to like post'}
        ]}); 
    }
}); 

// @route   PUT api/posts/love/:id
// @desc    love a post 
// @access  private 
router.put('/love/:id', tokenauth, async (req, res) => {
    try {
        // find the post by id, if it exists 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post to love with provided id not found' }
                ]
            });
        }

        // obtain new loves 
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id);

        // if the post has not been loved, like it, else unlove it
        if (post.loves.length === newLoves.length) {
            post.loves.unshift({ user: req.user.id });
        } else {
            post.loves = newLoves;
        }

        // unlike and unlaugh at the post 
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);
        post.likes = newLikes; 
        const newLaughs = post.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        post.laughs = newLaughs; 

        // save the post and return the new likes, loves and laughs
        await post.save();
        res.json({ likes: post.likes, loves: post.loves, laughs: post.laughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to love post' }
            ]
        });
    }
}); 

// @route   PUT api/posts/laugh/:id
// @desc    laugh at a post 
// @access  private 
router.put('/laugh/:id', tokenauth, async (req, res) => {
    try {
        // find the post by id, if it exists 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post to laugh at with provided id not found' }
                ]
            });
        }

        // obtain new laughs 
        const newLaughs = post.loves.filter(laugh => laugh.user.toString() !== req.user.id);

        // if the post has not been laughed at, laugh at it, else unlaugh at it
        if (post.laughs.length === newLaughs.length) {
            post.laughs.unshift({ user: req.user.id });
        } else {
            post.laughs = newLaughs;
        }

        // unlike and unlove the post 
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);
        post.likes = newLikes; 
        const newLoves = post.loves.filter(love => love.user.toString() !== req.user.id);
        post.loves = newLoves; 

        // save the post and return the new likes, loves and laughs
        await post.save();
        res.json({ likes: post.likes, loves: post.loves, laughs: post.laughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to love post' }
            ]
        });
    }
}); 

// @route   GET /api/posts/displayfile/:id
// @desc    get the mimetype and the buffer data for a file 
// @access  private 
router.get('/displayfile/:id', tokenauth, async (req, res) => {
    try {
        // get the file by id, if it exists 
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({errors: [
                {msg: 'File to display with provided id not found'}
            ]}); 
        }

        // send file mimetype and buffer data to client
        const {mimetype, data} = file; 
        res.json({ mimetype, data }); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to get file mimetype and buffer data'}
        ]}); 
    }
}); 

// @route   POST /api/posts/comment/:id
// @desc    comment on a post 
// @access  private 
router.post('/comment/:id', tokenauth, async (req, res) => {
    try {
        // get user and post by id, if they exist 
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({errors: [
                {msg: 'User with provided id not found, cannot comment on post'}
            ]}); 
        }
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post with provided id not found, cannot comment on post' }
                ]
            });
        }

        // create comment and add it to post 
        const comment = {
            user: req.user.id, 
            name: user.name, 
            avatar: user.avatar, 
            text: req.body.text,
            file: req.body.fileData
        }
        post.comments.unshift(comment);
        await post.save(); 
        res.json(post.comments); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to comment on post'}
        ]}); 
    }
}); 

// @route   DELETE /api/posts/comment/:id/:comment_id
// @desc    delete a comment on a post 
// @access  private 
router.delete('/comment/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment by id, if they exist 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post with provided id not found, cannot delete comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({errors: [
                {msg: 'Comment with provided id not found, cannot delete comment'}
            ]}); 
        }

        // check if user is authorized to delete comment 
        if (comment.user.toString() !== req.user.id) {
            return res.status(400).json({
                errors: [
                    { msg: 'User not authorized, cannot delete comment' }
                ]
            }); 
        }

        // remove comment's file, if it exists 
        const file = await File.findById(comment.file);
        if (file) {
            await file.remove(); 
        }

        // remove comment 
        const comments = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id);
        post.comments = comments; 
        await post.save(); 
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to delete comment'}
        ]}); 
    }
}); 

// @route   PUT api/posts/comment/like/:id/:comment_id
// @desc    like a comment of a post 
// @access  private 
router.put('/comment/like/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment by id, if they exist 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post with provided id not found, cannot like comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    { msg: 'Comment with provided id not found, cannot like comment' }
                ]
            });
        }
        
        // get filtered likes 
        const newLikes = comment.likes.filter(like => like.user.toString() !== req.user.id);

        // if the post has not been liked, like it, else unlike it
        if (comment.likes.length === newLikes.length) {
            comment.likes.unshift({ user: req.user.id });
        } else {
            comment.likes = newLikes;
        }

        // unlove and unlaugh at the post 
        const newLoves = comments.loves.filter(love => love.user.toString() !== req.user.id);
        const newLaughs = comments.laughs.filter(laugh => laugh.user.toString() !== req.user.id);

        // save the post and send new likes, loves, and laughs data to client
        await post.save();
        res.json({ likes: newLikes, loves: newLoves, laughs: newLaughs }); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [
            {msg: 'Server error - unable to like comment'}
        ]}); 
    }
}); 

// @route   PUT api/posts/comment/love/:id/:comment_id
// @desc    love a comment of a post 
// @access  private 
router.put('/comment/love/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment by id, if they exist 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post with provided id not found, cannot love comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    { msg: 'Comment with provided id not found, cannot love comment' }
                ]
            });
        }

        // get filtered loves 
        const newLoves = comment.loves.filter(love => love.user.toString() !== req.user.id);

        // if the post has not been loved, like it, else unlove it
        if (comment.loves.length === newLoves.length) {
            comment.loves.unshift({ user: req.user.id });
        } else {
            comment.loves = newLoves;
        }

        // unlike and unlaugh at the post 
        const newLikes = comments.likes.filter(like => like.user.toString() !== req.user.id);
        const newLaughs = comments.laughs.filter(laugh => laugh.user.toString() !== req.user.id);

        // save the post and send new likes, loves, and laughs data to client
        await post.save();
        res.json({ likes: newLikes, loves: newLoves, laughs: newLaughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to love comment' }
            ]
        });
    }
}); 

// @route   PUT api/posts/comment/laugh/:id/:comment_id
// @desc    laugh at a comment of a post 
// @access  private 
router.put('/comment/laugh/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment by id, if they exist 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post with provided id not found, cannot laugh at comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    { msg: 'Comment with provided id not found, cannot laugh at comment' }
                ]
            });
        }

        // get filtered laughs 
        const newLaughs = comment.laughs.filter(laugh => laugh.user.toString() !== req.user.id);

        // if the post has not been laughed at, laugh at it, else unlaugh at it
        if (comment.laughs.length === newLaughs.length) {
            comment.laughs.unshift({ user: req.user.id });
        } else {
            comment.laughs = newLaughs;
        }

        // unlike and unlove the post 
        const newLikes = comments.likes.filter(like => like.user.toString() !== req.user.id);
        const newLoves = comments.loves.filter(love => love.user.toString() !== req.user.id);

        // save the post and send new likes, loves, and laughs data to client
        await post.save();
        res.json({ likes: newLikes, loves: newLoves, laughs: newLaughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to laugh at comment' }
            ]
        });
    }
});

// @route   POST /api/posts/comment/:id
// @desc    comment on a post 
// @access  private 
router.post('/comment/:id', tokenauth, async (req, res) => {
    try {
        // find the user and post, if they exist 
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                errors: [
                    {msg: 'User data not found, cannot comment on post'}
                ]
            })
        }
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    {msg: 'Post to comment on not found, cannot comment on post'}
                ]
            })
        }

        // add comment to post, save post 
        const comment = {
            user: req.user.id, 
            name: user.name, 
            avatar: user.avatar, 
            text: req.body.text, 
            file: req.body.fileData
        }
        post.comments.unshift(comment);
        await post.save(); 

        // send post comments data to client 
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                {msg: 'Server error - unable to comment on post'}
            ]
        })
    }
}); 

// @route   DELETE /api/posts/comment/:id/:comment_id
// @desc    delete a comment on a post 
// @access  private 
router.delete('/comment/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // find post and comment to delete, if they exist 
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({
                errors: [
                    {msg: 'Post to delete not found, cannot delete comment'}
                ]
            }); 
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id); 
        if (!comment) {
            res.status(404).json({
                errors: [
                    {msg: 'Comment to delete not found, cannot delete comment'}
                ]
            }); 
        }

        // check if user is authorized to delete comment 
        if (comment.user.toString() !== req.user.id) {
            return res.status(400).json({
                errors: [
                    {msg: 'User not authorized, cannot delete comment'}
                ]
            }); 
        }

        // remove file associated with comment, if it exists 
        const file = await File.findById(comment.file);
        if (file) {
            await file.remove(); 
        }
        
        // remove comment itself 
        const comments = comments.filter(comment => comment._id.toString() !== req.params.comment_id);
        post.comments = comments; 
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                {msg: 'Server error - unable to delete comment'}
            ]
        }); 
    }
}); 

// @route   PUT /api/posts/comment/like/:id/:comment_id
// @desc    like a comment of a post 
// @access  private 
router.put('/comment/like/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment to comment on, if they exist
        const post = await Post.findById(req.params.id); 
        if (!post) {
            return res.status(404).json({
                errors: [
                    {msg: 'Post of comment to like not found, cannot like comment'}
                ]
            }); 
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    {msg: 'Comment to like not found, cannot like comment'}
                ]
            }); 
        }

        // get filtered likes 
        const newLikes = comment.likes.filter(like => like.user.toString() !== req.user.id);

        // if the post has not been liked, like it, else unlike it 
        if (comment.likes.length === newLikes.length) {
            comment.likes.unshift({user: req.user.id});
        } else {
            comment.likes = newLikes; 
        }

        // unlove and unlaugh at the comment 
        const newLoves = comment.loves.filter(love => love.user.toString() !== req.user.id);
        comment.loves = newLoves; 
        const newLaughs = comment.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        comment.laughs = newLaughs; 

        // save the post and send new likes, loves, and laughs data to client 
        await post.save();
        res.json({likes: comment.likes, loves: comment.loves, laughs: comment.laughs}); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                {msg: 'Server error - unable to like comment'}
            ]
        }); 
    }
}); 

// @route   PUT /api/posts/comment/love/:id/:comment_id
// @desc    love a comment of a post 
// @access  private 
router.put('/comment/love/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment to comment on, if they exist
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post of comment to love not found, cannot love comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    { msg: 'Comment to love not found, cannot love comment' }
                ]
            });
        }

        // get filtered loves 
        const newLoves = comment.loves.filter(love => love.user.toString() !== req.user.id);

        // if the post has not been loved, like it, else unlove it 
        if (comment.loves.length === newLoves.length) {
            comment.loves.unshift({ user: req.user.id });
        } else {
            comment.loves = newLoves;
        }

        // unlike and unlaugh at the comment 
        const newLikes = comment.likes.filter(like => like.user.toString() !== req.user.id);
        comment.likes = newLikes;
        const newLaughs = comment.laughs.filter(laugh => laugh.user.toString() !== req.user.id);
        comment.laughs = newLaughs;

        // save the post and send new likes, loves, and laughs data to client 
        await post.save();
        res.json({ likes: comment.likes, loves: comment.loves, laughs: comment.laughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to love comment' }
            ]
        });
    }
}); 

// @route   PUT /api/posts/comment/laugh/:id/:comment_id
// @desc    laugh at a comment of a post 
// @access  private 
router.put('/comment/laugh/:id/:comment_id', tokenauth, async (req, res) => {
    try {
        // get post and comment to comment on, if they exist
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                errors: [
                    { msg: 'Post of comment to laugh at not found, cannot laugh at comment' }
                ]
            });
        }
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({
                errors: [
                    { msg: 'Comment to laugh at not found, cannot laugh at comment' }
                ]
            });
        }

        // get filtered laughs
        const newLaughs = comment.laughs.filter(laughs => laughs.user.toString() !== req.user.id);

        // if the post has not been loved, like it, else unlove it 
        if (comment.laughs.length === newLaughs.length) {
            comment.laughs.unshift({ user: req.user.id });
        } else {
            comment.laughs = newLaughs;
        }

        // unlike and unlove the comment 
        const newLikes = comment.likes.filter(like => like.user.toString() !== req.user.id);
        comment.likes = newLikes;
        const newLoves = comment.loves.filter(love => love.user.toString() !== req.user.id);
        comment.loves = newLoves;

        // save the post and send new likes, loves, and laughs data to client 
        await post.save();
        res.json({ likes: comment.likes, loves: comment.loves, laughs: comment.laughs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            errors: [
                { msg: 'Server error - unable to laugh at comment' }
            ]
        });
    }
}); 

module.exports = router; 