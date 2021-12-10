let thisUser
const newPost = document.getElementById('submitPost')
const closeMod = document.getElementById('closeMod')
const submitEdit = document.getElementById('submitEdit')
const updatedPost = document.getElementById('updatedPost')
const updatedSubject = document.getElementById('updatedSubject')
const saveId = document.getElementById('saveId')

let oldPostDate

const goToPage = async (id) => {
    const response = await fetch('/post/op/' +id,{
        mothod: "GET"
    })
    if (response.ok){
        document.location.replace('/post')
    }
}

const getUser = async () => {
    comment = document.querySelector('#yourPost').value.trim()

    const response = await fetch('/post/getCurrUser', {
        method: "GET"
    })
    if (response.ok){
        response.json().then(function(data){
            console.log(data)
            thisUser = data

        })
    }
}

const start = async () => {
    const response = await fetch('/myPosts',{
        method: "GET"
    })
    if(response.ok){
        response.json().then(function(data){
            for (let i = 0; i < data.length; i++){
                let user = data[i].username
                let date = data[i].date
                let subject = data[i].subject
                let id = data[i].PostId

                let postHTML = 
                `<section class = "border m-4" style="background-color: rgba(80, 9, 9, 0.801)">
                    <button class="btn no-button" style="width: 100%; height: 100%" onClick="goToPage(${id})">
                        <div class = "postHead">          
                            <h3 id="subject">${subject}</h3>
                            <p id="userTime">${user}  ${date}</p>
                        </div>
                    </button>
                    <div class="container">
                        <div class="row align-items">
                            <div class="col-9"></div>
                            <div class="col-3">
                                <div style="text-align: center;">
                                <button class="btn btn-primary" onClick="editPost(${id})">edit</button>
                                <button class="btn btn-primary" onClick="deletePost(${id})">delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
                $('#postHere').append(postHTML)
            }
        })
    }
    else{
        alert(response.statusText)
    }

    getUser()
}

start()

const makePost = async () => {
    const yourPost = document.getElementById('yourPost').value.trim()
    const subject = document.getElementById('newSubject').value.trim()
    const date = new Date()
    const timeStamp = date.toDateString()

    const newPostObj = {
        username: thisUser,
        PostContent: yourPost,
        subject: subject,
        date: timeStamp
    }

    const response = await fetch('/newPost',{
        method: "POST",
        body: JSON.stringify(newPostObj),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok){
        window.location.reload()
    }
}

const editPost = async (id) =>{
    console.log(id)
    const response = await fetch('/post/postInfo/' + id, {
        method: "GET"
    })
    if (response.ok){
        response.json().then(function(data){
            updatedSubject.value = data.subject
            updatedPost.value = data.PostContent
            saveId.innerText = id
            oldPostDate = data.date
            document.getElementById('makeEdit').style = "display: block;"
        })
        
    }

    
}

const deleteReplies = async (id) => {
    const response = await fetch('/post/deleteReplies/' + id,{
        method: "DELETE"
    })
    if (response.ok){
        window.location.reload()
    }
}

const deletePost = async (id) => {
    const response = await fetch('/post/deletePost/' +id,{
        method: "DELETE"
    })
    if (response.ok){
        console.log('deleted')
        deleteReplies(id)
    }
}

function closeEdit(){
    document.getElementById('makeEdit').style = "display: none;"
}

const makeEdit = async () => {
    const postId = parseInt(saveId.innerText)
    const newUpdate = {
        PostId: postId,
        username: thisUser,
        subject: updatedSubject.value.trim(),
        PostContent: updatedPost.value.trim(),
        date: oldPostDate
    }
    const response = await fetch('/post/upDate/' + postId,{
        method: "POST",
        body: JSON.stringify(newUpdate),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok){
        window.location.reload()
    }
}


submitEdit.addEventListener('click', makeEdit)
closeMod.addEventListener('click', closeEdit)
newPost.addEventListener('click', makePost)