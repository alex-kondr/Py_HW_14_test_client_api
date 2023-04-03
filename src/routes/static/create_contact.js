const form = document.forms[0]
access_token = localStorage.getItem("access_token")

form.addEventListener('submit', async event => {
    event.preventDefault()

    // console.log("form birthday: ", form.birthday.value)

    
    //     console.log("body: ", body)
    const response = await fetch(
        'https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/contacts/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    first_name: form.first_name.value,
                    last_name: form.last_name.value,
                    birthday: form.birthday.value ? form.birthday.value:null,
                    job: form.job.value ? form.job.value:null,
                    email: form.email.value ? form.email.value:null,
                    phone: form.phone.value
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


