let btn = document.querySelector("#btn");
let finpt = document.querySelector("#finpt");
let url = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
let loading = document.querySelector("#loading");
let fimg = document.querySelector("#fimg");

btn.addEventListener("click", async () => {
    try {
        console.log("Generating image...");

        // Show loading spinner
        loading.style.display = "block";
        fimg.style.display = "none"; // Hide the image until it's ready

        // Get the prompt from the input field
        let prompt = finpt.value;

        // Ensure the prompt is not empty
        if (!prompt) {
            alert("Please enter a prompt!");
            return;
        }

        // Prepare the payload
        const payload = {
            inputs: prompt, // Pass the input value as the prompt
        };

        // Make the API request
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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", // Your actual token
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });

        // Check for response status
        if (!response.ok) {
            const errorDetails = await response.text(); // Get error details
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
        }

        // Process the response to get the image
        const result = await response.blob(); // Convert response to blob
        const imageURL = URL.createObjectURL(result); // Create an object URL for the image

        // Hide loading spinner and show the image
        loading.style.display = "none";
        fimg.style.display = "block";
        fimg.src = imageURL;
        fimg.alt = `Generated image for: ${prompt}`;

    } catch (error) {
        // Handle errors and log details
        console.error("Error generating image:", error);
        alert(`Failed to generate the image: ${error.message}`);

        // Hide loading spinner on error
        loading.style.display = "none";
    }
});
