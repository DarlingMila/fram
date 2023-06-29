const apiUrl =
  "https://script.google.com/macros/s/AKfycbxd2xduI-ZenJvVTOC9eT-EIZjfzxMTS9jzoHoUjIdOV8Rof-5EXs85SpGYG22HJaQJ/exec";

const numberOfTests = 26; //количестов тестов без Колеса (только номерные тесты). ---при необходимости изменить
const numberOfExercises = 3; //количестов упражнений. ---при необходимости изменить

// ключи - название упражнений, далее массив с правилами. В массиве строки/абзацы - это элементы массива
const exerciseInstructions = {
  "У1": [
    "Упражнение 'Быть-Делать-Иметь'",
    "Надо делать вот так -- 1",
    "Так не надо делать -- 1",
    "И третий блок для теста! -- 1",
  ],
  "У2": [
    "Упражнение 'Опыт'",
    "Надо делать вот так -- 2",
    "Так не надо делать -- 2",
    "И третий блок для теста! -- 2",
  ],
  "У3": [
    "Упражнение 'Значимый опыт'",
    "Надо делать вот так -- 3",
    "Так не надо делать -- 3",
    "И третий блок для теста! -- 3",
  ],
  "Колесо баланса": [
    "Упражнение 'Колесо баланса'",
    "Надо делать вот так -- КБ",
    "Так не надо делать -- КБ",
    "И третий блок для теста! -- КБ",
  ],
};

let testsNames = []; // массив, куда функция ниже добавит необходимое количество листов, включая тесты, упражнения (+КБ и КБ результат), приветствие и прощанеи 

for (let i = 0; i <= numberOfTests + numberOfExercises; i++) {

  switch (i) {

    case 0:
      testsNames.push(["Введение"]);
      break;

    case numberOfTests + numberOfExercises:
      testsNames.push([`У${i - numberOfTests}`], ["Колесо баланса"], ["Колесо: результат"], ["Заключение"]);
      testsNames = testsNames.flat();
      break;

    default:
      if (i <= numberOfTests) {
        testsNames.push([String(i)]);
      } else {
        testsNames.push([`У${i - numberOfTests}`]);
      }
      break;
  }
}

console.log(testsNames); // пока оставила, чтобы всегда была возможность отследить их до начала работы

const sections = document.querySelectorAll(".section");
const tableTest = document.querySelector(".tableTest");

const headerBlocks = document.querySelectorAll(".selectEnterInput");
const emailForm = document.querySelector("#emailForm");
const studentEmail = document.querySelector(".studentEmail");
const additionalInfoBlock = emailForm.querySelector(".emailForm__otherInfoWrapper");

const radioBtns = document.querySelectorAll("input[type=radio]");
const ageField = document.querySelector("input[name=age]");
const emailField = emailForm.querySelector("#email");

const submitEmailBtn = document.querySelector(".submitEmailBtn");
const submitTestBtn = document.querySelector(".submitTestBtn");

const popup = document.querySelector(".popup");
const popupBtn = document.querySelector(".popup__btn");
const popupText = document.querySelector(".popup__text");

const tableBlock = document.querySelector(".tableBlock");
const progress = document.querySelector(".progress");

const instructionModal = document.querySelector(".instructionModal");
const instrCloseBtn = instructionModal.querySelector(".instructionModal__btn");
const instrTextBlock = instructionModal.querySelector(".instructionModal__text");
const instrOpenBtn = document.querySelector(".instrBtn");

/**
 * Функция переключения между блоками входа
 * @param {string} isFirstTime строка true/false открыт ли блок "В первый раз?"
 */
function changeEnterBlock(isFirstTime) {

  /**
   * Проверка: открыт блок "В первый раз?"
   *    если да -> в окне добавляются блок с радиокнопками для выбора пола и инпут для возраста
   *    если нет -> скрываются блок с дополнительными вопросами
   */
  if (isFirstTime === "true") {
    additionalInfoBlock.classList.remove("emailForm__otherInfoWrapper_hide");
  } else {
    additionalInfoBlock.classList.add("emailForm__otherInfoWrapper_hide");
  }
}

/**
 * Функция закрывает попап с ошибкой, меняя классы с анимацией
 */
function closePopup() {
  popup.classList.remove("popup_show");
  popup.classList.add("popup_hide");
}

