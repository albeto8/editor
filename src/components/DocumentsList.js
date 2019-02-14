import React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  REMOVE_DOCUMENT,
  GET_DOCUMENTS,
  ADD_DOCUMENT,
} from '../queries';
const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
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
              <p>Document {item.id}</p>
              <button onClick={() => onItemPress(item)}>Select item</button>
              <Mutation mutation={REMOVE_DOCUMENT}
                variables={{ id: item.id }}
                update={updateCache}
              >
                {(removeDocument, { data }) => (
                  <div>
                      <button onClick={() => removeDocument()} type="submit">
                        Delete document
                      </button>
                  </div>
                )}
              </Mutation>
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
              <button onClick={() => addDocument()} type="submit">
                Create new document
              </button>
          </div>
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <div>
        {this.renderCreateButton()}
        {this.renderDocumentsList()}
      </div>
    )
  }
}


export default DocumentsList;
