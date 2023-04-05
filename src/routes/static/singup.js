const form = document.forms[0]

form.addEventListener('submit', async event => {
    event.preventDefault()

    // console.log("form birthday: ", form.birthday.value)

    boda = new FormData(form)

    // for (key of boda.keys()) {
    //     console.log("body: ", key)
    // }

    for (value of boda.values()) {
        console.log("value: ", value)
    }
    const response = await fetch(
        'http://localhost:8000/auth/singup',
            {
                method: 'POST',
                body: new FormData(form)
            }
    )


    result = await response.json()
    console.log("response status", response)
    console.log("result: ", result.detail, result)

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

        // form.hidden = true
        // detail.innerHTML = result.detail
        // buttons.hidden = false
    }
    // else {
    //     form.hidden = true
    //     buttons.hidden = false
    //     msg = ""
    //     for (res of result.detail) {
    //         msg = msg + res.loc[1] + "-error: " + res.msg + "\n"
    //     }
    //     detail.innerHTML = msg
    // }

})


