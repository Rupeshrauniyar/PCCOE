var followUnfollowBtns = document.querySelectorAll(".follow-unfollow")
var followersLengths = document.querySelectorAll(".followersLength")
followUnfollowBtns.forEach(followUnfollowBtn => {
    followUnfollowBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const userId = e.currentTarget.id
        const Data = {
            userId,
            myId
        }
        axios.post("/follow-following", Data).then(function (response) {
            if (response) {
                if (response.data.myAccountUpdate.following.includes(userId) && response.data.updateFollowUser.followers.includes(myId)) {
                    if (followUnfollowBtn.id === response.data.updateFollowUser._id) {
                        followUnfollowBtn.innerHTML = `<button
                                                    class="px-4 py-2 rounded-full bg-white text-black font-bold transition-all">Unfollow</button>`
                    }
                } else {
                    if (followUnfollowBtn.id === response.data.updateFollowUser._id) {
                        followUnfollowBtn.innerHTML = `<button
                                                        class="px-4 py-2 rounded-full bg-white text-black font-bold transition-all">Follow</button>`
                    }
                }
                followersLengths.forEach(followersLength => {
                    if (response.data.updateFollowUser._id.includes(followersLength.id)) {
                        followersLength.innerHTML = `${response.data.updateFollowUser.followers.length}`

                    }
                })

            }
        })
    })
})