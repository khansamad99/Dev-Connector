import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import {getPosts} from '../../actions/post';
import PostItem from './PostItem';
import {connect} from 'react-redux';

const Post = ({getPosts,post:{posts,loading}}) => {

    useEffect = (() => {
        getPosts();
    },[getPosts]);

    return (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'/>Welcome to the Community
            </p>
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPosts:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post:state.post
});

export default connect(mapStateToProps,{getPosts})(Post);
