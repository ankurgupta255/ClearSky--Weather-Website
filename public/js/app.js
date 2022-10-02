const WeatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#first");
const message2 = document.querySelector("#second");

console.log("Hey");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch("http://localhost:3000/weather?address=Boston").then((response) => {
  if (response.error) {
    console.log(response.error);
  } else {
    response.json().then((data) => {
      console.log(data.location);
      console.log(data.forecast);
    });
  }
});

WeatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  message1.textContent = "Loading....";
  message2.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      if (response.error) {
        console.log(response.error);
        message1.textContent = data.error;
      }
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
