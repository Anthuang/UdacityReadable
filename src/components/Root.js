import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, sortPosts, sendPostVote } from '../actions';
import { selectPostsAsArray } from '../reducers';
import { sortBy } from '../utils';

class Root extends Component {
  componentDidMount() {
    const { fetchCategories, fetchPosts, sortPosts } = this.props;

    fetchCategories();
    fetchPosts();
    sortPosts('voteScore');
  }
  
  render() {
    const { categories, posts } = this.props;
    const { fetchPosts, sortPosts, sendPostVote } = this.props;
    
    return (
      <div>
        <h1>Categories</h1>
        {this.props.category && <button onClick={ e => fetchPosts() }>Reset</button>}
        <ul>
          {categories.map((category, idx) => (
            <li key={ idx }><button value={ category.name } onClick={ e => fetchPosts(e.target.value) }>{ category.name }</button></li>
          ))}
        </ul>
        <hr/>
        <h1>Posts</h1>
        <Link to='/newpost'><button>New Post</button></Link>
        <select onChange={ e => sortPosts(e.target.value) }>
          <option value="" disabled>Order by...</option>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Timestamp</option>
        </select>
        <ol>
          {posts.map((post, idx) => (
            <div key={ idx }>
              <Link to={ '/posts/' + post.id }><h2>{ post.title }</h2></Link>
              <h3>Timestamp: { post.timestamp }</h3>
              <h3>
                <button onClick={ e => sendPostVote({ id: post.id, vote: 'upVote' }) }>Up</button>
                <button onClick={ e => sendPostVote({ id: post.id, vote: 'downVote' }) }>Down</button>
                Vote Score: { post.voteScore }
              </h3>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, posts } = state;

  return {
    categories: categories.data,
    category: posts.category,
    posts: sortBy(selectPostsAsArray(state), posts.sortBy)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPosts: data => dispatch(fetchPosts(data)),
    sortPosts: data => dispatch(sortPosts(data)),
    sendPostVote: data => dispatch(sendPostVote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);