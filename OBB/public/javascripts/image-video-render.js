var imageLabel = document.querySelector("#imageLabel")
var postCaption = document.querySelector(".postCaption")
var imageSelector = document.querySelector('#imageSelector');
var postImg = document.querySelector('#postImg');
var postCont = document.querySelector('.postCont');
var errorCont = document.querySelector(".errorCont")
imageSelector.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
        const unsupportedFormats = [
            "video/x-matroska", // .mkv
            "video/quicktime", // .mov
            "video/x-msvideo", // .avi
            "video/webm", // .webm
            "video/x-ms-wmv", // .wmv
            "video/x-flv", // .flv
            "video/3gpp", // .3gp
        ];
        const fileType = file.type
        const reader = new FileReader()
        reader.onload = function (event) {
            if (fileType.startsWith("video/")) {
                if (unsupportedFormats.includes(fileType)) {
                    errorCont.innerHTML = ` <div class="w-full fixed z-20 flex flex-col items-center justify-center mt-2">
                        <div class="bg-black py-3 px-10 rounded-md">
                            <h3 class="text-white flex items-center justify-center tracking-widest">
                               Unsupported Video File.
                            </h3>
                        </div>
                    </div>`
                } else {
                    postCont.innerHTML = `<video src=${event.target.result} class="w-full h-full object-cover" autoplay loop  id="postImg">`
                    postCont.classList.remove('hidden');
                    imageLabel.classList.remove("w-[0%]")
                    imageLabel.classList.add("w-[70%]")
                    postCaption.classList.remove("w-[100%]")
                    postCaption.classList.add("w-[30%]")

                }
            } else if (fileType.startsWith("image/")) {
                postCont.innerHTML = `<img src=${event.target.result} class="w-full h-full object-cover " id="postImg"> `
                postCont.classList.remove('hidden');
                
                imageLabel.classList.remove("w-[0%]")
                imageLabel.classList.add("w-[70%]")
                postCaption.classList.remove("w-[100%]")
                postCaption.classList.add("w-[30%]")
            }


        }
        reader.readAsDataURL(file);


    }
})