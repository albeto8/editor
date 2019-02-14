import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import {
  UPDATE_DOCUMENT
} from './queries';
import Editor from './components/Editor';
import DocumentsList from './components/DocumentsList';

const containerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start'
}

const itemStyle = {
  flex: 2,
}

const docListContainer = {
  flex: 1,
  margin: 10
}

const codeContainer = {
  width: '500px'
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

  renderUpdateButton() {
    const { markdownSrc, selectedDocument } = this.state;
    if (selectedDocument !== null) {
      return (
        <Mutation mutation={UPDATE_DOCUMENT}
          variables={{ contentData: markdownSrc, id: selectedDocument.id }}
        >
          {(changeDocument, { data }) => (
            <div>
                <Button
                  onClick={() => changeDocument()}
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
            </div>
          )}
        </Mutation>
      )
    }
  }

  render() {
    return (
      <div style={containerStyle}>
        <div style={docListContainer}>
          <DocumentsList onItemPress={(item) => this.onItemPress(item)} />
        </div>
        <div style={codeContainer}>
          <Editor value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
          {this.renderUpdateButton()}
        </div>
        <div style={itemStyle}>
          <ReactMarkdown source={this.state.markdownSrc} />
        </div>
      </div>
    );
  }
}

export default SplitScreen;
