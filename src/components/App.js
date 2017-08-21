import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Root from './Root';
import PostDetail from './PostDetail';
import PostFormContainer from './PostFormContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/newpost" component={ PostFormContainer }/>
        <Route path="/newpost/:postID" component={ PostFormContainer }/>
        <Route path="/posts/:postID" component={ PostDetail }/>
        <Route exact path="/" component={ Root }/>
      </div>
    );
  }
}

export default App