import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <SplitPane split="vertical" defaultSize="50%">
        <div className="editor-pane">
        </div>
        <div className="view-pane">
        </div>
      </SplitPane>
    </div>
    );
  }
}

export default App;
