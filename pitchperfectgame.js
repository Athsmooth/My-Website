// 1. Initialize the Piano Sampler
const sampler = new Tone.Sampler({
    urls: {
        "A0": "A0.mp3", "C1": "C1.mp3", "D#1": "Ds1.mp3", "A1": "A1.mp3",
        "C2": "C2.mp3", "D#2": "Ds2.mp3", "A2": "A2.mp3", "C3": "C3.mp3",
        "D#3": "Ds3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "D#4": "Ds4.mp3",
        "A4": "A4.mp3", "C5": "C5.mp3", "D#5": "Ds5.mp3", "A5": "A5.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

// 2. Generate all possible notes (C3 to B5)
const BASE_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = [3, 4, 5];
const ALL_NOTES = [];

OCTAVES.forEach(octave => {
    BASE_NOTES.forEach(note => {
        ALL_NOTES.push(note + octave);
    });
});

let currentCorrectNote = "";
let totalGuesses = 0;
let correctGuesses = 0;

// Use DOMContentLoaded to ensure HTML is fully parsed
document.addEventListener("DOMContentLoaded", () => {
    const newToneBtn = document.getElementById('new-tone-btn');
    const filterBtns = document.querySelectorAll('.filter-btn'); // Matches your HTML
    const pianoKeys = document.querySelectorAll('.key');        // Matches your HTML
    const statusDisplay = document.getElementById('status-message');
    const accuracyDisplay = document.getElementById('accuracy');
    const ratioDisplay = document.getElementById('score-ratio');

    const playPiano = (note) => {
        if (note && sampler.loaded) {
            sampler.triggerAttackRelease(note, "2n");
        }
    };

    const updateAccuracy = () => {
        if (ratioDisplay) ratioDisplay.innerText = `${correctGuesses}/${totalGuesses}`;
        if (totalGuesses === 0) return;
        const acc = Math.round((correctGuesses / totalGuesses) * 100);
        if (accuracyDisplay) accuracyDisplay.innerText = acc;
        
        if (acc < 50) accuracyDisplay.style.color = "#f44336";
        else if (acc < 80) accuracyDisplay.style.color = "#ff9800";
        else accuracyDisplay.style.color = "#4caf50";
    };

    const startNewRound = () => {
        // Find which notes are active (buttons with the class 'active')
        const activeNoteNames = Array.from(filterBtns)
            .filter(btn => btn.classList.contains('active'))
            .map(btn => btn.getAttribute('data-note'));

        if (activeNoteNames.length === 0) {
            statusDisplay.innerText = "Select at least one note!";
            statusDisplay.style.color = "#ff9800";
            return;
        }

        const allowedNotes = ALL_NOTES.filter(note => {
            const nameOnly = note.replace(/[0-9]/g, '');
            return activeNoteNames.includes(nameOnly);
        });

        currentCorrectNote = allowedNotes[Math.floor(Math.random() * allowedNotes.length)];
        
        newToneBtn.innerText = "Repeat Tone";
        statusDisplay.innerText = "Listen...";
        statusDisplay.style.color = "white";
        
        playPiano(currentCorrectNote);
    };

    // --- FILTER BUTTON LOGIC ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.classList.toggle('active');
            
            // Logic to handle visual feedback if CSS isn't handling it
            if (btn.classList.contains('active')) {
                btn.style.opacity = "1";
            } else {
                btn.style.opacity = "0.3";
            }
        });
    });

    // --- MAIN ACTION BUTTON ---
    newToneBtn.addEventListener('click', async () => {
        await Tone.start();
        if (newToneBtn.innerText === "New Tone" || currentCorrectNote === "") {
            startNewRound();
        } else {
            playPiano(currentCorrectNote);
        }
    });

    // --- PIANO KEY GUESSING ---
    pianoKeys.forEach(key => {
        key.addEventListener('click', async () => {
            await Tone.start();
            const guessedNote = key.getAttribute('data-note');
            playPiano(guessedNote);

            if (!currentCorrectNote) return;

            totalGuesses++;

            const guessedName = guessedNote.replace(/[0-9]/g, '');
            const correctName = currentCorrectNote.replace(/[0-9]/g, '');

            if (guessedName === correctName) {
                correctGuesses++;
                updateAccuracy();
                
                statusDisplay.innerText = `Correct! (${correctName})`;
                statusDisplay.style.color = "#4caf50";
                key.style.backgroundColor = "#4caf50"; 
                currentCorrectNote = ""; 

                setTimeout(() => {
                    key.style.backgroundColor = ""; 
                    startNewRound();
                }, 1200);
            } else {
                updateAccuracy();
                statusDisplay.innerText = "Incorrect!";
                statusDisplay.style.color = "#f44336";
                const originalColor = key.style.backgroundColor;
                key.style.backgroundColor = "#f44336"; 
                setTimeout(() => { key.style.backgroundColor = originalColor; }, 300);
            }
        });
    });
});