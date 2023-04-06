const delay = ms => new Promise(res => setTimeout(res, ms));


const cards = (contacts) => {

    const firstElement = document.getElementById("contactsCol")

    for (contact of contacts) {
        // console.log(contact)
        const clone = firstElement.cloneNode(true)
        clone.hidden = false
        
        clone.querySelector('#name').innerHTML = `${contact.first_name} ${contact.last_name}`
        clone.querySelector('#avatar').src = contact.avatar
        clone.querySelector('#phone').innerHTML = `<b>Phone: </b>${contact.phone}`
        clone.querySelector('#email').innerHTML = `<b>Email: </b>${(contact.email ? contact.email : "")}` 
        clone.querySelector('#delete').name = contact.id
        clone.querySelector('#edit').name = contact.id

        document.getElementById("contactsRow").appendChild(clone)
    }

    loading.hidden = true
    
    let btns = document.querySelectorAll('button');
    // console.log(btns)
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {            
            console.log(btn.name)

            if (btn.id == "delete") {
                console.log("try delete contact")
                deleteContact(btn.name)
            }
            else if (btn.id == "edit") {
                console.log("try edit")
                localStorage.setItem("contact_id", btn.name)
                window.location = "../edit_contact"
            }
    });
    });
}


const getContacts = async (access_token=localStorage.getItem("access_token"), refresh_token=localStorage.getItem("refresh_token")) => {

    console.log("try get contacts")

    const response = await fetch(
        'https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/?limit=100',
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

        cards(contacts)
    }
    else if (response.status === 401) {
        getNewTokens(refresh_token)
    }
    else if (response.status === 429) {
        console.log("response status", response.status, response.statusText)
        messageResponse = await response.json()
        console.log(messageResponse)
        message.hidden = false
        message.innerHTML = messageResponse.detail
        console.log("wait...")
        await delay(15000)
        console.log("After wait...")
        window.location = "../contacts"
    }
}

const getNewTokens = async (refresh_token) => {
    const response = await fetch(
        'https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/auth/refresh_token',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            }
        )
    if (response.status === 200) {
        console.log("Get new tokens succesfull")

        result = await response.json()

        access_token = result.access_token
        refresh_token = result.refresh_token

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        
        getContacts()
    }
    else {
        window.location = "../auth/singin"
    }
}


const deleteContact = async (contactId) => {
    const response = await fetch(
        `https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/${contactId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            }
    )
    
    if (response.status === 202) {
        console.log("Delete contact succesfull")

        console.log(response)
        result = await response.json()
        console.log(result)
        window.location = "../contacts"
    }
    // else {
    //     window.location = "../auth/singin"
    // }
}


const editContact = async (contactId) => {

    const response = await fetch(
        `https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/${contactId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            }
    )

    // const response1 = await fetch(
    //     `http://localhost:8000/contacts/edit_contact`,
    //         {
    //             method: 'POST',
    //             body: JSON.stringify(contact)
    //         }
    // )
    
    if (response.status === 202) {
        console.log("Get contact succesfull")

        console.log(response)
        result = await response.json()
        console.log(result)
        // window.location = "../contacts"
    }
    // else {
    //     window.location = "../auth/singin"
    // }
}


getContacts()
//     localStorage.getItem("access_token"),
//     localStorage.getItem("refresh_token"),
// )
    

