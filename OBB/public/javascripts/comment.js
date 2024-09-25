var commentInps = document.querySelectorAll(".commentInp")
var postBtns = document.querySelectorAll(".postBtn")


document.addEventListener("DOMContentLoaded", function () {
    const commentBtns = document.querySelectorAll(".commentBtn")
    var displayCommentsCont = document.querySelector(".displayCommentsCont")
    var commentHolder = document.querySelector(".commentHolder")
    var commentInpHolder = document.querySelector(".commentInpHolder")

    const body = document.querySelector("body")
    var commentClutter = ""
    var advancedCommentClutter = ""


    commentBtns.forEach(commentBtn => {
        commentBtn.addEventListener("click", function (e) {
            e.stopPropagation()
            const postId = e.currentTarget.id
            const sendData = {
                postId
            }
            body.classList.add("bg")
            displayCommentsCont.classList.remove("hidden")
            commentHolder.innerHTML = `<span class=" w-full  flex flex-col items-center justify-center mt-4 ">
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
            commentInpHolder.innerHTML = ""
            axios.post("/fetch/comment", sendData).then(function (response) {

                if (response.data.comments.length > 0) {
                    commentHolder.innerHTML = ""
                    
                    response.data.comments.forEach(data => {

                        commentClutter += `
                       
                         <div class="userCont flex flex-col ml-4 mt-2 last-of-type:mb-8">
                    <div class="userMainDets flex items-center">
                        <a href="/profile/${data.userId._id}">
                            <div class="userProfile">
                                <img class="w-[40px] h-[40px] rounded-full object-cover" src="${data.userId.profilePicture}">
                            </div>
                        </a>
    
                        <div class="userDets flex flex-col ml-4">
                            <span class="flex">
                                <a href="/profile/${data.userId._id}">
                                    <h2 class="text-base font-medium  flex">${data.userId.username}</h2>
                                </a>
    
                                <p class="tracking-wide ml-2 text-zinc-500">${data.commentedOn}</p>
    
                            </span>
    
                            <div class="commentText text-ellipsis overflow-hidden w-full">
                                <h2 class="tracking-wide text-ellipsis overflow-hidden ">
                                ${data.comment}
                                 </h2>
                              </div>
                              
                        </div>
                    </div>
                   
    
                </div>
                        `
                    })
                    advancedCommentClutter = ""
                    commentInpHolder.innerHTML = ""

                    advancedCommentClutter += `<div class="postWriteCommentsContainer mt-2 flex items-center justify-between p-4 w-full ">
                <textarea type="text" name="comment" id="${response.data._id}"
                    class="commentInpsInCommentBox outline-none w-full h-[40px] rounded-md  py-2   bg-transparent  border-none "
                    placeholder="Add a comment." maxlength="400" id="${response.data._id}"
                    style="resize: none;"></textarea>
                <button class="text-blue-600 tracking-widest text-md postBtnsInCommentBox" id="${response.data._id}">Post</button>

            </div>`
                    commentHolder.innerHTML = commentClutter
                    commentInpHolder.innerHTML = advancedCommentClutter



                    addACommentInCommentBox()
                } else if (!response || !response.data || response.data.comments.length < 1) {

                    
                    displayCommentsCont.classList.remove("hidden")
                    commentHolder.innerHTML = ""
                    commentClutter += `
                    <div class="w-full flex flex-col items-center justify-center"><p class="tracking-wide">No any comments!</p></div>`

                    advancedCommentClutter += `<div class="postWriteCommentsContainer mt-2 flex items-center justify-between p-4 w-full ">
                <textarea type="text" name="comment" id="${postId}"
                    class="commentInpsInCommentBox outline-none w-full h-[40px] rounded-md  py-2   bg-transparent  border-none "
                    placeholder="Add a comment." maxlength="400" id="${postId}"
                    style="resize: none;"></textarea>
                <button class="text-blue-600 tracking-widest text-md postBtnsInCommentBox" id="${postId}">Post</button>

            </div>`

                    commentInpHolder.innerHTML = advancedCommentClutter
                    commentHolder.innerHTML = commentClutter
                    addACommentInCommentBox()
                }
            })
        })
    })
    var closeComment = document.querySelector(".closeComment")
    closeComment.addEventListener("click", function (e) {
        e.stopPropagation()
        body.classList.remove("bg-zinc-800")
        displayCommentsCont.classList.add("hidden")
        commentHolder.innerHTML = ""
        commentClutter = ""
        advancedCommentClutter = ""
        commentInpHolder.innerHTML = ""
    })
    function addAComment() {
        commentInps.forEach(commentInp => {
            postBtns.forEach(postBtn => {
                postBtn.addEventListener("click", function (e) {
                    e.stopPropagation()
                    if (postBtn.id === commentInp.id) {
                        if (commentInp.value.length > 0) {

                            const commentValue = commentInp.value
                            const postId = commentInp.id
                            const sendData = {
                                commentValue,
                                postId,
                                userId
                            }
                            axios.post("/comment", sendData).then(function (response) {
                                if (response && response.data.success.length > 0) {
                                    commentInp.value = ""

                                    alert(`${response.data.success}`)
                                }
                            })
                        } else {
                            alert("Empty comment cannot be made.")
                        }

                    }



                })


            })

        })
    }
    addAComment()
    function addACommentInCommentBox() {
        var commentInpsInCommentBox = document.querySelectorAll(".commentInpsInCommentBox")
        var postBtnsInCommentBox = document.querySelectorAll(".postBtnsInCommentBox")

        commentInpsInCommentBox.forEach(commentInp => {
            postBtnsInCommentBox.forEach(postBtn => {
                postBtn.addEventListener("click", function (e) {
                    e.stopPropagation()
                    if (postBtn.id === commentInp.id) {
                        if (commentInp.value.length > 0) {

                            const commentValue = commentInp.value
                            const postId = commentInp.id
                            const sendData = {
                                commentValue,
                                postId,
                                userId
                            }
                            axios.post("/comment", sendData).then(function (response) {
                                if (response && response.data.success.length > 0) {
                                    commentInp.value = ""

                                    alert(`${response.data.success}`)
                                }
                            })
                        } else {
                            alert("Empty comment cannot be made.")

                        }

                    }



                })


            })

        })
    }
});
