import React from "react";
import RepeaterSystem from "../components/repeater";
import { useQuery, gql } from '@apollo/client';
import {Pagination } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
const getStudents = gql`
query students($id: Int!){
  students (pagination: { page: $id, pageSize: 3 }) {
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
    data {
      id
      attributes {
        Name,
        title,
        level
        pfp {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}

`
const Students = () => {
    const navigate = useNavigate();
    let {id} = useParams() 
    id = parseInt(id)
    if (! (id > 0) ){
      id = 0
    }

    const { loading, error, data } = useQuery(getStudents, {
      variables: {id}
    });
    if (loading) return (<p>Loading ...</p>)
    if (error) return (<p>Error :(</p>)
    const currentPage = data.students.meta.pagination.page
    const totalPage = data.students.meta.pagination.pageCount
    const currentStudentsData = data.students.data
    let currentStudents = []
    let items = []
    for (let index = 1; index <= totalPage; index++) {
      items.push( <Pagination.Item key={index} onClick={() => navigate('/students/'+ index)}>{index}</Pagination.Item>)
    }
    currentStudentsData.forEach(element => {
      let obj = {}
      obj.name = element.attributes.Name
      obj.title = element.attributes.title
      obj.level = element.attributes.level
      if(element.attributes.pfp.data) {
        obj.url = "http://localhost:1337" + element.attributes.pfp.data.attributes.url
      }
      currentStudents.push(obj)
    });
    return (
      <>
       <Pagination className="justify-content-center">
        {items}
      </Pagination>
      <RepeaterSystem currentItems={currentStudents}></RepeaterSystem>
      </>
   
      );
}

export default Students