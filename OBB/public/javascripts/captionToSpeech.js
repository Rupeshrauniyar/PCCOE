var speechButtons = document.querySelectorAll("#speechButton");
var synth = window.speechSynthesis;
var flag = 0;

function speakTextInChunks(text, lang) {
    const chunks = text.match(/[^।]+[।]?/g) || [text]; // Split by sentence or punctuation
    let chunkIndex = 0;

    function speakNextChunk() {
        if (chunkIndex < chunks.length) {
            let speech = new SpeechSynthesisUtterance(chunks[chunkIndex].trim());
            speech.lang = lang;
            speech.rate = 1.1

            // Immediately trigger the next chunk as soon as the current one ends
            speech.onend = () => {
                chunkIndex++;
                if (chunkIndex < chunks.length) {
                    speakNextChunk(); // Speak the next chunk immediately
                } else {
                    flag = 0; // Reset flag when all chunks are spoken
                }
            };

            synth.speak(speech);
        }
    }

    speakNextChunk(); // Start speaking the first chunk
}

speechButtons.forEach(speechButton => {
    speechButton.addEventListener("click", function () {
        const caption = speechButton.getAttribute("data-caption");

        if (flag === 0) {
            synth.cancel(); // Stop any ongoing speech
            speechButton.classList.remove("fa-light");
            speechButton.classList.add("fa-solid");
            flag = 1;

            speakTextInChunks(caption, 'hi-IN');

            
        } else {
            synth.cancel();
            speechButton.classList.add("fa-light");
            speechButton.classList.remove("fa-solid");
            flag = 0;
        }
    });
});
