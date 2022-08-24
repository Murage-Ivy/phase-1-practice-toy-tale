let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // gets posts
  const toyCollection = document.getElementById('toy-collection');
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(toy => {
      const toyCard = document.createElement('div');
      toyCard.className = 'card';
      toyCard.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>`;
      toyCollection.appendChild(toyCard)
    }))
    .catch(error => errorDisplay(error, toyCollection))

  //adds posts
  const form = document.querySelector('.add-toy-form');
  const inputs = document.querySelectorAll('.input-text');

  form.addEventListener('submit', (e) => {
    const toyCollection = document.getElementById('toy-collection');
    e.preventDefault()
    if (inputs[0].value && inputs[1].value) {
      const toyObject = {
        name: inputs[0].value,
        image: inputs[1].value,
        likes: 0
      }
      e.target.reset();
      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify(toyObject)
        })
        .then(res => res.json())
        .then(toy => {
          const toyCard = document.createElement('div');
          toyCard.className = 'card';
          toyCard.innerHTML = `<h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"/>
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id=${toy.id}>Like ❤️</button>`;
          toyCollection.appendChild(toyCard);
        }).catch(error => (error))
    }

  })


  //update posts 




});





function updateToy() {
  const toyCollection = document.querySelector('#toy-collection')





  // let newNumberOfLikes = parseInt(lik)




  // return fetch('http://localhost:3000/toys', {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json"
  //   },

  //   body: JSON.stringify({
  //     "likes": newNumberOfLikes
  //   })
  // })


}

// the function handles errors
function errorDisplay(error, toyCollection) {
  const toyCard = document.createElement('div');
  toyCard.className = 'card';
  toyCard.innerText = `Opps something went wrong: ${error.message} toys`;
  toyCollection.appendChild(toyCard);
}