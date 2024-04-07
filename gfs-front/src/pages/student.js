import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Loading from '../components/centeredspinner';
const getStudentbyId = gql`
query getStudentbyId ($id: ID!) {
    student (id: $id) {
      data {
        id,
        attributes {
          title
          bio
          pfp {
            data {
              attributes {
                      formats
                url
              }
            }
          },
          level,
          
        }
      }
    }
  }
`
const Student = () => {
    let {id} = useParams() 
    id = parseInt(id)
    const { loading, error, data } = useQuery(getStudentbyId, {
        variables: {id}
      });
    if (loading) return (<Loading/>)
    if (error) return (<p>Error :(</p>)
    return (<>
    <div className='shadow' style={{padding:"25px 25px 25px 25px", marginLeft:"25px", marginRight:"25px", wordWrap: "break-word"}}>
    <p style={{}}>{JSON.stringify(data)}</p>
    </div>
    </>)
}

export default Student;