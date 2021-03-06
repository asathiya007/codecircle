import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {getPosts} from '../../../actions/post';
import {loadUser} from '../../../actions/auth';
import Spinner from '../../../components/layout/Spinner/Spinner';
import PostForm from '../PostForm/PostForm';
import PostItem from '../PostItem/PostItem';

const Posts = ({loadUser, getPosts, post}) => { 
    useEffect(() => {
        loadUser();
        getPosts();
    }, [getPosts, loadUser]); 

    return post.loading || !post.posts ? <Spinner /> : (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    CodeWorld
                </p>
                <p className="f3 fw4">
                    <i className="fas fa-globe-americas"></i>
                    {' '}Check out what the CodeCircle community is up to!
                </p>
                <PostForm/>
                <hr/>
                <div>
                    {
                        post.posts.length > 0 ? (
                            post.posts.map(post => (
                                <PostItem key={post._id} post={post} />
                            ))
                        ) : (
                            <p className="f4 fw4">
                                No posts yet, care to make the first post? 
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired, 
    loadUser: PropTypes.func.isRequired, 
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
}); 

export default connect(mapStateToProps, {getPosts, loadUser})(Posts); 
