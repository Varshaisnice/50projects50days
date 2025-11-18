const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);
generateJoke(); // Load first joke on page load

// USING ASYNC/AWAIT
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const res = await fetch('https://icanhazdadjoke.com', config);
  const data = await res.json();

  jokeEl.innerHTML = data.joke;

  // Clear any previous timeout (in case button is clicked quickly)
  if (window.laughTimeout) clearTimeout(window.laughTimeout);

  // Trigger laughing emojis after 2 seconds
  window.laughTimeout = setTimeout(() => {
    createLaughingEmojis();
  }, 2000);
}

// Function to create floating laughing emojis
function createLaughingEmojis() {
  const emojiCount = 15; // Number of 😂 to spawn

  for (let i = 0; i < emojiCount; i++) {
    const emoji = document.createElement('div');
    emoji.textContent = '😂';
    emoji.classList.add('laugh-emoji');

    // Random horizontal position
    const leftPos = Math.random() * 100;
    // Random animation duration (3–6 seconds)
    const duration = 3 + Math.random() * 3;
    // Random slight horizontal drift
    const drift = (Math.random() - 0.5) * 30;

    emoji.style.left = `${leftPos}vw`;
    emoji.style.animationDuration = `${duration}s`;
    emoji.style.setProperty('--drift', `${drift}px`);

    document.body.appendChild(emoji);

    // Remove emoji after animation ends
    emoji.addEventListener('animationend', () => {
      emoji.remove();
    });
  }
}
