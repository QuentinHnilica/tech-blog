const submit = document.getElementById('log')
const login1 = document.getElementById('login')

const subSignUp = async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value.trim()
    const email = document.querySelector('#userEmail').value.trim()
    const pass = document.querySelector('#userPass').value.trim()

    const newUser = {
        username: username,
        email: email,
        password: pass
    }
    console.log(newUser)

    const response = await fetch('/subSignUp', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok){
        document.location.replace('/')
    }
    else{
        //document.location.reload()
    }
}


function loginInstead(){
    e.preventDefault()
    document.location.replace('/login')
}

submit.addEventListener('click', subSignUp)
login1.addEventListener('click', loginInstead)