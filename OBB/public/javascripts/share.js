var copyBtns = document.querySelectorAll('#copyButton')

copyBtns.forEach(copyBtn => {

    copyBtn.addEventListener('click', function (e) {
        e.stopPropagation()
        const copyBtnId = e.target.id
        const textToCopys = document.querySelectorAll('.textToCopy')

        textToCopys.forEach(textToCopy => {
            const val = textToCopy.value
            const copyId = textToCopy.id
            if (copyBtnId === copyId) {
                if (navigator.share) {
                    navigator.share({
                        title: "Instagram",
                        url: `${val}`,
                       
                    })
                } else {
                    navigator.clipboard.write(val)
                }
            }

        })

    });
})

