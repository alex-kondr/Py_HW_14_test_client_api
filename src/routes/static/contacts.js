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
        clone.querySelector('#delete').innerHTML = contact.first_name

        document.getElementById("contactsRow").appendChild(clone)
    }

    loading.hidden = true
    
    let btns = document.querySelectorAll('button');
    console.log(btns)
    btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log(btn.innerHTML)
    });
    });
}


const getContacts = async (access_token, refresh_token) => {

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
        
        getContacts(access_token, refresh_token)
    }
    else {
        window.location = "../auth/singin"
    }
}
// alert("kyky")

getContacts(
    localStorage.getItem("access_token"),
    localStorage.getItem("refresh_token"),
)
    

