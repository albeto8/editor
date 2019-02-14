import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const DocumentsList = ({ onItemPress }) => (
  <Query
    query={gql`
      {
        documents {
          id
          contentData
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.documents.map((item) => (
        <div key={item.id} style={containerStyle}>
          <p>Document {item.id}: {item.contentData}</p>
          <button onClick={() => onItemPress(item)}>Select item</button>
        </div>
      ));
    }}
  </Query>
);

export default DocumentsList;
