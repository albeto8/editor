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

export const UPDATE_DOCUMENT = gql`
mutation changeDocumentContent($id: Int! $contentData: String!) {
  changeDocumentContent(id: $id contentData: $contentData) {
    id
    contentData
  }
}
`
