const animalButtons = document.querySelectorAll('.animal-button');
const messageDiv = document.getElementById('message');
const hintDiv = document.getElementById('hint');
const scoreDiv = document.getElementById('score');
const animalSounds = document.querySelectorAll('audio');

let score = 0;

function playAnimalSound(event) {
    const keyCode = event.target.dataset.key;
    const animalSound = document.querySelector(`audio[data-key="${keyCode}"]`);
    const animal = event.target.dataset.animal;
    const imagePath = `images/${animal.toLowerCase()}.png`;

    const animalImage = new Image();
    animalImage.src = imagePath;
    animalImage.onload = () => {
        messageDiv.innerHTML = `Click on the button or press '${event.key}' to play the sound<br>${animal}`;
        messageDiv.appendChild(animalImage);
        animalSound.currentTime = 0;
        animalSound.play();

        // Display hint after a delay
        setTimeout(() => {
            showHint(animal);
        }, 2000);
    };
}

function showHint(animal) {
    // Provide hints based on animal
    let hint = '';
    switch (animal.toLowerCase()) {
        case 'cat':
            hint = 'Hint: Cats are known for their agility and are popular pets.';
            break;
        case 'cow':
            hint = 'Hint: Cows are domesticated animals often found on farms.';
            break;
        case 'dog':
            hint = 'Hint: Dogs are loyal companions and come in various breeds.';
            break;
        case 'elephant':
            hint = 'Hint: Elephants are the world\'s largest land animals and are known for their trunks.';
            break;
        case 'horse':
            hint = 'Hint: Horses are strong and fast animals used for riding and racing.';
            break;
        case 'tiger':
            hint = 'Hint: Tigers are large wild cats known for their distinctive orange fur with black stripes.';
            break;
    }

    hintDiv.textContent = hint;
}

animalButtons.forEach(button => {
    button.addEventListener('click', playAnimalSound);
});

window.addEventListener('keydown', function (event) {
    const animalButton = document.querySelector(`.animal-button[data-key="${event.keyCode}"]`);
    if (animalButton) {
        animalButton.click();
    }
});

// Update score and reset hint after each correct answer
animalSounds.forEach(sound => {
    sound.addEventListener('ended', function () {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        hintDiv.textContent = '';
    });
});
