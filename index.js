const cards = document.getElementById('cards')
const loader = document.getElementById('preloader')

const numeroMaximoDePersonagens = 671

generateRandomNumbersArray = () => {
  let randomNumbersArray = []

  for (let i = 0; i < 4; i++) {
    randomNumbersArray.push(Math.floor(Math.random() * numeroMaximoDePersonagens));
  }

  return randomNumbersArray.join()
}

getCharacters = async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/[${generateRandomNumbersArray()}]`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    }
  })

  const character = await response.json();

  character.forEach(character => {
    cards.innerHTML += `
    <div class="card">
      <img src="${character.image}" alt="${character.name}">
      <div class="card-content">
        <h3>${character.name}</h3>
        <span>${character.species}</span>
        <p class="status ${character.status}">${character.status}</p>
      </div>
    </div>
  `
  })

  setTimeout(() => {
    loader.style.display = 'none';
    cards.style.display = 'grid';
  }, 500)
}

window.onload = () => {
  getCharacters()
}
