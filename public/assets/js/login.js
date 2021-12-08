const submit = document.getElementById('log')
const signUp = document.getElementById('signUp')

const login = async(e) =>{
    e.preventDefault()
    const email = document.querySelector('#userEmail').value.trim()
    const pass = document.querySelector('#userPass').value.trim()

    if (email && pass){
        const response = await fetch('/login/atmpt', {
            method: 'POST',
            body: JSON.stringify({ email, pass }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok){
            document.location.replace('/')
        }
        else{
            alert('failed')
        }
    }
}

function signUpFunc(e){
    e.preventDefault()
    document.location.replace('/signUp')
}

submit.addEventListener('click', login)
signUp.addEventListener('click', signUpFunc)
