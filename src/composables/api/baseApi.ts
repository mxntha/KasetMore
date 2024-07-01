const baseUrl = 'http://localhost:5000/api/'

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
  try {
    const jwt = localStorage.getItem('login')
    console.log('POST Payload:', payload)
    const queryString = query != null ? new URLSearchParams(query) : null
    const path = baseUrl + url
    let option: RequestInit = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
    }
    if (payload == null) {
      delete option.body
    }
    return fetch(path + (queryString != null ? '?' + queryString : ''), option)
      .then((x) => x.json())
      .then((x) => x as T)
      .catch((x) => {
        console.log(x)
        throw x
      })
  } catch (ex) {
    console.log(ex)
    throw new Error()
  }
}
async function multpartFormData(
  url: string,
  files: File[],
  jsonData: any,
  keyMultipart: string = 'images',
  querryString: any | null = null
) {
  try {
    const formData = new FormData()
    // formData.append('product', jsonData)
    alert('เตรียมยิงเเล้วนะ')
    const queryString =
      querryString != null ? new URLSearchParams(querryString) : null
    alert('แปลงลิ้งเเปป')
    console.log(querryString)
    if (jsonData != undefined || jsonData != null) {
      for (const [key, value] of Object.entries(jsonData)) {
        formData.append(`${key}`, `${value}`)
      }
    }
    for (let i = 0; i < files.length; i++) {
      formData.append(keyMultipart, files[i])
    }
    console.log('พร้อมจะยิง', formData)
    return fetch(baseUrl + url + queryString, {
      method: 'POST',
      body: formData,
    })
      .then((x) => x.json())
      .then((x) => x)
      .catch((x) => {
        console.log(x)
        throw x
      })
  } catch (ex) {
    console.log(ex)
    throw new Error()
  }
}
export { baseUrl, getMethod, postMethod, multpartFormData }
