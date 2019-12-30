import React, {useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {getPosts} from '../../../actions/post';
import {loadUser} from '../../../actions/auth';
import Spinner from '../../../components/layout/Spinner/Spinner';

const Posts = ({loadUser, getPosts, post: {loading, posts}}) => {
    useEffect(() => {
        loadUser(); 
        getPosts(); 
    }, [getPosts, loadUser]); 

    return loading || !posts ? <Spinner /> : (
        <div className="h-center top-space bottom-space">
            <div className="w-60">
                <p className="f1 fw7 text-primary mv0">
                    Posts
                </p>
                <p className="f3 fw4">
                    <i class="fas fa-globe-americas"></i>
                    {' '}Chat with the CodeCircle community!
                </p>
                {/* <PostForm /> */}
                <div>
                    {
                        posts.length > 0 ? (
                            posts.map(post => (
                                // <PostItem key={post._id} post={post} />
                                <div></div>
                            ))
                        ) : (
                            <p className="f4 fw4">
                                No posts yet, want to make the first post? 
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
    posts: PropTypes.array.isRequired, 
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    post: state.post
}); 

export default connect(mapStateToProps, {getPosts, loadUser})(Posts); 
