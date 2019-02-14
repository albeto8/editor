import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const REMOVE_DOCUMENT = gql`
  mutation removeDocument($id: Int!) {
    removeDocument(id: $id) {
      id
      contentData
    }
  }
`;

const GET_DOCUMENTS = gql`
  {
    documents {
      id
      contentData
    }
  }
`

const updateCache = (cache, { data: { removeDocument }}) => {
  const { documents } = cache.readQuery({ query: GET_DOCUMENTS });
  console.log(documents);
    cache.writeQuery({
      query: GET_DOCUMENTS,
      data: {
        documents: removeDocument
      }
    })
}

class DocumentsList extends React.Component {

  render() {
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
              <p>Document {item.id}: {item.contentData}</p>
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
}


export default DocumentsList;
