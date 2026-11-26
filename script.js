/* ==================================
   MIDNIGHT LOVER — JAVASCRIPT
   ================================== */

// CLOCK

function updateClock() {
    const clock = document.getElementById("clock");

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);


// RAIN

const rain = document.getElementById("rain");

for (let i = 0; i < 90; i++) {
    const drop = document.createElement("span");

    drop.classList.add("drop");

    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDuration = (0.6 + Math.random() * 1.5) + "s";
    drop.style.animationDelay = Math.random() * 3 + "s";
    drop.style.opacity = Math.random() * 0.5;

    rain.appendChild(drop);
}


// LETTER TYPEWRITER

const text =
    "There are nights when words seem unnecessary. " +
    "Not because there is nothing to say, " +
    "but because some thoughts are better " +
    "left quietly resting somewhere between " +
    "a song and a memory.";

const typewriter = document.getElementById("typewriter");

let typeIndex = 0;

function writeText() {
    if (typeIndex < text.length) {
        typewriter.textContent += text.charAt(typeIndex);

        typeIndex++;

        setTimeout(writeText, 45);
    }
}

writeText();


// AUDIO PLAYER

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const playIcon = document.getElementById("play-icon");
const vinyl = document.getElementById("vinyl");
const progress = document.getElementById("progress");
const fill = document.getElementById("fill");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playerMessage = document.getElementById("playerMessage");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

playButton.addEventListener("click", async () => {

    if (audio.paused) {
        try {
            await audio.play();
        } catch (error) {
            playerMessage.textContent =
                "Place the MP3 file beside index.html.";
        }
    } else {
        audio.pause();
    }

});

audio.addEventListener("play", () => {
    playIcon.textContent = "Ⅱ";
    vinyl.classList.add("playing");
    playerMessage.textContent = "Let the night begin.";
});

audio.addEventListener("pause", () => {
    playIcon.textContent = "▶";
    vinyl.classList.remove("playing");
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {

    current.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
        fill.style.width =
            (audio.currentTime / audio.duration) * 100 + "%";
    }

    updateLyrics();
});

progress.addEventListener("click", (event) => {

    if (!audio.duration) return;

    const rect = progress.getBoundingClientRect();

    const percentage =
        (event.clientX - rect.left) / rect.width;

    audio.currentTime = percentage * audio.duration;

});

audio.addEventListener("ended", () => {
    playIcon.textContent = "▶";
    vinyl.classList.remove("playing");
});


// SYNCHRONIZED LYRICS
// Add the lyrics and timestamps below.
// Time is expressed in seconds.

const lyrics = [

    { time: 0, text: "I wanna be your vacuum cleaner" },
    { time: 4, text: "Breathing in your dust" },
    { time: 8, text: "I wanna be your Ford Cortina" },
    { time: 12, text: "I will never rust" }

    // ADD THE REST OF YOUR LYRICS HERE

];

const previousLyric = document.getElementById("lyric-previous");
const currentLyric = document.getElementById("lyric-current");
const nextLyric = document.getElementById("lyric-next");

let lastLyricIndex = -1;

function updateLyrics() {

    if (!lyrics.length) return;

    let activeIndex = -1;

    for (let i = 0; i < lyrics.length; i++) {

        if (audio.currentTime >= lyrics[i].time) {
            activeIndex = i;
        } else {
            break;
        }

    }

    if (activeIndex === -1) {

        previousLyric.textContent = "";
        currentLyric.textContent = "Press play to begin.";
        nextLyric.textContent = lyrics[0].text;

        return;
    }

    if (activeIndex === lastLyricIndex) return;

    lastLyricIndex = activeIndex;

    const previous = lyrics[activeIndex - 1];
    const currentLine = lyrics[activeIndex];
    const next = lyrics[activeIndex + 1];

    previousLyric.textContent =
        previous ? previous.text : "";

    currentLyric.textContent =
        currentLine.text;

    nextLyric.textContent =
        next ? next.text : "";

    currentLyric.classList.remove("lyric-enter");

    // Restart animation

    void currentLyric.offsetWidth;

    currentLyric.classList.add("lyric-enter");
}


// Reset lyrics when audio restarts

audio.addEventListener("seeked", () => {
    lastLyricIndex = -1;
    updateLyrics();
});


// ROOM / LAMP

const lightButton = document.getElementById("light");
const room = document.getElementById("room");

lightButton.addEventListener("click", () => {

    room.classList.toggle("lit");

    const isLit = room.classList.contains("lit");

    lightButton.textContent =
        isLit ? "TURN THE LIGHT OFF" : "TURN THE LIGHT ON";

});


// SECRET STAR

const star = document.getElementById("star");
const secret = document.getElementById("secret");

star.addEventListener("click", () => {

    secret.classList.toggle("show");

});


// SCROLL REVEALS

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});