/**
 * Функция откывает попап с ошибкой, меняя классы с анимацией
 * @param {string} text - текст ошибки
 * @param {boolean} onTest - булевое значение, располагается ли попап поверх теста
 */
function showPopup(text, onTest) {
  popupText.textContent = text;
  popup.classList.add("popup_show");
  popup.classList.remove("popup_hide");

  /**
   * Проверка: попап выпадает поверх теста
   *    если да -> добавляется класс (меняются стили, чтобы не сливаться с фоном)
   */
  if (onTest) popup.classList.add("popup_onTest");
}

/**
 * Функция вызова или сокрытия скрина блокировщика, пока отправляются и загружаются данные
 */
function toggleTableBlock() {
  tableBlock.classList.toggle("tableBlock_hide");
}

/**
 * Функция переключения между секциями. 
 * Так как их всего две, то toggle просто добавляет класс одной и добавляет другой.
 */
function toggleSctions() {
  sections.forEach((section) => {
    section.classList.toggle("section_hide");
  });
}

/**
 * Функция выхода из тестирования, которая также стирает данные из sessionStorage
 */
function exitTest() {
  sessionStorage.clear();
  toggleSctions();
}

/**
 * Функция закрытия окна с инструкцией к упражнениям + добавления анимации к кнопке вызова
 */
function closeInstruction() {
  instructionModal.classList.add("instructionModal_hide");
  instrOpenBtn.classList.add("instrBtn_animation");

  setTimeout(() => {
    instructionModal.style.display = "none";
  }, 150) // таймер ждет, пока пройден анимация ухода окна и затем полностью отключает блок
}

/**
 * Функция открытия окна с инструкцией к упражнениям
 */
function showInstruction() {
  instructionModal.style.display = "block";
  instructionModal.classList.remove("instructionModal_hide");
  instrOpenBtn.classList.remove("instrBtn_animation");
}

/**
 * Функция для всех операций связанных с окном инструкций для упражнений
 * @param {string} listName - название/номер теста или упажнения
 * @returns boolean - ответ нужна ли инструкция
 */
function checkForInstructions(listName) {

  /**
   * Проверка: передано название упражнения - У_ или "Колесо баланса"
   *    если да -> вызываются функции очистки и заполнения окна инструкции, его вызова и добавления кнопки
   */
  if (/^У\d+/.test(listName) || listName == "Колесо баланса") {
    clearInstructionBlock();
    addTextToInstruction(listName);
    showInstruction();
    instrOpenBtn.classList.remove("instrBtn_hide");

    return true;
  }

  return false;
}

/**
 * Функция добавляет необходимый текст в инструкцию
 * @param {string} listName - название или номер теста или упражнения 
 */
function addTextToInstruction(listName) {
  const instructions = exerciseInstructions[listName];

  instructions.forEach((text, i) => {
    // если i == 0 значит это заголовок, остальное просто параграфы
    const el = i == 0 ? "h3" : "p";
    const cl = i == 0 ? "instructionModal__heading" : "instructionModal__par";

    const item = createAndInsertText(el, cl, text);
    instrTextBlock.appendChild(item);
  })
}

/**
 * Функция очистки. Цикл проверяет есть ди в блоке 1-ый элемент и если да, то удаляет его
 */
function clearInstructionBlock() {
  while(instrTextBlock.firstChild) instrTextBlock.removeChild(instrTextBlock.firstChild);
}

/**
 * Функция для создания и наполнения элементов
 * @param {string} element - тэг
 * @param {string} className - класс
 * @param {string} text - текст
 * @returns созданный элемент
 */
function createAndInsertText(element, className, text) {
  const item = document.createElement(element);
  item.classList.add(className);
  item.textContent = text;
  return item;
}

/**
 * Функция собирает данные и выстраивает строку запроса
 * @returns string строка запроса для GET
 */
