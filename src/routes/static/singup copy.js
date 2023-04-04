const form = document.forms[0]

form.addEventListener('submit', async event => {
    event.preventDefault()

    // console.log("form birthday: ", form.birthday.value)

    
    //     console.log("body: ", body)
    const response = await fetch(
        'https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/singup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: form.first_name.value ? form.first_name.value:null,
                    last_name: form.last_name.value ? form.last_name.value:null,
                    username: form.username.value ? form.username.value:null,
                    birthday: form.birthday.value ? form.birthday.value:null,
                    job: form.job.value ? form.job.value:null,
                    email: form.email.value,
                    phone: form.phone.value ? form.phone.value:null,
                    password: form.password.value
                })      
            }
    )


    result = await response.json()
    console.log("response status", response.status)
    console.log("result: ", result.detail)

    if (response.status === 201) {

        // const response_avatar = await fetch(
        //     'https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/users/avatar',
        //         {
        //             method: 'PATCH',
        //             headers: {
        //                 'Content-Type': 'multipart/for-data'
        //             },
        //             body: ({
        //                 file: form.avatar.value
        //             })      
        //         }
        // )

        // console.log("avatar: ", response_avatar)

        form.hidden = true
        detail.innerHTML = result.detail
        buttons.hidden = false
    }
    else {
        form.hidden = true
        buttons.hidden = false
        msg = ""
        for (res of result.detail) {
            msg = msg + res.loc[1] + "-error: " + res.msg + "\n"
        }
        detail.innerHTML = msg
    }

})


