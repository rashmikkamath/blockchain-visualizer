export default function getApiData(url) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  return fetch(proxyUrl + url, {
      method: 'GET',
      mode: 'cors',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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