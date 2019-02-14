import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import './App.css';
import Editor from './components/Editor';

class SplitScreen extends Component {

  state = {
    markdownSrc: "# Hello World"
  }

  componentDidMount() {

  }

  onMarkdownChange = (md) => {
    this.setState({ markdownSrc: md });
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
          </div>
          <div className="view-pane">
          <ReactMarkdown className="result" source={this.state.markdownSrc} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default SplitScreen;
