var searchInp = document.querySelector("#searchInp")
let searchClutter = ""
var usersCont = document.querySelector(".usersCont")
searchInp.addEventListener("input", function () {


    const searchedData = searchInp.value
    const Data = {
        searchedData
    }

    if (searchInp.value.length < 1) {
        searchClutter = ""
        usersCont.innerHTML = ""
        searchClutter = `<div class="recent searches">
                        <h3 class="text-base tracking-tighter">Recent</h3>
                        <div class="w-full h-full flex flex-col items-center justify-center py-32">
                            <h3 class="text-base tracking-tighter font-semibold">No recent searches</h3>
                        </div> 
                    </div>`
        usersCont.innerHTML += searchClutter
    } else {
        axios.post("/search", Data).then(function (response) {
            if (response) {
                usersCont.innerHTML = ""
                console.log(response)

                if (response.data.length > 0) {
                    response.data.forEach(user => {



                        searchClutter = ""
                        searchClutter = `<div
                            class="userDets flex py-3 rounded-md tracking-tighter transition-all hover:bg-zinc-800 mt-2 p-2 cursor-pointer" id="${user._id}">
                            
                                <div class="flex items-center ">
                                    <img class="userPic w-[50px] h-[50px] object-cover rounded-full"
                                        src="${user.profilePicture}" alt="User Pic">
                                    <span class="flex flex-col ">
                                        <h2 class="userName ml-2 tracking-wide">
                                        ${user.username}
                                        </h2>
                                        
                                    </span>
    
                                </div>
                        
    
                        </div>`
                        usersCont.innerHTML += searchClutter
                        var userDets = document.querySelectorAll(".userDets")
                        userDets.forEach(userDet => {
                            userDet.addEventListener("click", (e) => {
                                console.log("clicked")
                                e.stopPropagation()
                                var userId = e.currentTarget.id
                                const Data = {
                                    userId
                                }
                                axios.post("/search/s", Data).then(function (response) {
                                    if (response) {
                                        console.log(response)
                                        window.location.href = `/profile/${userId}`
                                    } else {
                                        window.location.href = `/profile/${userId}`

                                    }
                                })
                            })
                        })

                    })
                } else {
                    searchClutter = ""
                    usersCont.innerHTML = ""
                    searchClutter = ` <div class="w-full h-full flex items-center justify-center py-32">
                <h1 >No users found</h1>
                </div>`
                    usersCont.innerHTML += searchClutter
                }

            } else {
                searchClutter = ""
                searchClutter = `
                <div class="w-full h-full flex items-center justify-center py-32">
                <h1 >No users found</h1>
                </div>
                `
                usersCont.innerHTML += searchClutter
            }


        })
    }
})