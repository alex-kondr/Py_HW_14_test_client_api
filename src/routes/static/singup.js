const form = document.forms[0]

form.addEventListener('submit', async event => {
    event.preventDefault()

    console.log("form birthday: ", form.birthday.value)

    
    //     console.log("body: ", body)
    const response = await fetch(
        'https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/singup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                username: form.username.value,
                birthday: form.birthday.value,
                job: form.job.value,
                email: form.email.value,
                phone: form.phone.value,
                password: form.password.value
            })      
        }
    )


    result = await response.json()
    console.log("response status", response.status)
    console.log("result: ", result.detail)

    // if (response.status === 201) {
    form.hidden = true
    k = result.detail
    results = []
    for (res of k) {
        results.push(res.msg)
    }
    detail.innerHTML = results
    buttons.hidden = false

    // console.log("result: ", results)
//     }
//   else if (response.status === 401) {
//     message.innerHTML = result.detail
//     message.hidden = false
//   }

})


