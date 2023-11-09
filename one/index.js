if (document.readyState === "complete") {
  // Document already fully loaded
  ready();
} else {
  // Add event listener for DOMContentLoaded (fires when document is fully loaded)
  document.addEventListener("DOMContentLoaded", ready);
}

async function ready() {
  reqBtn.addEventListener("click", async (event) => {

    // можно было и задисэйблить кнопку, как вариант
    if (loadingStatus === "pending") {
      apiMessage.innerHTML =
        "Нельзя начать новый процесс до завершения предыдущего !";
      return;
    }

    pigletsList = [];
    clearPigletsList();

    apiMessage.innerHTML = "Начинаем процесс получения...";
    completeMessage.innerHTML = " &nbsp ";

    let result = await fetchPiglets();

    pigletsList = result;
    // console.log(pigletsList);

    apiMessage.innerHTML = "Данные получены";

    renderPigletsList();
  });
}

const URL_1 = "http://localhost:8000/api/backend_1.php";
const URL_2 = "http://localhost:8000/api/backend_2.php";
const URL_3 = "http://localhost:8000/api/backend_3.php";

let pigletsList = [];
let loadingStatus = null;
let reqBtn = document.getElementById("btn-request");
let apiMessage = document.getElementById("api-message");
let completeMessage = document.getElementById("complete-message");
apiMessage.innerHTML = " &nbsp ";
completeMessage.innerHTML = " &nbsp ";

const fetchPiglets = async () => {

  loadingStatus = "pending";

  try {
    const res = await Promise.all([
      fetch(URL_1, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
      fetch(URL_2, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
      fetch(URL_3, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    ]);
    const data = await Promise.all(res.map((r) => r.json()));
    loadingStatus = null;
    return data;
  } catch {
    pigletsList = [];
    loadingStatus = null;
    apiMessage.innerHTML = "Ошибка получения данных";
    throw Error("Promise failed");
  }
};

function renderPigletsList() {
  // clear table before piglets list rendering
  clearPigletsList();

  if (pigletsList.length) {
    const list = document.querySelector("#pigletsList");

    pigletsList.forEach((user) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("class", "piglet");
      list.appendChild(wrapper);
    });

    completeMessage.innerHTML = `${pigletsList.join()} все 3 поросёнка в сборе, 3 промиса заресолвлены.`;
  }
}

function clearPigletsList() {
  const rows = document.querySelectorAll(".piglet");
  rows.forEach((row) => {
    row.remove();
  });
}