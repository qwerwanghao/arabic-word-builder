/* ==========================================================================
   ARABIC WORD BUILDER - BILINGUAL GAME ENGINE LOGIC
   ========================================================================== */

// 1. Level Configurations (Pre-spelled everyday Arabic words for preschoolers)
const LEVELS = [
  {
    word: "أَرْنَب",
    english: "Rabbit",
    letters: ["أ", "ر", "ن", "ب"],
    pronunciation: "أَرْنَبْ",
    image: "assets/rabbit.png",
    spellingGuide: "أَ - رْ - نَ - بْ"
  },
  {
    word: "بَيْت",
    english: "House",
    letters: ["ب", "ي", "ت"],
    pronunciation: "بَيْتْ",
    image: "assets/house.png",
    spellingGuide: "بَ - يْ - تْ"
  },
  {
    word: "شَمْس",
    english: "Sun",
    letters: ["ش", "م", "س"],
    pronunciation: "شَمْسْ",
    image: "assets/sun.png",
    spellingGuide: "شَ - مْ - سْ"
  }
];

// 2. Bilingual Dictionary
const TRANSLATIONS = {
  en: {
    gameTitleMain: "Arabic Word Builder",
    gameTitleSub: "Letters & Words",
    mascotStart: "Hi friends! Let's build some fun words together! 👋🐫",
    playBtn: "PLAY NOW! 🎮",
    scoreLabel: "Score: ",
    pronounceBtn: "Listen to Word",
    deckTitle: "Drag the letters to their correct spots: ✨",
    rewardTitle3: "EXCELLENT! 🌟",
    rewardTitle2: "GREAT JOB! ✨",
    rewardTitle1: "WELL DONE! 👍",
    rewardSubtitle3: "You built a perfect word!",
    rewardSubtitle2: "You are so smart, keep it up!",
    rewardSubtitle1: "Great job, let's learn more!",
    bonusPoints: "Bonus Points: ",
    nextLevelBtn: "NEXT LEVEL ➔",
    victoryTitle: "CONGRATULATIONS, HERO! 🎉",
    victorySubtitle: "You have completed all the words successfully!",
    victoryMascot: "You are a Word Building Star! I'm so proud of you! 🌟🐫",
    statsTitle: "🎖️ HONOR ROLL (Player Stats)",
    statTotalScore: "Total Score",
    statAccuracy: "Spelling Accuracy",
    statReward: "Reward Unlocked",
    statBadgeName: "Letter Explorer 🌟",
    statSync: "Sync Status",
    statSyncVal: "✓ Saved Locally",
    replayBtn: "PLAY AGAIN! 🔄",
    backBtnTitle: "Back to Menu"
  },
  ar: {
    gameTitleMain: "حُرُوفٌ وَكَلِمَاتٌ",
    gameTitleSub: "Arabic Word Builder",
    mascotStart: "أَهْلًا بِكُمْ يَا أَصْدِقَائِي! هَيَّا نَبْنِي كَلِمَاتِنَا المُمْتِعَةَ! 👋🐫",
    playBtn: "إِلْعَبْ الآنَ! 🎮",
    scoreLabel: "النقاط: ",
    pronounceBtn: "اِسْتَمِعْ إِلَى الكَلِمَةِ",
    deckTitle: "اِسْحَبِ الحُرُوفَ إِلَى مَكَانِهَا الصَّحِيحِ: ✨",
    rewardTitle3: "مُمْتَازٌ! 🌟",
    rewardTitle2: "رَائِعٌ! ✨",
    rewardTitle1: "أَحْسَنْتَ! 👍",
    rewardSubtitle3: "لَقَدْ بَنَيْتَ الكَلِمَةَ بِشَكْلٍ مِثَالِيٍّ!",
    rewardSubtitle2: "أَنْتَ ذَكِيٌّ جِدًّا، اِسْتَمِرَّ!",
    rewardSubtitle1: "عَمَلٌ رَائِعٌ، هَيَّا نَتَعَلَّمُ المَزِيدَ!",
    bonusPoints: "النقاط المكتسبة: ",
    nextLevelBtn: "المُسْتَوَى التَّالِي ➔",
    victoryTitle: "تَهَانِينَا يَا بَطَلُ! 🎉",
    victorySubtitle: "لَقَدْ أَكْمَلْتَ جَمِيعَ الكَلِمَاتِ بِنَجَاحٍ!",
    victoryMascot: "أَنْتَ نَجْمٌ فِي بِنَاءِ الكَلِمَاتِ! أَنَا فَخُورٌ بِكَ جِدًّا! 🌟🐫",
    statsTitle: "🎖️ لَوْحَةُ الشَّرَفِ (Player Stats)",
    statTotalScore: "النِّقَاطُ الكُلِّيَّةُ",
    statAccuracy: "نِسْبَةُ الدِّقَّةِ",
    statReward: "وِصَامُ التَّمَيُّزِ",
    statBadgeName: "مُكْتَشِفُ الحُرُوفِ 🌟",
    statSync: "حَالَةُ المزامنة",
    statSyncVal: "✓ تَمَّ الحِفْظُ مَحَلِّيًّا",
    replayBtn: "إِلْعَبْ مَرَّةً أُخْرَى! 🔄",
    backBtnTitle: "الرجوع للقائمة"
  }
};

// 3. Global Game State
const state = {
  currentLevelIndex: 0,
  score: 0,
  levelMistakes: 0,
  totalCorrectDrops: 0,
  totalAttempts: 0,
  soundMuted: false,
  language: 'en', // Default language is English
  activeCard: null,
  dragStartX: 0,
  dragStartY: 0,
  cardStartX: 0,
  cardStartY: 0,
  audioCtx: null,
  activeWordAudio: null // Prevent audio overlapping
};

// 4. SOUND SYNTHESIZER (Web Audio API)
// Synthesizes custom cartoon feedback sounds so the app runs offline / serverless instantly.
function initAudioContext() {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

function playSound(type) {
  if (state.soundMuted) return;
  initAudioContext();
  
  const ctx = state.audioCtx;
  const now = ctx.currentTime;
  
  switch(type) {
    case 'pop': // Bubble click / Select
      {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        
        osc.start(now);
        osc.stop(now + 0.08);
      }
      break;
      
    case 'slide': // Drag starts
      {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        
        osc.start(now);
        osc.stop(now + 0.12);
      }
      break;

    case 'success': // Letter snapped correct
      {
        // Rising sweet major notes
        const notes = [523.25, 659.25, 784.00, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.07));
          
          gain.gain.setValueAtTime(0.12, now + (idx * 0.07));
          gain.gain.exponentialRampToValueAtTime(0.01, now + (idx * 0.07) + 0.18);
          
          osc.start(now + (idx * 0.07));
          osc.stop(now + (idx * 0.07) + 0.18);
        });
      }
      break;
      
    case 'error': // Wrong letter / Drop error
      {
        // Low cartoon sliding "boing" down
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.28);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        
        osc.disconnect(gain);
        osc.connect(filter);
        filter.connect(gain);
        
        osc.start(now);
        osc.stop(now + 0.28);
      }
      break;
      
    case 'victory': // Triumphant Level Complete Fanfare
      {
        const chord = [261.63, 329.63, 392.00, 523.25];
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.6);
          
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
          
          osc.start(now);
          osc.stop(now + 0.6);
        });
        
        setTimeout(() => {
          if (state.soundMuted) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1046.50, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.6);
          
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.6);
        }, 320);
      }
      break;
  }
}

// 5. BILINGUAL WORD AUDIO PLAYBACK (Premium local MP3 assets)
// Plays standard pre-recorded native word voiceovers based on the active language mode.
// 100% robust, works offline, and guarantees high-quality audio on all PCs & mobile devices.
function speakCurrentWord() {
  if (state.soundMuted) return;
  
  // High-fidelity pre-recorded audio mapping for our preschool words
  const wordAudioFiles = {
    0: { en: "assets/rabbit_en.mp3", ar: "assets/rabbit_ar.mp3" },
    1: { en: "assets/house_en.mp3", ar: "assets/house_ar.mp3" },
    2: { en: "assets/sun_en.mp3", ar: "assets/sun_ar.mp3" }
  };
  
  const levelAudio = wordAudioFiles[state.currentLevelIndex];
  if (levelAudio) {
    const audioPath = state.language === 'en' ? levelAudio.en : levelAudio.ar;
    
    // Stop any currently playing word audio to prevent overlapping sounds
    if (state.activeWordAudio) {
      state.activeWordAudio.pause();
      state.activeWordAudio.currentTime = 0;
    }
    
    // Create new audio instance and cache it
    const audio = new Audio(audioPath);
    state.activeWordAudio = audio;
    
    audio.volume = 0.95;
    
    // Play with standard promise catch to prevent console errors if browsers delay interaction
    audio.play().catch(err => {
      console.warn("Local audio playback triggered before user interaction gesture:", err);
    });
  }
}

