import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPost, sendPost } from '../actions';
import PostForm from './PostForm';

class PostFormContainer extends Component {
  componentDidMount() {
    const { categories } = this.props;
    const { fetchCategories, fetchPost } = this.props;
    this.postID = this.props.match.params.postID;
    
    categories || fetchCategories();

    this.postID && fetchPost(this.props.match.params.postID);
  }

  submit(values) {
    const timestamp = Date.now();
    const ret = {
      ...values,
      id: this.postID ? this.postID : Date.now(),
      timestamp
    }

    this.props.sendPost({ post: ret, method: this.postID ? 'PUT' : 'POST'});

    this.props.history.push('/');
  }
  
  render() {
    const { categories, status } = this.props;

    return (
      <div>
        {status === 'Done' ? <PostForm onSubmit={ this.submit.bind(this) } categories={ categories } />
        : <h2>Loading...</h2> }
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories.data,
    status: posts.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPost: data => dispatch(fetchPost(data)),
    sendPost: data => dispatch(sendPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormContainer);