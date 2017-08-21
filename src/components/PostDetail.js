import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, fetchComments, sendPostVote, sendCommentVote } from '../actions';
import { selectCommentsAsArray } from '../reducers';
import { sortBy } from '../utils';

class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
    this.props.fetchComments(this.props.match.params.postID);
  }
  
  render() {
    const { post, comments, status } = this.props;
    const { sendPostVote, sendCommentVote } = this.props;
    const date = new Date(post.timestamp);

    return (
      <div>
        {status === 'Done' ?
          <div>
            <h1>{ post.title }</h1>
            <h2>Author: { post.author }</h2>
            <h4>Timestamp: { date.toString() }</h4>
            <h4>
              <button onClick={ e => sendPostVote({ id: post.id, vote: 'upVote' }) }>Up</button>
              <button onClick={ e => sendPostVote({ id: post.id, vote: 'downVote' }) }>Down</button>
              Vote Score: { post.voteScore }
            </h4>
            <h3>Body: { post.body }</h3>
            <hr/>
            <h2>Comments</h2>
            {comments.map((comment, idx) => (
              <div key={ idx }>
                <h4>{ comment.body } --- { comment.author }</h4>
                <h5>
                  <button onClick={ e => sendCommentVote({ id: comment.id, vote: 'upVote' }) }>Up</button>
                  <button onClick={ e => sendCommentVote({ id: comment.id, vote: 'downVote' }) }>Down</button>
                  Vote Score: { comment.voteScore }
                </h5>
              </div>
            ))}
            <Link to={ '/newpost/' + post.id }><button>Edit</button></Link>
            <Link to='/'><button>Back</button></Link>
          </div>
        : <h2>Loading...</h2>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { posts, comments } = state;

  return {
    post: posts.activePost || {},
    status: posts.status,
    comments: sortBy(selectCommentsAsArray(state), 'timestamp')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: data => dispatch(fetchPost(data)),
    fetchComments: data => dispatch(fetchComments(data)),
    sendPostVote: data => dispatch(sendPostVote(data)),
    sendCommentVote: data => dispatch(sendCommentVote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)