import React from 'react';

const useImageSearch = () => {
    
  const handleSubmit = async (query, token) => {
          const result = await fetch(`${process.env.REACT_APP_IMAGE_SEARCH_ENDPOINT}/search`, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  query,
                  token
              })
          }).then(res => res.json()).catch(err => {
              throw err
          })
          return result
  }
  return {
    handleSubmit
  }
}

export default useImageSearch;