// // Get a reference to the div element
const playerElement = document.getElementById("singleSong-jplayer-7");

// Get all elements with the "clickable" class
const clickableElements = document.querySelectorAll(".track");

// Add a click event listener to each clickable element
clickableElements.forEach(function (element) {
  element.addEventListener("click", function (event) {
    // Retrieve the value of the data-mp3 attribute from the clicked element
    const mp3Value = element.getAttribute("data-mp3");

    // You can now use mp3Value for further processing
    // console.log("Data-MP3 value:", mp3Value);

    // Change the value of the data-mp3 attribute
    playerElement.setAttribute("data-mp3", "assets/audio/projects/" + mp3Value);
    playerElement.setAttribute("data-title", mp3Value);


    // Call the function immediately in case the element already exists
    handleElementExistence("assets/audio/projects/" + mp3Value);
  });
});



/*

We define a function handleElementExistence that checks if the target element with the ID "targetElement" exists in the DOM and takes action if it does.

We create a MutationObserver to watch for changes to the DOM, specifically changes to the child elements of the document.body and its entire subtree (childList: true and subtree: true).

Inside the observer's callback function, we check if the target element exists using the handleElementExistence function and disconnect the observer once the element is found.

We also call handleElementExistence immediately in case the element already exists before the observer is set up.

This approach allows you to wait for the element to exist and then perform actions once it becomes available in the DOM.
*/

// Function to be executed when the target element exists
function handleElementExistence(updateAudioPath) {
  const targetAudioElement = document.getElementById("jp_audio_0");
  if (targetAudioElement) {

    // First Stop the audio from playing before making any updates

    targetAudioElement.pause()

    // The target element now exists in the DOM, you can perform actions here
    // console.log("Target element exists:", targetAudioElement);

    // Get a HTMLCollection of target className
    const spanTitle     = document.getElementsByClassName("song-title");

    // Modify the content of the span element
    /*
      We start with the filePath variable containing the path to your MP3 file.

      We use the split("/") method to split the path into an array of parts using the "/" delimiter.

      We use .pop() to get the last element of the array, which is the filename with the ".mp3" extension.

      Finally, we use .replace(/\.[^/.]+$/, "") to remove the ".mp3" extension from the filename,
      
      leaving you with just the filename without the extension.
     */

    const fileNameWithoutExtension = updateAudioPath.split("/").pop().replace(/\.[^/.]+$/, "")
    const fileNameWithoutExtensionAndWithoutUnderscores = fileNameWithoutExtension.replace(/_/g, " ")
    spanTitle[0].textContent = fileNameWithoutExtensionAndWithoutUnderscores;

    // Change the src attribute of the audio element
    targetAudioElement.src = updateAudioPath; // Replace "new_audio_path.mp3" with your desired audio file path
    targetAudioElement.title = fileNameWithoutExtensionAndWithoutUnderscores;
    targetAudioElement.load(); // Reload the audio element to apply the changes
    targetAudioElement.play(); // Play the audio element after the updates

  }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(function (mutationsList, observer) {
  // Check if the target element now exists
  handleElementExistence();

  // Stop observing once the element is found
  observer.disconnect();
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true, // Watch for changes to the child elements of the body
  subtree: true,   // Watch for changes in the entire DOM subtree
});


