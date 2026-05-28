# 🐫 حروف وكلمات | Arabic Word Builder HTML5 Educational Game

A gorgeous, highly polished, client-ready **HTML5 prototype** for an Arabic preschool spelling game designed for children aged **3–6**. 

Children can drag and drop colorful Arabic letter cards from their rack into the correct slots (following standard **Right-to-Left Arabic presentation**) to build simple everyday words. The prototype has a rich educational aesthetic, dynamic audio feedback, native Arabic voice pronunciations, and visual reward mechanics.

---

## 🌟 Key Features

* **Arabic Preschool Visual Style**: Warm pastel/rainbow color palettes, soft pillowy rounded edges, clean layout structures, and a cute winking baby camel mascot.
* **Full Responsive Design**: Fully responsive scaling that plays perfectly on mobile screens (smartphones), tablets (iPads), and desktop monitors.
* **Unified Drag & Drop Engine**: Uses advanced **Pointer Events** rather than standard HTML5 Drag & Drop. This delivers buttery smooth, lag-free 60 FPS performance on both mobile touchscreens and desktop mouse pointers.
* **Self-Contained Sound Synthesis**: Utilizes the **Web Audio API** to generate all interface sounds dynamically (Pop taps, Slide drags, Happy Success chimes, Low error boings, and Level Complete Fanfares). Works instantly without downloading external MP3 assets, eliminating network lag.
* **Native Arabic Pronunciations**: Integrates the **Web Speech API (`speechSynthesis`)** configured with native Saudi Arabic voice profiles (`ar-SA`). It reads out words at a slower preschool-friendly pace, strengthening spelling retention.
* **Visual Reinforcement**: Features colorful falling particle confetti explosions when children correctly slot matching letters.
* **Mocked Backend Integration**: Simulates standard client-required statistics: real-time scores, level tracker markers, accuracy rate calculators, and local sync states.

---

## 📂 Project Architecture

```directory
WordBuilderDemo/
├── index.html          # Main HTML5 UI Structure (Menu, Game Core, Success Modal, Victory Dashboard)
├── css/
│   └── style.css       # Layouts, 3D bubble-button mechanics, and keyframe micro-animations
├── js/
│   └── game.js         # Audio Synth, Text-To-Speech engine, Pointer Drag engine, and levels database
└── assets/             # AI-generated preschool vector illustrations
    ├── mascot.png      # Smiling baby camel companion
    ├── rabbit.png      # Word level 1: أَرْنَب (Rabbit)
    ├── house.png       # Word level 2: بَيْت (House)
    └── sun.png         # Word level 3: شَمْس (Sun)
```

---

## 🚀 How to Run the Game

No server, compilation, or compilation dependencies are required! You can launch and play the game in seconds using either of the following two options:

### Option A: Double-Click (Offline & Local)
1. Navigate to the project directory.
2. Double-click [index.html](file:///home/wanghao/Workspace/WordBuilderDemo/index.html) (or right-click and open it with Google Chrome, Safari, or Microsoft Edge).
3. Tap **إلعب الآن (Play Now)** to begin building words!

### Option B: Local HTTP Server (Recommended)
Since speech synthesis (Web Speech API) and voice loading are highly optimized inside server contexts, launching via a lightweight local server is recommended.
* **Node.js**:
  ```bash
  npx serve .
  ```
* **Python**:
  ```bash
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your web browser.

---

## 🎨 Interactive Gameplay Guide
1. **Start Screen**: Tap the large orange-yellow **إلعب الآن (Play Now!)** button. This action activates both the `AudioContext` synth and speech synthesizers inside standard modern browser permission frameworks.
2. **Spelling Words**: Drag letters from the rack into their respective slots. The slots flow **Right-to-Left (RTL)** natively, so spelling starts from the right and flows to the left.
3. **Audio Assistant**: Click **استمع إلى الكلمة (Listen to word)** at any time to hear a native Arabic speaker pronounce the target word.
4. **Mistakes & Accuracy**: Dropping letters into incorrect slots triggers a cartoon boing sound and returns the letter to the rack. Star achievements on level completion adjust based on your accuracy (0 mistakes = 3 stars, 1 mistake = 2 stars, 2+ mistakes = 1 star).
5. **Honor Board (End Game)**: Reaching the end of Level 3 unlocks the victory summary screen containing mock player analytics showing your total score, spelling accuracy, and local sync indicators.

---

## 🛠️ Tech Stack & Compatibility
* **Markup & Structure**: Semantic HTML5 (native RTL support via `dir="rtl"`).
* **Styling**: Pure, optimized Vanilla CSS3.
* **Scripting**: Modern, modular Vanilla ES6 Javascript.
* **Audio & Speech**: HTML5 Web Audio API & Web Speech API.
* **Device Compatibility**: Fully tested across Chrome, iOS Safari, Android Chrome, and Safari Desktop.
