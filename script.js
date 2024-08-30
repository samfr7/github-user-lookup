const invalidId = ()=>{
    console.log("Invalid ID")
    document.getElementsByClassName('card')[0].innerHTML = `
    
                <div class="card-body p-4" style="border-radius: 25px">
                  <h3 class="mb-3">No User Found</h3>
                  <p class="small mb-0"><i class="far fa-star fa-lg"></i> <span class="mx-2">|</span> <strong>Please try again by entering a proper UserID </strong></p>
                  
                </div>
    `
}

const followersPage = async ()=>{
    try{
        let response = await fetch(`https://api.github.com/users/${username}`)
        if(response.ok){
            let data = await response.json()
            validID(data)
        }
        else{
            throw new Error("ID not found")
        }
    } catch(error){
        invalidId()
    }
}



const validID = (profile)=>{
    console.log("Valid ID")

    document.getElementsByClassName('card')[0].innerHTML = `
    <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                  <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                    <img src=${profile.avatar_url}
                      alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                      style="width: 150px; z-index: 1">
                    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark text-body" data-mdb-ripple-color="dark" style="z-index: 1;">
                      Edit profile
                    </button>
                  </div>
                  <div class="ms-3" style="margin-top: 130px;">
                    <h5>${profile.name}</h5>
                    <p>${profile.location}</p>
                  </div>
                </div>
                <div class="p-4 text-black bg-body-tertiary">
                  <div class="d-flex justify-content-end text-center py-1 text-body">
                    <div>
                      <p class="mb-1 h5">${profile.public_repos}</p>
                      <p class="small text-muted mb-0">Public Repos</p>
                    </div>
                    <div class="px-3">
                      <p class="mb-1 h5">${profile.followers}</p>
                      <p class="small text-muted mb-0" id="followers">Followers</p>
                    </div>
                    <div>
                      <p class="mb-1 h5">${profile.following}</p>
                      <p class="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5  text-body">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4 bg-body-tertiary">
                      <p class="font-italic mb-1">${profile.bio}</p>
                    </div>
                  </div>
                </div>
    `

    // getting the followers list
 
    let follow = document.getElementById('followers')
    follow.addEventListener('click', async ()=>{
        document.getElementsByClassName('followers-container')[0].classList.toggle('doNotDisplay')
        document.getElementsByClassName('card')[0].classList.toggle('doNotDisplay')
        let response = await fetch(profile.followers_url)
        if(response.ok){
            let followers = await response.json()
            document.getElementsByClassName('followers')[0].innerHTML = ""


            // Adding the followers and the details with value updated in button
            for(let i = 0; i < followers.length ; i++){
                // console.log(typeof followers[i].login)
                document.getElementsByClassName('followers')[0].innerHTML += `
                
                <div class="followers-card border border-dark rounded-3 mt-2 mb-2">
                                    <img src="${followers[i].avatar_url}" alt="Generic placeholder image" class="img-fluid img-thumbnail mt-2 mb-2 rounded-pill"
                                    style="width: 100px; z-index: 1">
                                    <div class="followers-content justify-content-start">
                                        <h5 style="width: 150px; "> ${followers[i].login}</h5>
                                        <button class="followersToGit rounded btn btn-dark" value="${followers[i].login}" onclick="mainFunc("${followers[i].login}")"> Go to GitHub</button>
                                    </div>
                                </div>

                `

                
                
                
            }


        }
        else{
            invalidId()
        }
    })


}


let mainFunc = async (username)=>{
    try{
        let response = await fetch(`https://api.github.com/users/${username}`)
        if(response.ok){
            let data = await response.json()
            validID(data)
        }
        else{
            throw new Error("ID not found")
        }
    } catch(error){
        invalidId()
    }
}



let userSearchButton = document.getElementById('userSearchButton')

userSearchButton.addEventListener('click',(e)=>{
    data = userSearchButton.previousElementSibling.value
    if(data.length === 0){
        invalidId()
    }
    else{
        mainFunc(data)
    }
    userSearchButton.previousElementSibling.value = ""
})






// mainFunc("kamranahmedse")


