const baseUrl = process.env.baseUrl || 'http://localhost:5000/api/'

async function getMethod<T>(url: string, query: any | null = null): Promise<T> {
  console.log('get', url)
  const jwt = localStorage.getItem('login')
  const queryString = query != null ? new URLSearchParams(query) : null
  const path = baseUrl + url
  return fetch(path + (queryString != null ? '?' + queryString : ''), {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((e) => {
      return e.json()
    })
    .then((x) => x as T)
    .catch((x) => {
      console.log(x)
      throw x
    })
}
async function postMethod<T>(
  url: string,
  payload: any | null = null,
  query: any | null = null
): Promise<T> {
  const jwt = localStorage.getItem('login')
  console.log('POST Payload:', payload)
  const queryString = query != null ? new URLSearchParams(query) : null
  const path = baseUrl + url
  let option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  }
  if (payload == null) {
    delete payload.body
  }
  return fetch(path + (queryString != null ? '?' + queryString : ''), option)
    .then((x) => x.json())
    .then((x) => x as T)
    .catch((x) => {
      console.log(x)
      throw x
    })
}
async function multpartFormData(url: string, files: File[], jsonData: any) {
  const formData = new FormData()
  // formData.append('product', jsonData)
  for (const [key, value] of Object.entries(jsonData)) {
    formData.append(`${key}`, `${value}`)
  }
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
