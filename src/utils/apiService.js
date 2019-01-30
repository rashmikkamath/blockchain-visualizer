export default function getApiData(url) {
  return fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          return result
        },
        (error) => {
          console.log(error)
        }
      )
}