import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const DocumentsList = () => (
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

      return data.documents.map(({ contentData, id }) => (
        <div key={id}>
          <p>Document {id}: {contentData}</p>
        </div>
      ));
    }}
  </Query>
);

export default DocumentsList;
