if (document.readyState === "complete") {
  // Document already fully loaded
  ready();
} else {
  // Add event listener for DOMContentLoaded (fires when document is fully loaded)
  document.addEventListener("DOMContentLoaded", ready);
}

async function ready() {
  generateElements();
}

const root = document.getElementById("root");
const baseElements = 2;

// масштабирование этой структуры связанно с размерами
// если соблюсти кол-во базовых элементов и пропорции, 
// то оставляем так
function generateElements() {
  let width = 20;
  let height = 20;

  let top = 60;
  let right = 35;

  for (let i = 0; i < baseElements; i++) {

    const base = document.createElement("div");

    base.setAttribute(
      "style",
      `position: absolute;
    top: ${top}%;
    right: ${right}%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end; 
    width: ${width}rem;
    height: ${height}rem;
    background-color: #fff; 
    border: 1px solid;`
    );

    root.appendChild(base);

    width -= 4;
    height -= 4;
    top += 20;
    right -= 1;

    for (let j = -i; j < baseElements - 1; j++) {
      const inner = document.createElement("div");

      inner.setAttribute(
        "style",
        `position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: end; 
      width: ${width}rem;
      height: ${height}rem; 
      border: 1px solid;`
      );

      base.appendChild(inner);

      width -= 4;
      height -= 4;
    }
  }
}


// для 3х базовых элементов размеры приходится задавать больше

// const root = document.getElementById("root");
// const baseElements = 3;

// function generateElements() {
//   let width = 40;
//   let height = 40;

//   let top = 0;
//   let right = 35;

//   for (let i = 0; i < baseElements; i++) {

//     const base = document.createElement("div");

//     base.setAttribute(
//       "style",
//       `position: absolute;
//     top: ${top}%;
//     right: ${right}%;
//     display: flex;
//     flex-direction: column;
//     justify-content: end;
//     align-items: end; 
//     width: ${width}rem;
//     height: ${height}rem;
//     background-color: #fff; 
//     border: 1px solid;`
//     );

//     root.appendChild(base);

//     width -= 2;
//     height -= 2;
//     top += 30;
//     right -= 2;

//     for (let j = -i; j < baseElements - 1; j++) {
//       const inner = document.createElement("div");

//       inner.setAttribute(
//         "style",
//         `position: absolute;
//       display: flex;
//       flex-direction: column;
//       justify-content: end;
//       align-items: end; 
//       width: ${width}rem;
//       height: ${height}rem; 
//       border: 1px solid;`
//       );

//       base.appendChild(inner);

//       width -= 2;
//       height -= 2;
//     }
//   }
// }