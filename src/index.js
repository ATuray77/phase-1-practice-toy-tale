let addToy = false;

//FUNCTION TO UPDATE LIKES
function updateLikes(id, newNumberOfLikes) {
fetch(`http://localhost:3000/toys/${id}`, { //using back ticks in order to use interpolation to get id
method: "PATCH",
headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "likes": newNumberOfLikes
})
  })
}

//Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page

//Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM

//Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM

//When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
function createCardElement(toy) {  //takes toy, creates a div and appends it to the screen
  //make a <div class="card">
  //create div
  let card = document.createElement("div");
  //add card class
  card.classList.add("card"); //adds a class

  /*
  Each card should have the following child elements:

  - h2 tag with the toy's name
  - img tag with the src of the toy's image attribute and the class name "toy-avatar"
  - p tag with how many likes that toy has
  - button tag with a class "like-btn" and an id attribute set to the toy's id number

  */

  let h2 = document.createElement("h2"); //creates h2 element
  h2.textContent = toy.name; //adds a content to h2 element

  let img = document.createElement("img"); //creates an image element
  img.src = toy.image; //adds a source
  img.classList.add("toy-avatar"); //adds a class to the image element

  let p = document.createElement("p"); //creates p element
  p.textContent = `${toy.likes} likes`; //adds 4 likes

  let button = document.createElement("button");
  button.addEventListener('click', () => {  //adds event listeners to all buttons for likes
    //update the likes
    p.textContent = `${toy.likes += 1} likes`;
    //PATCH
    updateLikes(toy.id, toy.likes)
  })

  button.classList.add("like-btn");
  button.id = toy.id;
  button.textContent = "Like ❤️";

  card.append(h2, img, p, button); //append all the above inside of the div. appendChild will only allow you to add one image a time, whereas append adds a bunch of elements
  document.getElementById("toy-collection").appendChild(card); //append card to toy collection
}

//MAKING A POST
function sendItOut(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      ...newToy, //using spread operator to get toys name and image
      "likes" : 0
    })
  }).then((response) => response.json() //grabbing the json that's coming back in the response body 
  )
  .then(responseToy => createCardElement(responseToy))
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(" http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toys) => toys.forEach((toy) => createCardElement(toy)));

  //ADDS A NEW TOY
  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target)); //a better way of targeting a from input data. grabs the form elements and turns all it properties into a json element
    sendItOut(formData);
  });

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
});

/*
Add a New Toy
When a user submits the toy form, two things should happen:

A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
If the post is successful, the toy should be added to the DOM without reloading the page.
In order to send a POST request via fetch(), give the fetch() a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON data for the request. The headers and body should look something like this:

headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
*/
