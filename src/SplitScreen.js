import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import Editor from './components/Editor';
import DocumentsList from './components/DocumentsList';

const containerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}

const itemStyle = {
  width: '33vh',
  backgroundColor: 'red'
}

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
      <div containerStyle={containerStyle}>
        <div>
          <DocumentsList />
        </div>
        <div style={itemStyle}>
          <Editor value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
        </div>
        <div style={itemStyle}>
          <ReactMarkdown source={this.state.markdownSrc} />
        </div>
      </div>
    );
  }
}

export default SplitScreen;
