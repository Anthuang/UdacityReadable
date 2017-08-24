import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, fetchComments, sendPostVote, sendCommentVote, sendDeletePost, sendDeleteComment } from '../actions';
import { selectCommentsAsArray } from '../reducers';
import { sortBy, dateFromPost } from '../utils';
import AddCommentFormContainer from './AddCommentFormContainer';

class PostDetail extends Component {
  componentDidMount() {
    const { fetchPost, fetchComments } = this.props;
    this.postID = this.props.match.params.postID;

    fetchPost(this.postID);
    fetchComments(this.postID);
  }

  deletePost() {
    this.props.sendDeletePost(this.postID);
    this.props.history.push('/');
  }
  
  render() {
    const { post, comments, status } = this.props;
    const { sendPostVote, sendCommentVote, sendDeleteComment } = this.props;

    return (
      <div>
        {status === 'Done' ? (
          <div>
            {!post || post.deleted ? (
              <h2>Post does not exist or was deleted</h2>
            ) : (
              <div>
                <div>
                  <h1>{post.title}</h1>
                  <h2>Author: {post.author}</h2>
                  <h4>Timestamp: {dateFromPost(post).toString()}</h4>
                  <h4>
                    <button onClick={e => sendPostVote({ id: post.id, vote: 'upVote' })}>Up</button>
                    <button onClick={e => sendPostVote({ id: post.id, vote: 'downVote' })}>Down</button>
                    Vote Score: {post.voteScore}
                  </h4>
                  <h3>Body: {post.body}</h3>
                  <hr/>
                  <h2>Comments</h2>
                  {comments.map((comment, idx) => (
                    <div key={idx}>
                      <h4>
                        <Link to={'/editcomment/' + comment.id}><button>Edit</button></Link>
                        <button onClick={() => sendDeleteComment(comment.id)}>Delete</button>
                        {comment.body} --- {comment.author}
                      </h4>
                      <h5>
                        <button onClick={e => sendCommentVote({ id: comment.id, vote: 'upVote' })}>Up</button>
                        <button onClick={e => sendCommentVote({ id: comment.id, vote: 'downVote' })}>Down</button>
                        Vote Score: {comment.voteScore}
                      </h5>
                    </div>
                  ))}
                  <hr/>
                  <AddCommentFormContainer postID={this.postID} />
                  <hr/>
                  <Link to={'/editpost/' + post.id}><button>Edit Post</button></Link>
                  <button onClick={() => this.deletePost()}>Delete Post</button>
                  <Link to='/'><button>Back</button></Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { posts } = state;

  return {
    post: posts.data[ownProps.match.params.postID],
    status: posts.status,
    comments: sortBy(selectCommentsAsArray(state), 'timestamp')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: data => dispatch(fetchPost(data)),
    fetchComments: data => dispatch(fetchComments(data)),
    sendPostVote: data => dispatch(sendPostVote(data)),
    sendCommentVote: data => dispatch(sendCommentVote(data)),
    sendDeletePost: data => dispatch(sendDeletePost(data)),
    sendDeleteComment: data => dispatch(sendDeleteComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);