var deleteBtns = document.querySelectorAll(".deleteBtn")
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        const postId = e.currentTarget.id

        const Data = {
            postId,
            userId
        }
        axios.post("/delete", Data).then(function (response) {
            if (response) {
                window.location.reload()
            }
        })
    })
})