const refresh = async () => {

  access_token = storage_access_token.title
  refresh_token = storage_refresh_token.title

  if (access_token) {
    localStorage.setItem("access_token", access_token)
  }
  else {
    access_token = localStorage.getItem("access_token")
    console.log("access_token: ", access_token)
  }

  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token)
  }
  else {
    refresh_token = localStorage.getItem("refresh_token")
    console.log("refresh_token: ", refresh_token)
  }

  var options = JSON.stringify({
    "access_token": access_token,
    "refresh_token": refresh_token
  })

  if (stat_code.title == 401) {
    console.log("try get origin")

    const response = await fetch("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    console.log("response.status: ", response.status)

    if (response.status === 200) {
      console.log("reload")
      window.location = `http://localhost:8000/contacts?options=${options}`
    }
    else if ((response.status === 401)) {
      console.log("try get refresh token")
      const response = await fetch("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/auth/refresh_token", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        }
      })

      console.log("response.status: ", response.status)
      
      if (response.status === 200) {
        result = await response.json()

        access_token = result.access_token
        refresh_token = result.refresh_token

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        console.log(" get refresh_token succesfull")

        var options = JSON.stringify({
          "access_token": access_token,
          "refresh_token": refresh_token
        })

        window.location = `http://localhost:8000/contacts?options=${options}`
      }
    }
  }
}

refresh()

// console.log("storage_access_token: ", access_token)
// console.log("stat_code: ", stat_code.title)
// console.log("storage_refresh_token: ", refresh_token)

