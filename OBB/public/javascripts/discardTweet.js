var discardTweets = document.querySelectorAll(".discardTweet")
discardTweets.forEach(discardTweet => {
    discardTweet.addEventListener("click", function () {

        if (confirm("Are you sure you want to discard the post?")) {
            window.location.reload()
        }


    })
})