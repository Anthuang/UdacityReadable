import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { sendComment } from '../actions';
import CommentForm from './CommentForm';

class AddCommentFormContainer extends Component {
  componentDidMount() {
    this.postID = this.props.postID;
  }

  submit(values) {
    const ret = {
      ...values,
      id: cuid(),
      parentId: this.postID,
      timestamp: Date.now()
    }

    this.props.sendComment({ comment: ret, method: 'POST' });
  }
  
  render() {
    return (
      <div>
        <CommentForm onSubmit={data => this.submit(data)} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendComment: data => dispatch(sendComment(data))
  }
}

export default connect(
  state => ({}),
  mapDispatchToProps
)(AddCommentFormContainer);