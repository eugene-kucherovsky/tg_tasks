if (document.readyState === "complete") {
  // Document already fully loaded
  ready();
} else {
  // Add event listener for DOMContentLoaded (fires when document is fully loaded)
  document.addEventListener("DOMContentLoaded", ready);
}

async function ready() {
  fetchAndRenderUsersList();
}

let usersList = {};
let apiMessage = document.getElementById("api-message");
apiMessage.innerHTML = " &nbsp ";

async function fetchUsersList() {
  const URL = "http://localhost:8000/controllers/get_all.php";
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const results = await response.json();

  return results;
}

async function createUser({ lastName, firstName, middleName }) {
  const URL = "http://localhost:8000/controllers/create.php";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastName: lastName,
      firstName: firstName,
      middleName: middleName,
    }),
  });
  const results = await response.json();

  return results;
}

async function updateUserHandler(event) {
  let user_id = event.target.value;

  // find elements by unique ID
  let ln = document.getElementById(`ln ${user_id}`);
  let fn = document.getElementById(`fn ${user_id}`);
  let mn = document.getElementById(`mn ${user_id}`);

  // console.log({
  //   userId: user_id,
  //   lastName: ln.value,
  //   firstName: fn.value,
  //   middleName: mn.value,
  // });

  if (ln.value === "" || fn.value === "" || mn.value === "") {
    apiMessage.innerHTML =
      "Заполнение всех полей данными пользователя обязательно !";
    return;
  } else {
    let results = await updateUser({
      userId: user_id,
      lastName: ln.value,
      firstName: fn.value,
      middleName: mn.value,
    });

    apiMessage.innerHTML = results.message;
  }

  fetchAndRenderUsersList();
}

async function updateUser({ userId, lastName, firstName, middleName }) {
  const URL = "http://localhost:8000/controllers/update.php";
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      lastName: lastName,
      firstName: firstName,
      middleName: middleName,
    }),
  });
  const results = await response.json();

  return results;
}

async function deleteUser(id) {
  const URL = `http://localhost:8000/controllers/delete.php?id=${id}`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const results = await response.json();

  return results;
}

async function deleteUserHandler(event) {
  let user_id = event.target.value;
  // console.log(user_id);
  let results = await deleteUser(user_id);

  apiMessage.innerHTML = results.message;

  fetchAndRenderUsersList();
}

// render users list
async function fetchAndRenderUsersList() {
  // clear table before users list rendering
  const rows = document.querySelectorAll(".table__rows");
  rows.forEach((row) => {
    row.remove();
  });

  usersList = await fetchUsersList();
  console.log(usersList);

  const list = document.querySelector("#usersList");

  if (usersList.data && usersList.data.length) {
    usersList.data.forEach((user) => {
      const wrapper = document.createElement("div");
      const ln = document.createElement("input");
      const fn = document.createElement("input");
      const mn = document.createElement("input");
      const ub = document.createElement("button");
      const db = document.createElement("button");

      wrapper.setAttribute("class", "table__rows");
      ln.setAttribute("class", "user-data");
      fn.setAttribute("class", "user-data");
      mn.setAttribute("class", "user-data");

      ln.setAttribute("id", `ln ${user.userId}`);
      fn.setAttribute("id", `fn ${user.userId}`);
      mn.setAttribute("id", `mn ${user.userId}`);

      ub.setAttribute("class", "table__rows-btn-update");
      db.setAttribute("class", "table__rows-btn-delete");

      ln.value = `${user.lastName}`;
      fn.value = `${user.firstName}`;
      mn.value = `${user.middleName}`;
      ub.value = `${user.userId}`;
      db.value = `${user.userId}`;
      ub.innerHTML = "Обновить<br />данные";
      db.innerHTML = "Удалить<br />пользователя";
      ub.addEventListener("click", updateUserHandler);
      db.addEventListener("click", deleteUserHandler);

      list.appendChild(wrapper);
      wrapper.appendChild(ln);
      wrapper.appendChild(fn);
      wrapper.appendChild(mn);
      wrapper.appendChild(ub);
      wrapper.appendChild(db);
    });
  }
}

// create user form
let formCreateUser = document.getElementById("form-create-user");

let ln = document.getElementById("lastName");
let fn = document.getElementById("firstName");
let mn = document.getElementById("middleName");

// form handler
formCreateUser.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  if (ln.value === "" || fn.value === "" || mn.value === "") {
    apiMessage.innerHTML =
      "Заполнение всех полей данными пользователя обязательно !";
    return;
  } else {
    let results = await createUser({
      lastName: ln.value,
      firstName: fn.value,
      middleName: mn.value,
    });

    apiMessage.innerHTML = results.message;
  }

  ln.value = "";
  fn.value = "";
  mn.value = "";

  fetchAndRenderUsersList();
});