function getData() {
  /**
   * При успешном сборе данных формируется строка запроса
   * Если какие-то поля не были заполнены, выскакивает ошибка
   */
  try {
    let string = "";

    const isFirstTime = document.querySelector("input[name=isFirstTime]:checked").value;
    const email = emailField.value.trim();

    string += `isFirstTime=${isFirstTime}&email=${email}`;

    /**
     * Проверка: открыт ли блок "В первый раз?"
     *    если да -> строка дополняется информацие по возрасту и полу
     */
    if (isFirstTime === "true") {
      const gender = document.querySelector("input[name=gender]:checked").value;
      const age = ageField.value.trim();

      string += `&gender=${gender}&age=${age}`;
    }

    return [email, string];

  } catch {
    showPopup("Убедитесь, что все поля заполнены.");
  }
}

/**
 * Функция блокировки кнопок и полей
 */
function blockInputsAndBtns() {
  submitEmailBtn.disabled = true;
  submitEmailBtn.textContent = "Загружаем тесты...";
  emailField.readOnly = true;
  ageField.readOnly = true;

  radioBtns.forEach((btn) => {
    btn.disabled = true;
  });
}

/**
 * Функция снятия блокировок с кнопок и полей
 */
function unblockInputsAndBtns() {
  submitEmailBtn.disabled = false;
  submitEmailBtn.textContent = "Подтвердить";
  emailField.readOnly = false;
  ageField.readOnly = false;

  radioBtns.forEach((btn) => {
    btn.disabled = false;
  });
}

/**
 * Функция очищает инпуты и откывает окно "Вход"
 */
function clearInputsAndRadioBtns() {
  emailField.value = "";
  ageField.value = "";
  additionalInfoBlock.classList.add("emailForm__otherInfoWrapper_hide");
  radioBtns.forEach((btn) => {
    if (btn.name === "isFirstTime" && btn.value === "false") {
      btn.checked = true;
    } else {
      btn.checked = false;
    }
  });
}



/**
 * Асинхронная функция посылающая GET запрос: отправляет почту и получает данные, необходимые для тестирования (вход в тестирование)
 * @param {object} e - событие 
 */
async function openTests (e) {
  e.preventDefault();

  // принудительное закрытие попапа, если он открыт
  if (popup.classList.contains("popup_show")) closePopup();

  const [email, studentData] = getData();
  blockInputsAndBtns(); 

  /**
   * При успешной отправки данных открывается тестирование, необходимый данные записываются в sessionStorage
   * При неудаче всплывает окно с ошибкой
   * В последнем блоке элементы возвращаются в прежнее состояния
   */
  try {
    const response = await fetch(`${apiUrl}?${studentData}`);
    const res = await response.text();

    const data = res.split(",");

    /**
     * Проверка: в ответе содержится ссылка на таблицу
     *    если да -> открывается тестирование, сохраняются необходимые данные
     *    если нет -> появляется попап с ошибкой, переданной с сервера
     */
    if (data[0].includes("docs.google.com/spreadsheets")) {
      const url = `${data[0]}?rm=minimal`; //так таблица отображается без шапки

      const listIndex = data[1];
      const listName = testsNames[listIndex];

      const amountOfTests = data[2];

      //ниже все необходимые данные записываются в sessionStorage
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("url", url);
      sessionStorage.setItem("listName", listName);
      sessionStorage.setItem("listIndex", listIndex);
      sessionStorage.setItem("amountOfTests", amountOfTests);

      setData(email, listName, url);
      clearInputsAndRadioBtns();
      checkForInstructions(listName);

    } else {
      showPopup(res);
    }

  } catch (err) {
    showPopup("Некорректный адрес электронной почты.");

  } finally {
    unblockInputsAndBtns();
  }
};

/**
 * Асинхронная функция посылающая POST запрос: отправляет почту и получает данные, необходимые для тестирования (переключение тестов)
 * @param {object} e - событие 
 */
