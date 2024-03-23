const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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"; 

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".image-card")[index];
        const imgElement = imgCard.querySelector("img");

        //Set the image source to the AI-generated image data
        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        //When image is loaded, remove the loading class
        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        }
    })
}

const generateAIImages = async (userPrompt, userImgQuantity) => {
    try {  
        //Send request to the OpenAI API to generate images base on users input 
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            header: {
                "Content-Type": "applications/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        //if(!response.ok) throw new Error("Failed to generate images! Please try again.");

        const { data } = await response.json(); //Get data from response
        updateImageCard([...data]);
    } catch(error) {
        alert(error.message);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    
    //Get user input and image quantity in the form 
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Create HTML markup for images with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="image-card loading">
            <img src="assets/loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="assets/download.svg" alt="download-icon">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAIImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);