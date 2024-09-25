
var imageSelector = document.querySelector('#imageSelector');
var profileImage = document.querySelector('#profileImage');


imageSelector.addEventListener('change', function (e) {
    const image = e.target.files[0];
    if (image) {
        const reader = new FileReader();
        reader.onload = function (event) {


            profileImage.src = event.target.result;
        }
        reader.readAsDataURL(image);
    }

})