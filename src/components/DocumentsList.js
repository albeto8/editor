import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  REMOVE_DOCUMENT,
  GET_DOCUMENTS,
  ADD_DOCUMENT,
} from '../queries';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const updateCache = (cache, { data: { removeDocument }}) => {
  const { documents } = cache.readQuery({ query: GET_DOCUMENTS });
    cache.writeQuery({
      query: GET_DOCUMENTS,
      data: {
        documents: removeDocument
      }
    })
}

const updateAddCache = (cache, { data: { addDocument }}) => {
  const { documents } = cache.readQuery({ query: GET_DOCUMENTS });
    cache.writeQuery({
      query: GET_DOCUMENTS,
      data: {
        documents: documents.concat(addDocument)
      }
    })
}

class DocumentsList extends React.Component {

  renderDeleteButton(item) {
    return (
      <Mutation mutation={REMOVE_DOCUMENT}
        variables={{ id: item.id }}
        update={updateCache}
      >
        {(removeDocument, { data }) => (
          <div>
              <Button
                onClick={() => removeDocument()}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
          </div>
        )}
      </Mutation>
    )
  }

  renderDocumentsList() {
    const { onItemPress } = this.props
    return (
      <Query
        query={GET_DOCUMENTS}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.documents.map((item) => (
            <div key={item.id} style={containerStyle}>
              <ListItem
                button
                onClick={() => onItemPress(item)}
              >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                <ListItemText primary={`Document ${item.id}`} />
              </ListItem>
              {this.renderDeleteButton(item)}
            </div>
          ));
        }}
      </Query>
    )
  }

  renderCreateButton() {
    return (
      <Mutation mutation={ADD_DOCUMENT}
        variables={{ contentData: '# New document' }}
        update={updateAddCache}
      >
        {(addDocument, { data }) => (
          <div>
            <Button
              onClick={() => addDocument()}
              variant="contained"
              color="primary"
            >
              Create Document
            </Button>
          </div>
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <div>
        {this.renderCreateButton()}
        <List component="nav">
          {this.renderDocumentsList()}
        </List>
      </div>
    )
  }
}


export default DocumentsList;
