import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class CommentForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="body">Body</label>
            <Field name="body" component="textarea" type="text" />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field name="author" component="input" type="text" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

CommentForm = reduxForm({
  form: 'post'
})(CommentForm);

CommentForm = connect(
  (state, ownProps) => {
    return {
      initialValues: state.comments.data[ownProps.commentID]
    }
  }
)(CommentForm);

export default CommentForm;