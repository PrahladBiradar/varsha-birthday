export interface Memory {
  photo?: string;
  caption: string;
}

export const CONFIG = {
  name: "Varsha",
  
  songs: [
    { title: "Perfect", artist: "Ed Sheeran", file: "song1.mp3" },
    { title: "A Thousand Years", artist: "Christina Perri", file: "song2.mp3" },
    { title: "Lover", artist: "Taylor Swift", file: "song3.mp3" },
  ],
  
  memories: [
    { caption: "The day that always makes me smile." },
    { caption: "One of my favorite memories with you." },
    { caption: "You looked the happiest here." },
    { caption: "A moment I never want to forget." },
    { caption: "This one always makes me laugh." },
  ] as Memory[],
  // To add a photo: { photo: "/images/photo1.jpg", caption: "Your caption" }
  // Place your photos in the public/images/ folder
  
  heartMessages: [
    "You deserve every good thing life has to offer. 🌸",
    "Never stop smiling — your smile lights up everything. ✨",
    "Today is entirely yours. Celebrate yourself.",
    "I hope this year brings you more happiness than you can hold. 🌷",
    "You are so deeply loved. Never forget that. 💕",
    "The world is better because you're in it. 🌟",
    "Wishing you a year full of magic and beautiful surprises.",
    "You are enough, always. Happy birthday. ❤️",
  ],
  
  letter: `Dear Varsha,

Today is your day — and I wanted to make sure you felt just how special you truly are.

There are people in this world who make everything brighter just by being in it. You are one of them. The way you carry yourself, the warmth you bring to every room, the way you make people feel seen — it's something rare and beautiful.

I hope this birthday brings you everything you've been quietly wishing for. I hope you laugh until your cheeks hurt, feel completely loved, and go to sleep tonight knowing how extraordinary you are.

This year is going to be something wonderful. I can feel it.

With love, always. 💕`,

  finalMessage: "You deserve all the happiness in the world. Happy Birthday, Varsha. ❤️",
};
