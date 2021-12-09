import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
type Link {
    id : string
    usename : string
    email : string
    password : string
    reminders : [string]
    role : string
    
type Query {
    links : [links]!
}



}
`