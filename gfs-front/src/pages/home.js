import React from 'react';
import CustomCarousel from '../components/carousel.js';
import { useQuery, gql } from '@apollo/client';
import Loading from '../components/centeredspinner.js';
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
  if (loading) return (<Loading/>)
  if (error) return (<p>Error :(</p>)
  const featuredContent = data.featuredContents.data
  return (<>
  <CustomCarousel elementsArray={featuredContent}></CustomCarousel>
  </>
  )
}

export default Home