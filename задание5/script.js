const btn = document.querySelector(".btn");
const resultNode = document.querySelector(".result");

function useRequest(page, limit) {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .catch(() => {
      console.log("error");
      resultNode.innerHTML = "<p>Ошибка загрузки!</p>";
    });
}

function displayResult(apiData) {
  let cards = "";

  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img class="card_image" src="${item.download_url}" alt="image">
        <p>${item.author}</p>
      </div>`;
    cards = cards + cardBlock;
  });

  resultNode.innerHTML = cards;
}

function displayNoResult(page, limit) {
  if ((page < 1 || page > 10) && (limit < 1 || limit > 10)) {
    resultNode.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`;
  } else if (page < 1 || page > 10 || typeof page != "number") {
    resultNode.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10</p>`;
  } else {
    resultNode.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`;
  }
}

if (localStorage.lastJson) {
  const json = JSON.parse(localStorage.getItem("lastJson"));
  displayResult(json);
}

btn.addEventListener("click", async () => {
  const inputPage = document.querySelector("#page").value;
  const inputLimit = document.querySelector("#limit").value;
  localStorage.setItem("page", inputPage);
  localStorage.setItem("limit", inputLimit);
  if (
    inputPage >= 1 &&
    inputPage <= 10 &&
    inputLimit >= 1 &&
    inputLimit <= 10
  ) {
    const json = await useRequest(inputPage, inputLimit);
    localStorage.setItem("lastJson", JSON.stringify(json));
    console.log(localStorage.getItem("lastJson"));
    displayResult(json);
  } else {
    displayNoResult(inputPage, inputLimit);
  }
});

const requestURL = "https://picsum.photos/v2/list";

const xhr = new XMLHttpRequest();
xhr.open("GET", requestURL);
xhr.responseType = "json";
xhr.onload = () => {
  console.log(xhr.response);
};
xhr.send();