import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComment, sendComment } from '../actions';
import CommentForm from './CommentForm';

class EditPostFormContainer extends Component {
  componentDidMount() {
    this.commentID = this.props.match.params.commentID;
    this.props.fetchComment(this.commentID);
  }

  submit(values) {
    const { comment, history } = this.props;
    const { sendComment } = this.props;
    
    const ret = {
      ...values,
      id: this.commentID,
      parentId: comment.parentId,
      timestamp: comment.timestamp
    }

    sendComment({ comment: ret, method: 'PUT' });

    history.push('/posts/' + comment.parentId);
  }
  
  render() {
    const { comment, status } = this.props;
    
    return (
      <div>
        {status === 'Done' ?
          <div>
            <CommentForm onSubmit={this.submit.bind(this)} commentID={this.commentID} />
            <Link to={'/posts/' + comment.parentId}><button>Back</button></Link>
          </div>
        : <h2>Loading...</h2>}
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  return {
    comment: comments.data[ownProps.match.params.commentID],
    status: comments.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendComment: data => dispatch(sendComment(data)),
    fetchComment: data => dispatch(fetchComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostFormContainer);