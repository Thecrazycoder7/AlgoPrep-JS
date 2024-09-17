const speedUp = document.querySelector("#speedup");
const speedDown = document.querySelector("#speeddown");
const volumeUp = document.querySelector("#volumeup");
const volumeDown = document.querySelector("#volumedown");
const openFile = document.querySelector("#openFile");
const inputFile = document.querySelector("#inputfile");
const mainDisplay = document.querySelector("#mainDisplay");
const toast = document.querySelector(".toast");

// Event listener for Speed Up
speedUp.addEventListener("click", function () {
  const videoElement = document.querySelector("video");
  if (videoElement == null) return;

  if (videoElement.playbackRate > 3) return;

  const increaseSpeed = (videoElement.playbackRate += 0.5);
  showToast(increaseSpeed + "X");
});

// Event listener for Speed Down
speedDown.addEventListener("click", function () {
  const videoElement = document.querySelector("video");
  if (videoElement == null) return;

  if (videoElement.playbackRate > 0) {
    const decreaseSpeed = (videoElement.playbackRate -= 0.5);
    showToast(decreaseSpeed + "X");
  }
});

// Event listener for Volume Up
volumeUp.addEventListener("click", function () {
  const videoElement = document.querySelector("video");
  if (videoElement == null) return;

  if (videoElement.volume >= 0.99) return;

  const increaseVolume = (videoElement.volume += 0.1);
  showToast((increaseVolume * 100).toFixed(0) + "%");
});

// Event listener for Volume Down
volumeDown.addEventListener("click", function () {
  const videoElement = document.querySelector("video");
  if (videoElement == null) return;

  if (videoElement.volume <= 0.1) {
    videoElement.volume = 0;
    return;
  }

  const decreaseVolume = (videoElement.volume -= 0.1);
  showToast((decreaseVolume * 100).toFixed(0) + "%");
});

// Show toast message
function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1000);
}

// Event listener for Open File
openFile.addEventListener("click", function () {
  inputFile.click(); // Triggers the file input click
});

// Handle file input change and load video
inputFile.addEventListener("change", function () {
  const selectedFile = inputFile.files[0];
  const link = URL.createObjectURL(selectedFile);

  // Remove any existing video before loading a new one
  mainDisplay.innerHTML = "";

  const video = document.createElement("video");
  video.src = link;
  video.autoplay = true;
  video.setAttribute("class", "video");
  mainDisplay.appendChild(video);

  // Attach event listeners after video loads
  attachVideoEvents(video);
});

// Attach video events and controls
function attachVideoEvents(videoElement) {
  const timeSlider = document.getElementById("timeSlider");
  const buttons = {
    play: document.getElementById("play"),
    pause: document.getElementById("pause"),
    rewind: document.getElementById("rewind"),
    forward: document.getElementById("forward"),
    fullScreen: document.getElementById("fullScreen"),
  };

  // Remove active class from all buttons
  function deactivateButtons() {
    Object.values(buttons).forEach((button) =>
      button.classList.remove("active")
    );
  }

  // Play button
  buttons.play.addEventListener("click", () => {
    deactivateButtons();
    buttons.play.classList.add("active");
    videoElement.play();
  });

  // Pause button
  buttons.pause.addEventListener("click", () => {
    deactivateButtons();
    buttons.pause.classList.add("active");
    videoElement.pause();
  });

  // Rewind button (go back 10 seconds)
  buttons.rewind.addEventListener("click", () => {
    deactivateButtons();
    buttons.rewind.classList.add("active");
    videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
  });

  // Forward button (go forward 10 seconds)
  buttons.forward.addEventListener("click", () => {
    deactivateButtons();
    buttons.forward.classList.add("active");
    videoElement.currentTime = Math.min(
      videoElement.currentTime + 10,
      videoElement.duration
    );
  });

  // Fullscreen button
  buttons.fullScreen.addEventListener("click", () => {
    deactivateButtons();
    buttons.fullScreen.classList.add("active");
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  });

  // Update time slider as video plays
  videoElement.addEventListener("timeupdate", () => {
    if (!timeSlider.dragging) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      timeSlider.value = (currentTime / duration) * 100;
    }
  });

  // Set the max slider value when the video metadata is loaded
  videoElement.addEventListener("loadedmetadata", () => {
    timeSlider.max = 100;
  });

  // Slider input (when user drags the slider)
  timeSlider.addEventListener("input", () => {
    timeSlider.dragging = true;
    timeSlider.classList.add("active");
    const value = timeSlider.value;
    videoElement.currentTime = (value / 100) * videoElement.duration;
  });

  // Clear dragging flag once slider is released
  timeSlider.addEventListener("change", () => {
    timeSlider.dragging = false;
    timeSlider.classList.remove("active");
  });
}
