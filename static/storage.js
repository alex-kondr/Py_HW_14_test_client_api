temp_access_token = localStorage.getItem("access_token")

console.log(temp_access_token)

const response = fetch('http://localhost:8000/contacts/test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    access_token: temp_access_token,
  })
})
