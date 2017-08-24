import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchPost, sendPost } from '../actions';
import PostForm from './PostForm';

class PostFormContainer extends Component {
  componentDidMount() {
    const { categories } = this.props;
    const { fetchCategories, fetchPost } = this.props;
    this.postID = this.props.match.params.postID;
    
    categories || fetchCategories();

    fetchPost(this.props.match.params.postID);
  }

  submit(values) {
    const { post } = this.props;

    const ret = {
      ...values,
      id: post.id,
      timestamp: post.timestamp
    }

    this.props.sendPost({ post: ret, method: 'PUT' });

    this.props.history.push('/posts/' + this.postID);
  }
  
  render() {
    const { categories, status } = this.props;

    return (
      <div>
        {status === 'Done' ? <PostForm onSubmit={data => this.submit(data)} categories={categories} postID={this.postID} />
        : <h2>Loading...</h2> }
        <Link to={'/posts/' + this.postID}><button>Back</button></Link>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }, ownProps) {
  return {
    post: posts.data[ownProps.match.params.postID],
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