async function submitTest (e) {
  e.preventDefault();

  // принудительное закрытие попапа, если он открыт
  if (popup.classList.contains("popup_show")) closePopup();
  instrOpenBtn.disabled = true;

  const listName = sessionStorage.getItem("listName");
  if (listName === "Заключение") return exitTest();

  toggleTableBlock();

  const url = sessionStorage.getItem("url");
  const email = sessionStorage.getItem("email");

  submitTestBtn.disabled = true;
  const btnText_onSubmit = getBtnText_onSubmit(listName);
  submitTestBtn.textContent = btnText_onSubmit;

  let newListName = null;

  /**
   * При успешной отправки данных открывается новый лист
   * При неудаче всплывает окно с ошибкой
   * В последнем блоке элементы возвращаются в прежнее состояния, текст кнопки зависит от листа
   */
  try {
    const response = await fetch(
      `${apiUrl}?url=${url}&listName=${listName}&email=${email}`,
      {
        method: "POST",
      }
    );

    const res = await response.text();

    /**
     * Проверка: в ответ пришло число от 0 до длинны массива с названием тестов и упражнений (ключая приветствие и заключение)
     *    если да -> обновляются данные в sessionStorage и заполняется прогресс
     *    если нет -> выскакивает попап с присланным текстом ошибки
     */
    if (Number(res) >= 0 && Number(res) <= testsNames.length) {
      newListName = res == "Заключение" ? "Заключение" : testsNames[res];
      sessionStorage.setItem("listName", newListName);
      sessionStorage.setItem("listIndex", Number(res));
      setProgress();

      const needsInstructions = checkForInstructions(newListName);

      /**
       * Проверка: если не нужна инструкция и у кнопки нет класса, который скрывает ее -> то он добавляется и убирается класс с анимацией
       */
      if (
        !needsInstructions &&
        !instrOpenBtn.classList.contains("instrBtn_hide")
      ) {
        instrOpenBtn.classList.remove("instrBtn_animation");
        instrOpenBtn.classList.add("instrBtn_hide");
      }

    } else {
      showPopup(res, true);
    }

  } catch (err) {
    const btnText = getBtnText(listName);
    submitTestBtn.textContent = btnText;

  } finally {
    instrOpenBtn.disabled = false;
    submitTestBtn.disabled = false;

    // текст кнопки меняется в зависимости от номера листа, если в newListName есть данные - то передаются они, если нет - то старые данные
    const btnText = newListName
      ? getBtnText(newListName)
      : getBtnText(listName);
    submitTestBtn.textContent = btnText;

    toggleTableBlock();
  }
}

/**
 * Функция проверки наличия данных в sessionStorage. Если есть - открывается тестирование, если каких-то данных не хватает - нет
 */
function checkSessionStorage() {
  const url = sessionStorage.getItem("url");
  const email = sessionStorage.getItem("email");
  const listName = sessionStorage.getItem("listName");
  const listIndex = sessionStorage.getItem("listIndex");
  const amountOfTests = sessionStorage.getItem("amountOfTests");

  if (
    Boolean(url) &&
    Boolean(email) &&
    Boolean(listName) &&
    Boolean(listIndex) &&
    Boolean(amountOfTests)
  )
    setData(email, listName, url);
}

/**
 * Функция установки всех значений: устанавливается в iframe ссылка на таблицу, почта проставляется в шапку, по названию теста определяется текст на кнопке. Также переключаются блоки, проставляется прогресс и идет проверка на нужность инструкции
 * @param {string} email - почта студента
 * @param {string} listName - номер или название теста или упражнения
 * @param {string} url - ссылка на таблицу
 */
function setData(email, listName, url) {
  tableTest.src = url;
  studentEmail.textContent = email;

  const btnText = getBtnText(listName);
  submitTestBtn.textContent = btnText;

  setProgress();
  toggleSctions();
  checkForInstructions(listName);
}

/**
 * Функция заполнения шкалы прогресса
 */
function setProgress() {
  const listIndex = sessionStorage.getItem("listIndex");
  const amountOfTests = sessionStorage.getItem("amountOfTests");

  const width = amountOfTests == 0 ? 100 : (listIndex * 100) / amountOfTests;
  progress.style.width = `${width}%`;
}

/**
 * Функция определяет текст кнопки по номеру теста
 * @param {string} listName - название или номер теста или упражнения 
 * @returns string текст для кнопки
 */
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

/**
 * Функция определяет текст кнопки в момент отправки теста по его номеру
 * @param {string} listName - название или номер теста или упражнения 
 * @returns string текст для кнопки
 */
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



headerBlocks.forEach((block) => {
  block.addEventListener("click", (e) => changeEnterBlock(e.target.value));
});

submitTestBtn.addEventListener("click", submitTest);
emailForm.addEventListener("submit", openTests);

popupBtn.addEventListener("click", closePopup);

instrCloseBtn.addEventListener("click", closeInstruction);
instrOpenBtn.addEventListener("click", showInstruction);

checkSessionStorage();
