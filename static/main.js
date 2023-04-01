const form = document.forms[0]

// console.log(form)

form.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch(
    'https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: form.username.value,
        password: form.password.value
      })
    }
  )
//   console.log(response)
  console.log("response status", response.status, response.statusText)

    if (response.status === 200) {
        console.log("login succesfull")

        result = await response.json()

        access_token = result.access_token
        refresh_token = result.refresh_token

        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)

        get_contacts(access_token, refresh_token)
        // blabla()
    // window.location = '../templates/listContacts.html'
  }
})


const get_contacts = async (access_token, refresh_token) => {

    console.log("try get contacts")

    const response = await fetch(
        'https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    if (response.status === 200) {
        console.log("response status contacts", response.status, response.statusText)
        
        contacts = await response.json()

        // console.log(contacts)

        // for (contact in contacts) {
        
        //     console.log(contact)
        // }
        // console.log("json: ", JSON.stringify(contacts))

        const response_temp = await fetch(
            "http://localhost:8000/contacts",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contacts)
            })
        
        
        console.log("response_temp", response_temp.json())
        // window.location = response_temp.body
    }
}


// const blabla = () => {

// }