
var savePosts = document.querySelectorAll(".savePost")
var postSaves = document.querySelectorAll(".postSave")
savePosts.forEach(savePost => {
    savePost.addEventListener("click", function (e) {
        savePost.innerHTML = `<span class=" w-full  flex flex-col items-center justify-center ">
                                                            <div
                                                                class="spinner items-center justify-center flex mix-blend-difference cursor-pointer text-xl transition-all">
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                                <div class="spinner-blade mix-blend-difference rounded-full bg-blue-500"></div>
                                                            </div>
                                                            </span>`
        e.stopPropagation()
        console.log("clicked")
        const postId = event.currentTarget.id
        const Data = {
            postId,
            userId
        }
        axios.post("/save", Data).then((response) => {
            if (response) {

                if (response.data.saved.includes(savePost.id)) {
                    savePost.innerHTML = `<i class="fa-solid fa-bookmark text-xl"></i>`
                } else {
                    savePost.innerHTML = `<i class="fa-light fa-bookmark text-xl"></i>`
                }


            } else {
                console.log("err")
            }
        }).catch((err) => {
            console.log(err)
        });
    })
})
