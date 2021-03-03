import circleDrawWav from "../../sounds/circle.mp3";
import linesDrawWav from "../../sounds/lines.mp3";
import backgroundSongSrc from "../../sounds/background-music.mp3";

const circleDrawSound = new Audio(circleDrawWav);
const linesDrawSound = new Audio(linesDrawWav);

const backgroundSong = new Audio(backgroundSongSrc);
backgroundSong.autoplay = true;

window.addEventListener("click", () => {
  backgroundSong.play();
});

function playCircleDrawSound(volume, soundIsAviable) {
  if (soundIsAviable) {
    circleDrawSound.volume = volume;
    circleDrawSound.play();
  }
}

export function playLinesDrawSound(volume, soundIsAviable) {
  if (soundIsAviable) {
    linesDrawSound.volume = volume;
    linesDrawSound.play();
  }
}

export function updateBackgroundSongVolume(newVolume) {
  backgroundSong.volume = newVolume;
}

export function toggleBackgroundMusic(isActive) {
  backgroundSong.muted = isActive;
}

export default playCircleDrawSound;
