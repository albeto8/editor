import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Editor from './components/Editor';
import DocumentsList from './components/DocumentsList';

const containerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start'
}

const itemStyle = {
  flex: 1,
}

class SplitScreen extends Component {

  state = {
    markdownSrc: '',
    selectedDocument: null
  }

  componentDidMount() {

  }

  onMarkdownChange = (md) => {
    this.setState({ markdownSrc: md });
  }

  onItemPress = (item) => {
    this.setState({ selectedDocument: item, markdownSrc: item.contentData });
    console.log(item);
  }

  render() {
    return (
      <div style={containerStyle}>
        <div style={itemStyle}>
          <DocumentsList onItemPress={(item) => this.onItemPress(item)} />
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
