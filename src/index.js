let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("new-toy-button");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelector("form");

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      response.forEach(function (toy) {
        let toyCard = createToyCard(toy.name, toy.image, toy.likes, toy.id);
        toyCollection.append(toyCard);
      });
    });

  toyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    postNewToy(name, image);
  });
});

const postNewToy = (name, image) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: image,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (toy) {
      let toyCard = createToyCard(toy.name, toy.image, toy.likes, toy.id);
      toyCollection.append(toyCard);
    });
};

const createToyCard = (toyName, toyImage, toyLikes, toyId) => {
  const toyCard = document.createElement("div");
  toyCard.classList.add("card");
  toyCard.innerHTML = `
    <h2>${toyName}</h2>
    <img src=${toyImage} class="toy-avatar" />`;

  const likes = document.createElement("p");
  likes.innerText = toyLikes;
  toyCard.appendChild(likes);
  const button = document.createElement("button");
  button.innerText = "Like";

  button.addEventListener("click", function (event) {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: toyLikes + 1,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (toy) {
        toyLikes = toy.likes;
        likes.innerText = toy.likes;
      });
  });

  toyCard.appendChild(button);
  return toyCard;
};
