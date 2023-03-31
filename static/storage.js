storage_access_token = storage_access_token.title
console.log(storage_access_token)

if (storage_access_token) {
  localStorage.setItem("access_token", storage_access_token)
}

access_token = localStorage.getItem("access_token")
console.log(access_token)

if (access_token) {

  fetch('http://localhost:8000/contacts/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: access_token,
    })
  })


}

console.log(temp_access_token)

// const response =
