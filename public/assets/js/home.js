const start = async () => {
    const response = await fetch('/homeposts',{
        method: "GET"
    })
    if(response.ok){
        response.json().then(function(data){
            for (let i = 0; i < data.length; i++){
                let user = data[i].username
                let date = data[i].date
                let subject = data[i].subject
                let content = data[i].PostContent
                let id = data[i].PostId

                let postHTML = 
                `<section class = "border m-4">
                    <button class="btn no-button" style="width: 100%;" onClick="goToPage(${id})"">
                        <div class = "postHead">          
                            <h3 id="subject">${subject}</h3>
                            <p id="userTime">${user}  ${date}</p>
                        </div>
                        <div>
                            <p style="color: white;" id="content">${content} </p>
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

const test = async () => {
    const testResponse = await fetch('/test',{
        method: 'GET'
    })

    if (testResponse.ok){
        testResponse.json().then(function(data){
            console.log(data)
        })
    }
    else{
        alert(resizeBy.statusText)
    }
}

const goToPage = async (id) => {
    const response = await fetch('/post/op/' +id,{
        mothod: "GET"
    })
    if (response.ok){
        document.location.replace('/post')
    }
}