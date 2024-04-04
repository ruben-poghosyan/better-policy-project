import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from '@apollo/client';
const getDecription = gql`
query {
    about {
      data {
        attributes {
          description
        }
      }
    }
  }
`;
const About = () => {
    const { loading, error, data } = useQuery(getDecription);
    if (loading) return (<p>Loading ...</p>)
    if (error) return (<p>Error :(</p>)
    return (<div style={{display:"flex", justifyContent:"center"}}>
    <div className="shadow p-3 mb-5 bg-white rounded text-left" style={{maxWidth:"80dvw", minHeight:"100dvh"}}>
      <ReactMarkdown>{data.about.data.attributes.description}</ReactMarkdown></div>
    </div>)
}

export default About