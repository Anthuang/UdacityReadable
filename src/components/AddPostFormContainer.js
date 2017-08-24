import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import { fetchCategories, sendPost } from '../actions';
import PostForm from './PostForm';

class AddPostFormContainer extends Component {
  componentDidMount() {
    const { categories } = this.props;
    const { fetchCategories } = this.props;
    
    categories || fetchCategories();
  }

  submit(values) {
    const ret = {
      ...values,
      id: cuid(),
      timestamp: Date.now()
    }

    this.props.sendPost({ post: ret, method: 'POST' });
    this.props.history.push('/');
  }
  
  render() {
    const { categories } = this.props;

    return (
      <div>
        <PostForm onSubmit={data => this.submit(data)} categories={categories} />
        <Link to={ '/' }><button>Back</button></Link>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    sendPost: data => dispatch(sendPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostFormContainer);