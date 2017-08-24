import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class PostForm extends Component {
  render() {
    const { categories } = this.props;
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Field name="author" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <Field name="body" component="textarea" type="text" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field name="category" component="select" type="text">
              <option key="" value="" disabled>Pick a category...</option>
              {categories && categories.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </Field>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

PostForm = reduxForm({
  form: 'post'
})(PostForm);

PostForm = connect(
  (state, ownProps) => {
    return {
      initialValues: state.posts.data[ownProps.postID]
    }
  }
)(PostForm);

export default PostForm;