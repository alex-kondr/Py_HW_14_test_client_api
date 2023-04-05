const form = document.forms[0]
const inputs = document.getElementsByTagName("input")


form.addEventListener('submit', async event => {
    event.preventDefault()

    // console.log("form birthday: ", form.birthday.value)
    // newForm = form.cloneNode(true)
    // newForm.username.value = null
    boda = new FormData(form)
    // // console.log(newForm["username"].value)
    // for (key of form) {
    //     // console.log(key.name, key.value)
    //     if (!key.value && key.name && key.name != "avatar") {
    //         // console.log("null", key.name, key.value)
    //         newForm[key.name].value = null
    //     }
    // }
    // for (key of newForm) {
    //     console.log(key.name, key.value)
    // }

    // for (key of boda.keys()) {
    //     console.log("body: ", key)
    // }
    // boda["username"] = "123"
    // for (key of boda.keys()) {
    //     if (!boda[key]) {
    //         boda.append("username", "Groucho")
    //     }
    // }
    // console.log(input1)
    options = ""
    for (input of inputs) {
        if (!input.required && input.type == "text" && input.value) {
            options = `${options}&${input.name}=${input.value}`
            // console.log(input)
        }

    }
    // for (key of form) {
    //         console.log("key: ", key.name)
    //         console.log("value: ", key.value)

    //     // options = `${options}&${key.name}=${key.value}` 
    // }
    console.log(options)

    const response = await fetch(
        `http://localhost:8000/auth/singup?${options}`,
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


