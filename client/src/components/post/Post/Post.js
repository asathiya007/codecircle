import React, {useEffect, Fragment} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {getPost} from '../../../actions/post';
import { loadUser } from '../../../actions/auth';
import Spinner from '../../layout/Spinner/Spinner';
import PostItem from '../../posts/PostItem/PostItem';
import CommentForm from '../CommentForm/CommentForm';
import CommentItem from '../CommentItem/CommentItem';

const Post = ({match, getPost, loadUser, post, greeting}) => {
    useEffect(() => {
        loadUser(); 
        getPost(match.params.id); 
    }, [getPost, loadUser, match.params.id]); 

    return (!post && post.loading) || !post.post ? <Spinner/> : (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Comments
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-comments"></i>
                    {' '}Leave your remarks on {post.post.name.trim().split(' ')[0]}'s post!
                </p>
                <PostItem post={post.post} showComment={false}/>
                <CommentForm post={post.post} greeting={greeting}/>
                <hr/>
                <Fragment>
                    {
                        post.post.comments.length > 0 ? (
                            post.post.comments.map(comment => 
                            <CommentItem key={comment._id} comment={comment} postId={post.post._id} />)
                        ) : (
                            <p className="f4 fw4">
                                No comment yet, care to make the first comment?
                            </p>
                        )
                    }
                </Fragment>
            </div>
        </div>
    ); 
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired, 
    post: PropTypes.object.isRequired, 
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost, loadUser})(Post); 
