const board = document.querySelector(".board");
const searchInput = document.querySelector("#search");

fetch("https://rickandmortyapi.com/api/character")
  .then((res) => res.json())
  .then((data) => buildCharacters(data.results));

function buildSingleCharacter(character) {
  let bgClass = "green";

  if (character.status === "unknown") {
    bgClass = "yellow";
  } else if (character.status === "Dead") {
    bgClass = "red";
  }

  const template = `
  <div class="flex">
    <img
        height="280" 
        src=${character.image} 
        alt=""
    />
    <div class="info">
      <h3>${character.name}</h3> 
      <div class="status"><div class="circle ${bgClass}"></div>${character.status}</div>
      <ul>
          <li>Gender: <strong>${character.gender}</strong></li>
          <li>Species: <strong>${character.species}</strong></li>
          <li>Origin: <strong>${character.origin.name}</strong></li>
          <li>Location: <strong>${character.location.name}</strong></li>
          <li>Num of episodes: <strong>${character.episode.length}</strong></li>
      </ul>
    </div>
  </div>
  `;

  const characterDiv = document.createElement("div");
  characterDiv.classList.add("character");
  characterDiv.innerHTML = template;
  board.appendChild(characterDiv);
}

function buildCharacters(data) {
  data.forEach((character) => {
    buildSingleCharacter(character);
  });
}

function searchCharacter() {
  board.innerHTML = ``;

  if (searchInput.value === "") {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => buildCharacters(data.results));

    return;
  }

  const id = searchInput.value;

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => buildSingleCharacter(data));
}

searchInput.addEventListener("input", searchCharacter);
