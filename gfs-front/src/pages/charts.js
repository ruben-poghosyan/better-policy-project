import React from 'react';
import Loading from '../components/centeredspinner';
import RepeaterSystem from "../components/repeater";
import { useQuery, gql } from '@apollo/client';
import {Pagination } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

const getCharts = gql`
query charts($id: Int!) {
  publicCharts (pagination: { page: $id, pageSize: 9 }) {
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
        Thumbnail {
          data {
            attributes {
              url
            }
          }
        }
        Title
      }
    }
  }
}`

const Charts = () => {
  const navigate = useNavigate();
  let {id} = useParams() 
  id = parseInt(id)
  if (! (id > 0)){
      id = 0
  }
  const { loading, error, data } = useQuery(getCharts, {
    variables: {id}
  });
  if (loading) return (<Loading/>)
  if (error) return (<p>Error :(</p>)
  const currentPage = data.publicCharts.meta.pagination.page
  const totalPage = data.publicCharts.meta.pagination.pageCount
  const currentChartsData = data.publicCharts.data
  let currentCharts = []
  let items = []
  for (let index = 1; index <= totalPage; index++) {
    items.push( <Pagination.Item active={index === currentPage} key={index} onClick={() => navigate('/charts/'+ index)}>{index}</Pagination.Item>)
  }
  currentChartsData.forEach(element => {
    let obj = {}
    obj.name = element.attributes.Title
    if(element.attributes.Thumbnail.data) {
      obj.url = process.env.REACT_APP_CMS_URI + element.attributes.Thumbnail.data.attributes.url
    }
    obj.clickHandler = () => {navigate('/chart/'+ element.id)}
    currentCharts.push(obj)
  });
  return (
    <>
     <Pagination className="justify-content-center">
      <Pagination.First disabled={currentPage===1} onClick={() => navigate('/students/'+ 1)} />
      <Pagination.Prev disabled={currentPage===1} onClick={() => navigate('/students/'+ (currentPage - 1))} />
      {items}
      <Pagination.Next disabled={currentPage===totalPage} onClick={() => navigate('/students/'+ (currentPage + 1))}/>
      <Pagination.Last disabled={currentPage===totalPage} onClick={() => navigate('/students/' + totalPage)} />
    </Pagination>
    <RepeaterSystem currentItems={currentCharts}></RepeaterSystem>
    </>
    );
}

export default Charts;