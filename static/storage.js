access_token1 = "123" //storage_access_token.title
console.log("storage_access_token: ", access_token1)
console.log("message: ", message.innerText)
console.log("stat_code: ", stat_code.title)

if (access_token1) {
  localStorage.setItem("access_token", access_token1)
}

access_token = localStorage.getItem("access_token")
console.log("access_token: ", access_token)

// if (access_token) {

// fetch(`http://localhost:8000/contacts?options=${access_token}`, {
//   method: 'GET',  
// })
if (stat_code.title == 401) {
  console.log("reload")
  window.location = `http://localhost:8000/contacts?options=${access_token}`

}

// console.log(response)
// }

// console.log(temp_access_token)

// const response =
