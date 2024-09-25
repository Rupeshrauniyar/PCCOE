const likeIconConts = document.querySelectorAll('.likeIconCont');
var likeCounters = document.querySelectorAll(".likeCounter")

var likeAmmount = document.querySelectorAll(".likeAmmount")
document.addEventListener('DOMContentLoaded', () => {
    likeIconConts.forEach(likeIconCont => {
        likeIconCont.addEventListener("click", async function (e) {
            e.stopPropagation()
            likeIconCont.innerHTML = `
             <p class="ml-4 mr-4 flex flex-col items-center justify-center ">
                                                            <div
                                                                class="spinner items-center justify-center flex mix-blend-difference cursor-pointer text-xl transition-all ml-1">
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                                <div class="spinner-blade rounded-full"></div>
                                                            </div>
                                                            </p>
            `
            const postId = e.currentTarget.id;
            if (postId) {
                const sendData = {
                    postId,
                    userId
                };
                try {
                    const response = await axios.post('/like', sendData);
                    if (response) {
                        const likeCounters = document.querySelectorAll(".likeCounter");
                        if (likeIconCont.id.includes(response.data._id)) {
                            if (response.data.likes.includes(userId)) {
                                likeIconCont.innerHTML = `<i class=" fa-solid fa-heart text-red-500 cursor-pointer text-xl  transition-all " id="${response.data._id}"></i>`;
                            } else {
                                likeIconCont.innerHTML = `<i class="fa-light fa-regular fa-heart cursor-pointer text-xl  transition-all hover:animate-pulse  " id="${response.data._id}"></i>`;
                            }
                        }


                        likeCounters.forEach(likeCounter => {
                            if (likeCounter.id.includes(postId)) {
                                likeCounter.innerHTML = `${response.data.likes.length} `;
                            }
                        });
                    }
                } catch (error) {
                    console.error('');
                }
            } else {
                console.log("")
            }

        })
    })
});