// ==========================================================================
// GAME CORE LOGIC & TRANSLATION PIPELINE
// ==========================================================================

// Apply selected language translations dynamically across elements
function applyLanguage() {
  const lang = state.language;
  const t = TRANSLATIONS[lang];
  
  // Set UI Layout direction (Arabic is RTL, English LTR)
  const container = document.getElementById("game-container");
  if (lang === 'ar') {
    container.setAttribute("dir", "rtl");
  } else {
    container.setAttribute("dir", "ltr");
  }

  // Translate static UI components containing [data-i18n]
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      const textSpan = el.querySelector(".btn-text") || el.querySelector(".speaker-text");
      if (textSpan) {
        textSpan.innerText = t[key];
      } else {
        el.innerText = t[key];
      }
    }
  });

  // Handle i18n title tooltips
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.dataset.i18nTitle;
    if (t[key]) {
      el.setAttribute("aria-label", t[key]);
    }
  });

  // Also dynamic deck titles if level is running
  const deckTitle = document.querySelector(".deck-title");
  if (deckTitle) {
    deckTitle.innerText = t.deckTitle;
  }
}

// Initialize Game & Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  setupUIEventListeners();
  createProgressTracker();
  applyLanguage(); // Render starting default layout in English LTR
  updateHUD();
});

// Event Triggers for Screen Transitions & Interactive Buttons
function setupUIEventListeners() {
  // Start Screen -> Play Game
  document.getElementById("btn-play").addEventListener("click", () => {
    playSound('pop');
    initAudioContext();
    transitionToScreen("screen-gameplay");
    startLevel(0);
  });

  // Back Home
  document.getElementById("btn-back").addEventListener("click", () => {
    playSound('pop');
    transitionToScreen("screen-start");
  });

  // Sound Toggle (Syncs across all sound buttons on all screens)
  document.querySelectorAll(".btn-sound-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.soundMuted = !state.soundMuted;
      document.querySelectorAll(".btn-sound-toggle").forEach(sBtn => {
        sBtn.innerHTML = state.soundMuted ? '<span class="icon">🔇</span>' : '<span class="icon">🔊</span>';
      });
      playSound('pop');
    });
  });

  // Language Switch Toggle (Syncs across all language buttons on all screens)
  document.querySelectorAll(".btn-lang-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.language = state.language === 'en' ? 'ar' : 'en';
      applyLanguage();
      playSound('pop');
      
      // If we are currently inside the gameplay screen, re-render the spelling board instantly!
      const gameplayScreen = document.getElementById("screen-gameplay");
      if (gameplayScreen && gameplayScreen.classList.contains("active")) {
        startLevel(state.currentLevelIndex);
      }
    });
  });

  // Pronounce Word Audio Button (Bilingual native support)
  document.getElementById("btn-pronounce").addEventListener("click", () => {
    playSound('pop');
    speakCurrentWord();
    
    const btn = document.getElementById("btn-pronounce");
    btn.classList.add("sound-playing");
    setTimeout(() => btn.classList.remove("sound-playing"), 800);
  });

  // Success Modal -> Next Level
  document.getElementById("btn-next-level").addEventListener("click", () => {
    playSound('pop');
    document.getElementById("modal-success").classList.remove("active");
    
    const nextIndex = state.currentLevelIndex + 1;
    if (nextIndex < LEVELS.length) {
      startLevel(nextIndex);
    } else {
      showVictoryScreen();
    }
  });

  // Victory Screen -> Play Again
  document.getElementById("btn-restart").addEventListener("click", () => {
    playSound('pop');
    state.score = 0;
    state.totalCorrectDrops = 0;
    state.totalAttempts = 0;
    updateHUD();
    createProgressTracker();
    transitionToScreen("screen-start");
  });

  // Global Pointer Events for unified Mobile Touch & Desktop Mouse drags
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
}

