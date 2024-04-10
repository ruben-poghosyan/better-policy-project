import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Loading from '../components/centeredspinner';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
const getStudentbyId = gql`
query getStudentbyId ($id: ID!){
    student(id: $id) {
      data {
        id
        attributes {
          Name
          title
          bio
          pfp {
            data {
              attributes {
                url
              }
            }
          }
          level
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
    const studentTitle = data.student.data.attributes.title
    const studentBio = data.student.data.attributes.bio
    const studentLevel = data.student.data.attributes.level
    const studentName = data.student.data.attributes.Name
    const pfp = process.env.REACT_APP_CMS_URI + data.student.data.attributes.pfp.data.attributes.url
    return (
      <Container>
        <Row>
          <Col lg={4}>
            {/* Profile Photo */}
            <Image className='shadow' style={{padding:"15px 15px 15px 15px"}} src={pfp} alt="Profile Photo" fluid />
          </Col>
          <Col lg={8} className="mt-4 mt-lg-0">
            {/* Biography */}
            <h2>{studentName}</h2>
            <h5>{studentTitle}</h5>
            <h6>Level {studentLevel}</h6>
            <ReactMarkdown>{studentBio}</ReactMarkdown>
          </Col>
        </Row>
      </Container>
    );
}

export default Student;