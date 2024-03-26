const generateForm = document.querySelector(".generate-form");

const handleFormSubmission = (e) => {
  e.preventDefault();

  const userPrompt = e.srcElement[0].value;
  const userImgQuantity = e.srcElement[1].value;
};

generateForm.addEventListener("submit", handleFormSubmission);