// Create the Level Step Tracker dots inside Header
function createProgressTracker() {
  const tracker = document.getElementById("level-progress-tracker");
  tracker.innerHTML = "";
  
  LEVELS.forEach((level, idx) => {
    const dot = document.createElement("div");
    dot.className = "progress-dot";
    dot.innerText = idx + 1;
    dot.id = `prog-dot-${idx}`;
    tracker.appendChild(dot);
  });
}

// Update Scores & Visual HUD details
function updateHUD() {
  document.getElementById("score-value").innerText = state.score;
}

// Centralized Screen transition helper
function transitionToScreen(screenId) {
  const screens = document.querySelectorAll(".game-screen");
  screens.forEach(screen => {
    screen.classList.remove("active");
  });
  
  const target = document.getElementById(screenId);
  target.classList.add("active");
}

// Start / Setup a Word Level
function startLevel(levelIndex) {
  state.currentLevelIndex = levelIndex;
  state.levelMistakes = 0;
  
  const levelData = LEVELS[levelIndex];
  
  // Highlight Level Progress Bar
  LEVELS.forEach((_, idx) => {
    const dot = document.getElementById(`prog-dot-${idx}`);
    if (dot) {
      dot.className = "progress-dot";
      if (idx < levelIndex) dot.classList.add("completed");
      if (idx === levelIndex) dot.classList.add("active");
    }
  });

  // Set Word Illustration
  const imgEl = document.getElementById("word-image");
  imgEl.src = levelData.image;
  imgEl.alt = levelData.english;
  
  // Determine target spelling letters and guides dynamically based on current language
  let lettersToUse = [];
  let spellingGuideText = "";
  
  if (state.language === 'en') {
    // English mode: spells RABBIT (Left-to-Right layout)
    const upperEnglish = levelData.english.toUpperCase();
    lettersToUse = upperEnglish.split('');
    spellingGuideText = lettersToUse.join(' - ');
  } else {
    // Arabic mode: spells أَرْنَبْ (Right-to-Left layout)
    lettersToUse = levelData.letters;
    spellingGuideText = levelData.spellingGuide;
  }
  
  // Set guides
  document.getElementById("word-pronounce-spelling").innerText = spellingGuideText;
  
  // Speak the word automatically at start of level to welcome the child (Bilingual)
  setTimeout(() => {
    speakCurrentWord();
  }, 600);

  // Generate Slots (Flow handles RTL/LTR dynamically based on container dir!)
  const slotsContainer = document.getElementById("word-slots");
  slotsContainer.innerHTML = "";
  
  lettersToUse.forEach((char, idx) => {
    const slot = document.createElement("div");
    slot.className = "letter-slot";
    slot.dataset.letter = char;
    slot.dataset.index = idx;
    
    const watermark = document.createElement("span");
    watermark.className = "slot-watermark";
    watermark.innerText = char;
    slot.appendChild(watermark);
    
    slotsContainer.appendChild(slot);
  });

  // Generate Letters Deck & Shuffle
  const letterRack = document.getElementById("letter-rack");
  letterRack.innerHTML = "";
  
  // Shuffle cards
  let shuffledLetters = [...lettersToUse]
    .map((char, index) => ({ char, originalIndex: index }))
    .sort(() => Math.random() - 0.5);
  
  // Verify it shuffled
  let checkMatch = shuffledLetters.every((item, i) => item.char === lettersToUse[i]);
  if (checkMatch && lettersToUse.length > 2) {
    shuffledLetters.reverse();
  }

  shuffledLetters.forEach((letterObj, idx) => {
    const card = document.createElement("div");
    card.className = `letter-card card-color-${idx % 5}`;
    card.innerText = letterObj.char;
    card.dataset.letter = letterObj.char;
    card.dataset.originalIndex = letterObj.originalIndex;
    
    // Attach Pointerdown handler to start dragging
    card.addEventListener("pointerdown", handlePointerDown);
    
    letterRack.appendChild(card);
  });

  // Render text translations for static titles on this stage
  const deckTitle = document.querySelector(".deck-title");
  if (deckTitle) {
    deckTitle.innerText = TRANSLATIONS[state.language].deckTitle;
  }
}

