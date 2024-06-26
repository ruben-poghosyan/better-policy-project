import React from 'react';
import Highcharts from 'highcharts';
import Loading from '../components/centeredspinner';
import HighchartsReact from 'highcharts-react-official';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
require("highcharts/modules/exporting.js")(Highcharts);
// TODO
const getChartbyId = gql`
query getChartbyId ($id : ID!){
    publicChart (id: $id) {
      data {
        id,
        attributes {
          chartOptions,
          description
        }
      }
    }
  }`

const Chart = () => {
    let {id} = useParams() 
    id = parseInt(id)
    const { loading, error, data } = useQuery(getChartbyId, {
        variables: {id}
      });
    if (loading) return (<Loading/>)
    if (error) return (<p>Error :(</p>)
    const options = JSON.parse(JSON.stringify(data.publicChart.data.attributes.chartOptions.options))
    return (
        <div className='shadow' style={{padding:"25px 25px 25px 25px", marginLeft:"25px", marginRight:"25px"}}>
     <HighchartsReact
      highcharts={Highcharts}
      options={options}/>
  </div>)
  }
  
  export default Chart;