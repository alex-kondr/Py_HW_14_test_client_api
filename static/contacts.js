// const element = contactsRow
// const phone1 = phone

// phone1.innerHTML = "<b>Phone: </b>quwerty"
// phone.id = 789
// console.log(element.phone)

// for (i in [0, 1]) {
    // phone.id = `phone1`
    const element1 = document.getElementById("contactsCol")
    // element1.id = `contactsCol${i}`
const clone = element1.cloneNode(true)
// clone.childNodes[1].childNodes[3].childNodes[3].childNodes[1].textContent = "phone789"
    console.log(clone.querySelector('#'+'phone'))
// const phone11 = clone.getElementById("phone")
    
    // phone11.id = "phone12"
    document.getElementById("contactsRow").appendChild(clone)
    // console.log(element1)
    // const element = contactsCol
    // contactsRow.appendChild(element1)


// }




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
        
        // ab = await response_temp.blob()
        // console.log("response_temp", ab)
        // const objectURL = URL.createObjectURL(ab)
        // console.log("url", objectURL)
        // window.location= objectURL
    }
}
