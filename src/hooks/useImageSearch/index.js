import React from 'react';

const useImageSearch = () => {
    
  const handleSubmit = async (query, token, page) => {
          const result = await fetch(`${process.env.REACT_APP_IMAGE_SEARCH_ENDPOINT}/search`, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  query,
                  token,
                  page: (page ? page : undefined)
              })
          }).then(res => res.json()).catch(err => {
              throw err
          })
          return result
  }
  const getPhoto = async (imageID, token) => {
    const result = await fetch(`${process.env.REACT_APP_IMAGE_SEARCH_ENDPOINT}/get_image`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageID,
            token
        })
    }).then(res => res.json()).catch(err => {
        throw err
    })
    return result
}
  return {
    handleSubmit,
    getPhoto
  }
}

export default useImageSearch;