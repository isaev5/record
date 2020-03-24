if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then(() => {
      console.log("Service Worker Registered");
    });
  });
}
const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    let audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      console.log(event.data);
      audioChunks.push(event.data);
    });

    const start = () => {
      audioChunks = [];
      mediaRecorder.start();
    };

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          // audio.controls = true;
          // document.body.append(audio)
          // console.log(audio);
          const play = () => audio.play();
          resolve({ audioChunks, audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const recordButton = document.querySelector("#record");
const stopButton = document.querySelector("#stop");
const playButton = document.querySelector("#play");
const saveButton = document.querySelector("#save");
const savedAudioMessagesContainer = document.querySelector(
  "#saved-audio-messages"
);

let recorder;
let audio;

recordButton.addEventListener("click", async () => {
  recordButton.setAttribute("disabled", true);
  stopButton.removeAttribute("disabled");
  playButton.setAttribute("disabled", true);
  saveButton.setAttribute("disabled", true);
  if (!recorder) {
    recorder = await recordAudio();
  }
  recorder.start();
});

stopButton.addEventListener("click", async () => {
  recordButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", true);
  playButton.removeAttribute("disabled");
  saveButton.removeAttribute("disabled");
  audio = await recorder.stop();
});

playButton.addEventListener("click", () => {
  audio.play();
});


const input = document.querySelector('input[type="file"]');

input.addEventListener('change', e => {
  console.log(input.file);
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image;
    img.src = reader.result;
    document.body.appendChild(img);
    console.log(reader);
  }

  reader.readAsDataURL(input.files[0]);
});