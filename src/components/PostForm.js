import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostForm extends Component {
  render() {
    const { categories } = this.props;
    const { handleSubmit } = this.props;
    
    return (
      <div>
        <form onSubmit={ handleSubmit }>
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
              {categories && categories.map(c => (
                <option key={ c.name } value={ c.name }>{ c.name }</option>
              ))}
            </Field>
          </div>
          <button type="submit">Submit</button>
        </form>
        <Link to='/'><button>Back</button></Link>
      </div>
    )
  }
}

PostForm = reduxForm({
  form: 'post'
})(PostForm)

PostForm = connect(
  state => {
    return {
      initialValues: state.posts.activePost
    }
  }
)(PostForm)

export default PostForm