const baseUrl = 'http://localhost:5000/'

async function getMethod<T>(url: string): Promise<T> {
  console.log('get')
  const jwt = localStorage.getItem('login')
  return fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((x) => x.json())
    .then((x) => x as T)
    .catch((x) => {
      console.log(x)
      throw x
    })
}
function postMethod<T>(url: string, ...payload: any): Promise<T> {
  const jwt = localStorage.getItem('login')
  console.log(payload)
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  })
    .then((x) => x.json())
    .then((x) => x as T)
    .catch((x) => {
      console.log(x)
      throw x
    })
}
export { baseUrl, getMethod, postMethod }
