const apiUrl =
  "https://script.google.com/macros/s/AKfycbxd2xduI-ZenJvVTOC9eT-EIZjfzxMTS9jzoHoUjIdOV8Rof-5EXs85SpGYG22HJaQJ/exec";

const testsNames = ['Введение', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 'Колесо баланса', 'Колесо: результат', 'Заключение'];

const sections = document.querySelectorAll(".section");
const emailForm = document.querySelector("#emailForm");
const tableTest = document.querySelector(".tableTest");
const studentEmail = document.querySelector(".studentEmail");

const submitEmailBtn = document.querySelector(".submitEmailBtn");
const submitTestBtn = document.querySelector(".submitTestBtn");

const popup = document.querySelector('.popup');
const popupBtn = document.querySelector(".popup__btn");
const popupText = document.querySelector(".popup__text");

const tableBlock = document.querySelector(".tableBlock");

function closePopup() {
  popup.classList.remove("popup_show");
  popup.classList.add("popup_hide");
}

function showPopup(text, onTest) {
  popupText.textContent = text;
  popup.classList.add("popup_show");
  popup.classList.remove("popup_hide");

  if (onTest) popup.classList.add("popup_onTest");
}

function toggleTableBlock() {
  tableBlock.classList.toggle("tableBlock_hide");
}


function toggleSctions() {
  sections.forEach((section) => {
    section.classList.toggle("section_hide");
  });
}

async function openTests (e) {
  e.preventDefault();

  const emailField = emailForm.querySelector("#email");
  const email = emailField.value.trim();

  submitEmailBtn.disabled = true;
  submitEmailBtn.textContent = "Загружаем тесты...";
  emailField.readOnly = true;

  try {
    const response = await fetch(`${apiUrl}?email=${email}`);
    const res = await response.text();

    console.log("res", res);

    // if (!res.includes("docs.google.com/spreadsheets")) {
    //   return showPopup(res);
    // }

    const data = res.split(",");
    
    const url = `${data[0]}?rm=minimal`;
    const listIndex = data[1];
    const listName = testsNames[listIndex];

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("url", url);
    sessionStorage.setItem("listName", listName);

    setData(email, listName, url);
    emailField.value = '';

  } catch (err) {

    console.log(err);
    console.log(err.message);
    showPopup("Некорректный адрес электронной почты");

  } finally {

    submitEmailBtn.disabled = false;
    submitEmailBtn.textContent = "Подтвердить";
    emailField.readOnly = false;
    console.log("заканчиваем");
  }
};

function exitTest() {
  sessionStorage.clear();
  toggleSctions();
}



async function submitTest (e) {
  e.preventDefault();

  if (popup.classList.contains("popup_show")) closePopup();

  const listName = sessionStorage.getItem("listName");
  if (listName === 'Заключение') return exitTest();
  
  toggleTableBlock();
  
  const url = sessionStorage.getItem("url");
  const newListName = testsNames[testsNames.indexOf(listName) + 1];

  submitTestBtn.disabled = true;
  const btnText = getBtnText_onSubmit(listName)
  submitTestBtn.textContent = btnText;

  try {
    const response = await fetch(`${apiUrl}?url=${url}&listName=${listName}`, {
      method: "POST",
    });

    const res = await response.text();
    // console.log("res", res);
    showPopup(res, true);
    // alert('мы в try')

  } catch (err) {

    console.log(err);
    console.log(err.message);
    // alert("Что-то пошло не так");
    // alert("мы в catch");

    sessionStorage.setItem("listName", newListName);

  } finally {
    console.log("закончили");

    submitTestBtn.disabled = false;
   
    const btnText = getBtnText(newListName);
    submitTestBtn.textContent = btnText;
    toggleTableBlock();
  }
}


function checkSessionStorage() {
  const url = sessionStorage.getItem("url");
  const email = sessionStorage.getItem("email");
  const listName = sessionStorage.getItem("listName");

  if (Boolean(url) && Boolean(email) && Boolean(listName)) setData(email, listName, url);
}

function setData(email, listName, url) {

  toggleSctions();
  tableTest.src = url;
  studentEmail.textContent = email;

  const btnText = getBtnText(listName);

  submitTestBtn.textContent = btnText;
}


function getBtnText(listName) {
  let btnText;

  switch (listName) {
    case "Введение": {
      btnText = "Начать тестирование";
      break;
    }
    case "Колесо: результат": {
      btnText = "Завершить тестирование";
      break;
    }
    case "Заключение": {
      btnText = "Выйти";
      break;
    }
    default:
      btnText = "Отправить результаты";
      break;
  }

  return btnText;
}

function getBtnText_onSubmit(listName) {
  let btnText;

  switch (listName) {
    case "Введение": {
      btnText = "Начинаем...";
      break;
    }
    case "Колесо: результат": {
      btnText = "Завершаем...";
      break;
    }
    default:
      btnText = "Отправляем...";
      break;
  }

  return btnText;
}



submitTestBtn.addEventListener("click", submitTest);
emailForm.addEventListener("submit", openTests);

popupBtn.addEventListener("click", closePopup);

checkSessionStorage();