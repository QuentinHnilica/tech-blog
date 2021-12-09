const goToPage = async (id) => {
    const response = await fetch('/post/op/' +id,{
        mothod: "GET"
    })
    if (response.ok){
        document.location.replace('/post')
    }
}

const start = async () => {
    const response = await fetch('/myPosts',{
        method: "GET"
    })
    if(response.ok){
        response.json().then(function(data){
            console.log(data)
            for (let i = 0; i < data.length; i++){
                let user = data[i].username
                let date = data[i].date
                let subject = data[i].subject
                let id = data[i].PostId

                let postHTML = 
                `<section class = "border m-4">
                <button class="btn no-button" onClick="goToPage(${id})"">
                    <div class = "postHead">          
                        <h3 id="subject">${subject}</h3>
                        <p id="userTime">${user}  ${date}</p>
                    </div>
                </button>
                </section>`
                $('#postHere').append(postHTML)
            }
        })
    }
    else{
        alert(response.statusText)
    }
}

start()