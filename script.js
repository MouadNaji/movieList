("use strict");
//ændre indholdet i form heroname
const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
  const data2 = {
    title: `${form.elements.title.value}`,
    genre: `${form.elements.genre.value}`,
    description$: `${form.elements.description.value}`
  };
  addHeroToTheDom(data2);
  const postData = JSON.stringify(data2);
  fetch("https://movies-cb29.restdb.io/rest/movies?q={}&sort=heroname", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d9108cc1ce70f637985514f	",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //addHeroToTheDom(data);
    });
});
form.elements.title.addEventListener("keyup", e => {
  console.log(e.key);
});

function get() {
  fetch("https://movies-cb29.restdb.io/rest/movies?q={}&sort=heroname", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d9108cc1ce70f637985514f",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      console.log(heroes);
      heroes.forEach(addHeroToTheDom);
    });
}
get();

function addHeroToTheDom(movie) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".temp").dataset.heroid = movie._id;
  copy.querySelector("h1").textContent = movie.title;
  copy.querySelector("h2").textContent = movie.genre;
  copy.querySelector("h3").textContent = movie.description;
  copy.querySelector(".btn").addEventListener("click", () => {
    console.log(movie._id);
    deleteIt(movie._id);
  });
  document.querySelector("#liste").prepend(copy);
}

function post() {
  const data = {
    title: `Black Panther`,
    genre: `Tchalla`,
    description: `Fight like a panther`
  };
  addHeroToTheDom(data);
  const postData = JSON.stringify(data);
  fetch(`https://movies-cb29.restdb.io/rest/movies?q={}&sort=heroname"`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d9108cc1ce70f637985514f	",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //addHeroToTheDom(data);
    });
}
document.querySelector("#button").addEventListener("click", addSuperhero);

function addSuperhero() {
  post();
}

function deleteIt(id) {
  fetch(`https://movies-cb29.restdb.io/rest/movies/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d9108cc1ce70f637985514f	",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      document.querySelector(`[data-heroid = "${id}"]`).remove();
    });
}
