import gql from 'graphql-tag';

export const REMOVE_DOCUMENT = gql`
  mutation removeDocument($id: Int!) {
    removeDocument(id: $id) {
      id
      contentData
    }
  }
`;

export const GET_DOCUMENTS = gql`
  {
    documents {
      id
      contentData
    }
  }
`

export const ADD_DOCUMENT = gql`
mutation addDocument($contentData: String!) {
  addDocument(contentData: $contentData) {
    id
    contentData
  }
}
`