// ==========================================================================
// CUSTOM BROWSER DRAG & DROP ENGINE (POINTER EVENTS)
// ==========================================================================

function handlePointerDown(e) {
  e.preventDefault();
  
  // Ignore clicks if the card is already nested and placed inside a slot
  if (e.target.closest('.letter-slot')) return;
  
  // Safe element retrieval
  const card = e.target.closest('.letter-card');
  if (!card) return;
  
  // Register Dragging State
  state.activeCard = card;
  state.dragStartX = e.clientX;
  state.dragStartY = e.clientY;
  
  // Save card starting positions relative to its parent deck spot
  const transform = window.getComputedStyle(card).transform;
  if (transform !== 'none') {
    const matrixValues = transform.split('(')[1].split(')')[0].split(',');
    state.cardStartX = parseFloat(matrixValues[4]);
    state.cardStartY = parseFloat(matrixValues[5]);
  } else {
    state.cardStartX = 0;
    state.cardStartY = 0;
  }
  
  card.classList.add("dragging");
  
  // Apply visual feedback: Instantly scale and rotate it!
  card.style.transform = `translate3d(${state.cardStartX}px, ${state.cardStartY}px, 0px) scale(1.12) rotate(4deg)`;
  playSound('slide');
}

function handlePointerMove(e) {
  if (!state.activeCard) return;
  
  const card = state.activeCard;
  
  // Calculate relative movement delta
  const deltaX = e.clientX - state.dragStartX;
  const deltaY = e.clientY - state.dragStartY;
  
  const newX = state.cardStartX + deltaX;
  const newY = state.cardStartY + deltaY;
  
  // Move card smoothly via GPU Transform translations, keeping the responsive scales active!
  card.style.transform = `translate3d(${newX}px, ${newY}px, 0px) scale(1.12) rotate(4deg)`;
  
  // Detect Overlap Collisions with Slots
  const cardRect = card.getBoundingClientRect();
  const slots = document.querySelectorAll(".letter-slot:not(.filled)");
  
  slots.forEach(slot => {
    const slotRect = slot.getBoundingClientRect();
    
    // Check intersection box boundary overlaps
    const isOverlapping = !(
      cardRect.right < slotRect.left ||
      cardRect.left > slotRect.right ||
      cardRect.bottom < slotRect.top ||
      cardRect.top > slotRect.bottom
    );
    
    if (isOverlapping) {
      slot.classList.add("drag-over");
    } else {
      slot.classList.remove("drag-over");
    }
  });
}

function handlePointerUp(e) {
  if (!state.activeCard) return;
  
  const card = state.activeCard;
  card.classList.remove("dragging");
  
  // Find current active overlapping slot
  const activeSlot = document.querySelector(".letter-slot.drag-over");
  
  if (activeSlot) {
    activeSlot.classList.remove("drag-over");
    
    const cardLetter = card.dataset.letter;
    const slotLetter = activeSlot.dataset.letter;
    
    // Match letter checks!
    if (cardLetter === slotLetter) {
      // 1. Success! Lock letter into slot
      activeSlot.classList.add("filled");
      card.classList.add("placed-success");
      
      // Detach dragging handlers
      card.removeEventListener("pointerdown", handlePointerDown);
      
      // Reset card styling to sit perfectly centered inside slot container
      card.style.transform = "none";
      card.style.left = "-4px";
      card.style.top = "-4px";
      card.style.position = "absolute";
      
      activeSlot.appendChild(card);
      
      // Update statistics
      state.score += 10;
      state.totalCorrectDrops += 1;
      state.totalAttempts += 1;
      updateHUD();
      
      playSound('success');
      
      // Spawn happy celebratory confetti around the matched slot coordinates
      const slotRect = activeSlot.getBoundingClientRect();
      const containerRect = document.getElementById("game-container").getBoundingClientRect();
      const relativeX = (slotRect.left + slotRect.width / 2) - containerRect.left;
      const relativeY = (slotRect.top + slotRect.height / 2) - containerRect.top;
      spawnConfetti(relativeX, relativeY);
      
      // Verify level completeness
      checkLevelCompletion();
      
    } else {
      // 2. Incorrect Drop - Letter mismatch!
      state.levelMistakes += 1;
      state.totalAttempts += 1;
      playSound('error');
      
      // Animate card bouncing back to its rack
      card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      card.style.transform = "translate3d(0px, 0px, 0px)";
      
      setTimeout(() => {
        card.style.transition = "";
      }, 400);
    }
  } else {
    // 3. Dropped in open space (Not over any slot)
    // Silently slide card back to its starting place
    card.style.transition = "transform 0.3s ease-out";
    card.style.transform = "translate3d(0px, 0px, 0px)";
    setTimeout(() => {
      card.style.transition = "";
    }, 300);
  }
  
  state.activeCard = null;
}

