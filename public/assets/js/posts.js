const reply = document.getElementById('submitPost')
let OPID
let OPSub
let comment

let thisUser
const getReplys = async () => {
    const response = await fetch('/post/getReplys', {
        method: "GET"
    })
    if (response.ok){
        response.json().then(function(data){
            for (let i = 0; i < data.length; i++){
                let user = data[i].username
            let date = data[i].date
            let subject = data[i].OPsubject
            let content = data[i].PostContent

            let postHTML = 
            `<section class = "border m-4">
                <div class = "postHead">          
                    <h3 id="subject">RE: ${subject}</h3>
                    <p id="userTime">${user}  ${date}</p>
                </div>
                <div>
                    <p style="color: white;" id="content">${content} </p>
                </div>
            </section>`
            $('#postReplyHere').append(postHTML)
            }    
        })
    }
}

const start = async () => {
    const response = await fetch('/post/getPosts',{
        method: "GET"
    })

    if (response.ok){
        response.json().then(function(data){

            let user = data.username
            let date = data.date
            let subject = data.subject
            let content = data.PostContent

            let postHTML = 
            `<section class = "border m-4">
                <div class = "postHead">          
                    <h3 id="subject">${subject}</h3>
                    <p id="userTime">${user}  ${date}</p>
                </div>
                <div>
                    <p style="color: white;" id="content">${content} </p>
                </div>
            </section>`
            $('#postHere').append(postHTML)

            OPID = data.PostId
            OPsubject = subject
            getReplys()
        })
    }
}

start()

const makeReply = async (currUser) => {
    thisUser=currUser
    const date = new Date()
    const timeStamp = date.toDateString()
    const theReply = {
        username: currUser,
        PostContent: comment,
        OPid: OPID,
        OPsubject: OPsubject,
        date: timeStamp
    }
    console.log(theReply)
    const response = await fetch('/post/newReply', {
        method: "POST",
        body: JSON.stringify(theReply),
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok){
        console.log('Posted')
        window.location.reload()
    }
    
}


const getCurrUser = async () => {
    if(document.querySelector('#yourPost') != null){
        comment = document.querySelector('#yourPost').value.trim()

        const response = await fetch('/post/getCurrUser', {
            method: "GET"
        })
        if (response.ok){
            response.json().then(function(data){
                console.log(data)
                const currUser = data
                makeReply(currUser)
            })
        }
    }
    else{
        window.location.replace('/login')
    }
}

reply.addEventListener('click', getCurrUser)