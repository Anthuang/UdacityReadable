import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Root from './Root';
import PostDetail from './PostDetail';
import AddPostFormContainer from './AddPostFormContainer';
import EditPostFormContainer from './EditPostFormContainer';
import EditCommentFormContainer from './EditCommentFormContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/newpost" component={AddPostFormContainer} />
        <Route path="/editpost/:postID" component={EditPostFormContainer} />
        <Route path="/posts/:postID" component={PostDetail} />
        <Route path="/editcomment/:commentID" component={EditCommentFormContainer} />
        <Route exact path="/" component={Root} />
      </div>
    );
  }
}

export default App;