// Check if all letters in current level are completed
function checkLevelCompletion() {
  const totalSlots = document.querySelectorAll(".letter-slot").length;
  const filledSlots = document.querySelectorAll(".letter-slot.filled").length;
  
  if (totalSlots === filledSlots) {
    setTimeout(() => {
      triggerLevelVictory();
    }, 500);
  }
}

// Level Victory Presentation & Bonus Awarding
function triggerLevelVictory() {
  playSound('victory');
  
  // Calculate star ratings based on spelling mistakes
  let stars = 3;
  if (state.levelMistakes === 1) stars = 2;
  else if (state.levelMistakes > 1) stars = 1;
  
  // Glow Stars
  document.getElementById("reward-star-1").className = "star-reward star-gray";
  document.getElementById("reward-star-2").className = "star-reward star-gray";
  document.getElementById("reward-star-3").className = "star-reward star-gray";
  
  setTimeout(() => {
    if (stars >= 1) document.getElementById("reward-star-1").classList.add("star-gold");
  }, 200);
  setTimeout(() => {
    if (stars >= 2) document.getElementById("reward-star-2").classList.add("star-gold");
  }, 450);
  setTimeout(() => {
    if (stars === 3) document.getElementById("reward-star-3").classList.add("star-gold");
  }, 700);

  // Bonus Calculation
  const bonus = stars * 20;
  state.score += bonus;
  updateHUD();
  
  // Setup dynamic compliment translations
  const lang = state.language;
  const t = TRANSLATIONS[lang];
  
  const titles = [t.rewardTitle3, t.rewardTitle2, t.rewardTitle1];
  const subtitles = [t.rewardSubtitle3, t.rewardSubtitle2, t.rewardSubtitle1];
  
  const textIdx = 3 - stars; 
  document.getElementById("reward-title").innerText = titles[textIdx];
  document.getElementById("reward-subtitle").innerText = subtitles[textIdx];
  
  // Render bonus text dynamically
  document.getElementById("bonus-points-label").innerHTML = `${t.bonusPoints} <span id="bonus-points" class="bonus-value">+${bonus}</span>`;
  
  // Active Overlay Modal
  document.getElementById("modal-success").classList.add("active");
  
  // Speak the completed word one more time to reinforce auditory recall (Bilingual)
  setTimeout(() => {
    speakCurrentWord();
  }, 400);
}

// Show Final Victory Screen
function showVictoryScreen() {
  document.getElementById("final-score").innerText = state.score;
  
  // Accuracy percentage calculations
  const acc = state.totalAttempts > 0 
    ? Math.round((state.totalCorrectDrops / state.totalAttempts) * 100) 
    : 100;
  document.getElementById("final-accuracy").innerText = `${acc}%`;
  
  transitionToScreen("screen-victory");
}

// ==========================================================================
// CONFETTI EFFECT SYSTEM
// ==========================================================================
function spawnConfetti(x, y) {
  const container = document.getElementById("game-container");
  const colors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-pink)",
    "var(--color-blue)",
    "var(--color-yellow)",
    "var(--color-green)"
  ];
  
  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti";
    
    const size = Math.random() * 8 + 6; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance + 100; 
    
    const rotate = Math.random() * 360;
    
    particle.style.setProperty('--tx', `${destX}px`);
    particle.style.setProperty('--ty', `${destY}px`);
    particle.style.setProperty('--rot', `${rotate}deg`);
    
    particle.style.animation = "confettiBurst 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards";
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1200);
  }
}

// Inject confetti keyframe dynamically
const style = document.createElement('style');
style.innerHTML = `
  @keyframes confettiBurst {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate3d(var(--tx), var(--ty), 0) scale(0.3) rotate(var(--rot));
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
