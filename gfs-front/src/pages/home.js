import React from 'react';
import CustomCarousel from '../components/carousel.js';
import { useQuery, gql } from '@apollo/client';
const getFeaturedContent= gql`{
  featuredContents {
    data {
      id,
      attributes {
        Title,
        Thumbnail,
        url
      }
    }
  }
}`
const Home = () => {
  const { loading, error, data } = useQuery(getFeaturedContent);
  if (loading) return (<p>Loading ...</p>)
  if (error) return (<p>Error :(</p>)
  return (<>
  <CustomCarousel elementsArray={data.featuredContents.data}></CustomCarousel>
  </>
  )
}

export default Home