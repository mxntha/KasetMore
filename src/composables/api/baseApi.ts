const baseUrl = 'https://localhost:7275/'

async function getMethod<T>(url: string): Promise<T> {
  console.log('get', url)
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
async function postMethod<T>(url: string, ...payload: any): Promise<T> {
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
async function multpartFormData(url: string, files: File[], jsonData: any) {
  const formData = new FormData()
  formData.append('data', jsonData)
  for (let i = 0; i < files.length; i++) {
    formData.append(`images`, files[i])
  }

  fetch(baseUrl + url, {
    method: 'POST',
    body: formData,
  })
    .then((x) => x.json())
    .then((x) => x)
    .catch((x) => {
      console.log(x)
      throw x
    })
}
export { baseUrl, getMethod, postMethod, multpartFormData }
