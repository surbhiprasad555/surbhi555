const fs = require('fs');
const path = require('path');

const MESSAGES = {
  "1cat": "You look awesome today.",
  "2cat": "We came as a pair. You’re still the cutest one here.",
  "3cat": "Tiny tiger, big main-character energy.",
  "4cat": "Excuse me… are you always this adorable?",
  "5cat": "I’m mysterious. You’re adorable. Fair trade.",
  "6cat": "I have important news: you’re doing great.",
  "7cat": "Stretch. Breathe. Pretend you have your life together.",
  "8cat": "Shhh… even dreams need a little company.",
  "9cat": "I saw nothing. I know nothing. Carry on.",
  "10cat": "Breaking news: you are ridiculously cute.",
  "11cat": "We discussed it. You’re officially our favorite.",
  "12cat": "A little softness for your little corner of the world.",
  "13cat": "You have the face of someone who deserves a tiny adventure.",
  "14cat": "Keep going. Your story is getting prettier.",
  "15cat": "Don’t worry. I’m silently judging everyone except you.",
  "16cat": "Small cat. Serious business. You’re wonderful.",
  "1flower": "You’re blooming, even if you don’t notice it yet.",
  "2flower": "Turn toward the light. Or the snacks. Both work.",
  "3flower": "Somewhere between chaos and calm, you found yourself.",
  "1star": "Make a wish. I’ll pretend I’m not listening.",
  "2star": "You were never meant to dim yourself.",
  "bow": "A little ribbon for the beautiful mess that is life.",
  "1arrow": "pssst… look over here 👀",
  "2arrow": "you missed something cute →",
  "3arrow": "follow me, I know a secret",
  "4arrow": "this way, little wanderer",
  "5arrow": "← probably important. probably."
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Ensure import is present if we make replacements
  const importStatement = "import InteractiveSticker from './InteractiveSticker';\n";
  const appImport = "import InteractiveSticker from './components/InteractiveSticker';\n";

  // Match <img ... src="/stickers/... " ... /> spanning multiple lines
  const regex = /<img\s+[^>]*src=["']\/stickers\/([a-zA-Z0-9]+)(?:-removebg-preview)?\.svg["'][^>]*>/g;
  
  let match;
  let replaced = false;
  
  content = content.replace(regex, (fullMatch, id) => {
    if (MESSAGES[id]) {
      replaced = true;
      let newTag = fullMatch.replace(/^<img\s+/, '<InteractiveSticker\n  ');
      
      // Extract properties safely or leave them as they are
      // Just change tag name and inject message prop
      // Since <InteractiveSticker /> accepts the same props as <img /> + message
      newTag = `<InteractiveSticker message="${MESSAGES[id]}" ${fullMatch.substring(4)}`;
      return newTag;
    }
    return fullMatch;
  });

  if (replaced) {
    if (filePath.includes('App.jsx') && !content.includes('InteractiveSticker')) {
      content = appImport + content;
    } else if (filePath.includes('AchievementFolder.jsx') && !content.includes('InteractiveSticker')) {
      content = importStatement + content;
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced in ${filePath}`);
  }
}

processFile(path.join(__dirname, 'src', 'App.jsx'));
processFile(path.join(__dirname, 'src', 'components', 'AchievementFolder.jsx'));

