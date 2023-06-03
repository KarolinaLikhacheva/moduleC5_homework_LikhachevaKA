const btn = document.querySelector(".btn");
const resultNode = document.querySelector(".result");

function useRequest(firstInput, secondInput) {
  return fetch(`https://picsum.photos/${firstInput}/${secondInput}`)
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch(() => {
      console.log("error");
      contentNode.innerHTML = "<p>Ошибка загрузки!</p>";
    });
}

btn.addEventListener("click", async () => {
  const inputWidth = document.querySelector(".first_input").value;
  const inputHeight = document.querySelector(".second_input").value;
  if (
    inputWidth >= 100 &&
    inputWidth <= 300 &&
    inputHeight >= 100 &&
    inputHeight <= 300
  ) {
    const url = await useRequest(inputWidth, inputHeight);
    result.innerHTML = `
      <img src='${url}' alt='image'>`;
  } else {
    result.innerHTML = `
      <p>Ошибка ввода или числа вне диапазона от 100 до 300</p>`;
  }
});

