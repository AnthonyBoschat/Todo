import { gql } from "@apollo/client"

const graphQLQuery = {
    GET_MESSAGE:gql`
    query GetMessage {
        message
    }`
}

export default graphQLQuery