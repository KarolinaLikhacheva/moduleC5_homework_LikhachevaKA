function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
  
    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log("Статус ответа: ", xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    xhr.onerror = function () {
      console.log("Ошибка! Статус ответа: ", xhr.status);
    };
    xhr.send();
  }
  
  const resultNode = document.querySelector(".result");
  const btnNode = document.querySelector(".btn");
  
  function displayResult(apiData) {
    let cards = "";
  
    apiData.forEach((item) => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
  }
  
  btnNode.addEventListener("click", () => {
    const value = document.querySelector("input").value;
    if (value > 0 && value < 11) {
      useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    } else {
      resultNode.innerHTML = `<p>Число ${value} вне диапазона от 1 до 10</p>`;
    }
  });
  