const apiUrl =
  "https://script.google.com/macros/s/AKfycbxd2xduI-ZenJvVTOC9eT-EIZjfzxMTS9jzoHoUjIdOV8Rof-5EXs85SpGYG22HJaQJ/exec";

const numberOfTests = 28; //количестов тестов без Колеса (только номерные тесты). ---при необходимости изменить
const numberOfExercises = 3; //количестов упражнений. ---при необходимости изменить

// ключи - название упражнений, далее массив с правилами. В массиве строки/абзацы - это элементы массива
const exerciseInstructions = {
  У1: [
    `Упражнение «Быть-Делать-Иметь»`,

    `Это упражнение поможет вам при <span class="bold">формулировке целей</span>. Необходимо заполнить <span class="bold">от 15 до 20</span> пунктов. Обратите внимание, что должно быть заполнено <span class="bold">одинаковое количество ячеек</span> во всех 3-х столбцах.`,

    `В <span class="bold">столбце «Быть»</span> запишите Кем вы когда-либо хотели стать.`,
    `<span class="example">Пример: <span class="green">Хочу стать водителем легкового автомобиля</span>.</span>`,

    `В <span class="bold">столбце «Делать»</span> запишите Что вы когда-либо хотели делать.`,
    `<span class="example">Пример: <span class="green">Ездить на своей машине в путешествия по стране</span>.</span>`,

    `В <span class="bold">столбце «Иметь»</span> запишите Что вы когда-либо хотели получить.`,
    `<span class="example">Пример: <span class="green">Хочу иметь полноприводный автомобиль типа Джип, с высокой подвеской, большим багажником и мощным двигателем</span>.</span>`,

    `Необходимо вспомнить все ваши “хотелки” из детства и заполнить соответствующие столбики. Правила просты: <span class="bold">точные формулировки</span> и <span class="bold">полные данные</span>. Хронологию соблюдать не нужно.`,

    `<ul><li class="asTitle">Заполнять необходимо следующим способом:</li>
    <li>Начинаем со столбика «Быть» - выписываем все варианты, которые у вас когда либо были, тем кем вы когда-либо хотели быть.</li>
    <li>Следующий столбик «Делать» - здесь вы пишите что хотели когда-либо сделать или чем-то заниматься.</li>
    <li>Последний столбец «Иметь» - выписываете все ваши “хотелки”: что хотите сейчас или хотели раньше иметь в своей жизни.</li></ul>`,
    `
    Не обязательно проводить связь между всеми столбцами, как в примере, это могут быть совершенно <span class="bold">не связанные между собой</span> идеи.
    `,
  ],
  У2: [
    `Упражнение «Опыт»`,

    `В таблице необходимо написать <span class="bold">от 10 до 20</span> примеров <span class="bold">опыта</span>, который был у Вас на протяжении всей жизни. При этом важно, чтобы этот опыт был выбран <span class="bold">из всех жизненных этапов</span> (в зависимости от возраста: детство, юность, студенческие годы, молодость, зрелость, нынешний период времени).`,

    `<ul><li class="asTitle">Важные правила:</li>

    <li>Опыт должен быть конкретным. Пример: <span class="green">Участие в олимпиаде по химии</span>.</li>
    <li>Проанализируйте полученный опыт и определите результат, которого вы достигли, и ваши достижения (т.е. чему вы научились в процессе).</li>

    <li>Записывайте опыт в <span class="bold">хронологическом порядке</span>.</li></ul>`,
    `В <span class="bold">столбце «Дата»</span> укажите только год, если не помните месяц или конкретную дату.`,
    `<span class="example">Пример: <span class="green">05.05.2020</span> или <span class="green">май 2020</span> или <span class="green">2020<span>.</span>`,

    `В <span class="bold">столбце «Мероприятие»</span> запишите общее название мероприятия, самую суть, кратко.`,
    `<span class="example">Пример: <span class="green">Олимпиада по химии</span>.</span>`,

    `В <span class="bold">столбце «Результат»</span> укажите конкретные результаты данного мероприятия, кратко.`,
    `<span class="example">Пример: <span class="green"> Набрал(а) 100 баллов</span> или <span class="green">Занял(а) 2-е место</span>.</span>`,

    `В <span class="bold">столбце «Роль»</span> укажите вашу роль в данном опыте.`,
    `<span class="example">Пример: <span class="green">Участник(ца)</span> или <span class="green">Организатор</span>.</span>`,

    `В <span class="bold">столбце «Достижения / чему научились»</span> запишите что вы узнали или чему научились.`,
    `<span class="example">Пример: <span class="green">Научился(лась) решать задания по теме «Типы химической связи»</span>.</span>`,
  ],
  У3: [
    `Упражнение «Значимый опыт»`,

    `В таблице необходимо написать <span class="bold">от 10 до 20</span> примеров <span class="bold">значимого опыта</span>, который был у Вас на протяжении всей жизни. При этом важно, чтобы этот опыт был выбран <span class="bold">из всех жизненных этапов</span> (в зависимости от возраста детство, юность, студенческие годы, молодость, зрелость, нынешний период времени), а также <span class="bold">минимум 2</span> опыта были связаны с <span class="bold">профессиональной деятельностью</span>.`,

    `<ul><li class="asTitle">Важные правила:</li>

    <li>Опыт считается <span class="bold">значимым</span>, если вы получили <span class="bold">удовольствие</span> И от процесса, И от результата</span>! Опыт, в котором было только одно, в зачёт не идёт.</li>

    <li>Опыт должен быть <span class="bold">конкретным</span>. Не «занятия танцами», а конкретное выступление на сцене, или постановка конкретного номера.</li>

    <li>Опыт из обучения лучше переводить в <span class="bold">практику применение</span> полученных знаний. Обучение, как значимый опыт указывать не нужно, это даёт мало компетенций. Важно учесть как знания применены и выявить тот опыт, в котором нравилось не только учиться, но и применять знания.</li>

    <li><span class="bold">Результат не важнее процесса</span>. Нередко выписывается опыт, где нравится результат, особо не осознавая, что страдали, пока его получали.</li> 

    <li><span class="bold">Субъективная оценка результата</span>. Иногда сложно выбрать значимый опыт из-за того, что завышается планка результата. Важно понимать, что результатом может быть и вполне <span class="bold">обычная вещь</span> (сваренный суп, состоявшийся праздник, созданная таблица, помощь другу), лишь бы Вам самому казалось, что этот <span class="bold">результат имеет смысл</span>. То есть мы не пишем исключительно про победы, дипломы и медали, банальный опыт не менее важен. Именно он и показывает, чем нравится заниматься ежедневно.</li>

    <li>Записывайте опыт в <span class="bold">хронологическом порядке</span>. Точная последовательность не так важна. Если где-то перепутаете местами значимый опыт – это никак не повлияет на ход анализа. Главное, чтобы общая линия хронологии сохранялась.</li></ul>`,

    `В <span class="bold">столбце «Дата»</span> укажите только год, если не помните месяц или конкретную дату.`,
    `<span class="example">Пример: <span class="green">05.05.2020</span> или <span class="green">май 2020</span> или <span class="green">2020<span>.</span>`,

    `В <span class="bold">столбце «Значимый опыт (описание)»</span> запишите общее название опыта, самую суть, кратко.`,
    `<span class="example">Пример: <span class="green">Нарисовать афишу для концерта в школе</span>.</span>`,

    `В <span class="bold">столбце «Почему этот опыт состоялся? Мотивация, зачем»</span> укажите причины, по которым состоялся опыт, и свою мотивацию. Задайте себе вопросы: «зачем я это делал(а)?», «зачем согласился(лась) принять участие в проекте/мероприятии?», «какие цели преследовал(а)?».`,
    `<span class="example">Пример: <span class="green">Подготовили программу концерта и нужно было сделать афишу. Задача стояла такая, чтобы на афише была не только информация о времени и месте проведения концерта, но и картинка создающая интригу, чтобы захотелось пойти. Руководитель сказала сделать его на свой вкус<span>.</span>`,

    `В <span class="bold">столбце «Как: условия реализации, список предварительных задач, включающий время на размышление, моральную подготовку, далее сам ход событий, итог» </span> запишите ход событий и основные реперные точки опыта, которые позволили отнести его к значимому. А именно – что Вы делали с удовольствием в этом опыте, к какому результату опыт привел, в чём он выражался.`,
    `<span class="example">Пример: <span class="green">Страх сделать так, что другим не понравится или не заинтересует. Долго обдумывал идею, мониторил тренды, провел небольшой опрос по знакомым и одноклассникам. Сделал три эскиза и провел опрос, подобрал варианты с цветовой палитрой на маленьких эскизах, чтобы перенести на ватман потом, попробовал несколько техник рисования, провел опрос по эскизам. Немного добавил фантазии еще и перенес эскиз на большой ватман. Сделал 3 ватмана и за 2 недели до концерта афиша была готова, запустили рассылки в школьных чатах с нашей афишей. На концерт пришло очень много учеников, учителей, пришли даже те, кто вообе никогда не ходил на школьнфе концерты. Концерт состоялся и вызвал много эмоций, в завершении концерта давали благодарности всем участникам и помощникам<span>.</span>`,

    `В <span class="bold">столбце «Признание со стороны: руководство, близкие, коллеги, друзья,...» </span> укажите люди, которые порадовались результату, признали его стоящим. Если таких людей нет, то можно указать самого себя.`,
    `<span class="example">Пример: <span class="green">Организаторы оценили результат. Говорили, что профессионально подошел к выполнению задачи<span>.</span>`,
  ],

  "Колесо баланса": [
    `Упражнение «Колесо баланса»`,

    `Это отличное упражнение поможет провести <span class="bold">диагностику вашей жизни</span> на текущий момент. В результате анализа состояния каждой сферы вашей жизни, можно сделать определенные выводы и наметить цели по их коррекции.`,

    `<ul><li class="asTitle">Из чего состоит наша жизнь? Из разных сфер, таких как:</li> 
    <li>Окружение и общение</li>
    <li>Хобби</li>
    <li>Дом</li>
    <li>Развлечение и отдых</li>
    <li>Друзья и приятели</li>
    <li>Здоровье</li>
    <li>Семья</li>
    <li>Творчество</li>
    <li>Свободное время</li>
    <li>Красота, имидж, стиль</li>
    <li>Спорт</li>
    <li>Финансы</li></ul>`,

    `Представьте себе пиццу, разрезанную на слайсы или сегменты. Каждый <span class="bold">сегмент</span> пиццы – это определенная <span class="bold">сфера вашей жизни</span>.
    Вы не задумываетесь о временных рамках. Колесо баланса можно сделать в рамках одного дня, года или целой жизни.`,

    `Для анализа нужно сделать колесо на <span class="bold">текущий момент</span> времени.Каждый сектор необходимо отметить по 10-ти бальной шкале: где <span class="bold">0 – полностью не удовлетворен</span> этим сектором жизни, а <span class="bold">10 – максимально удовлетворен</span>, устраивать все, даже добавить нечего.`,

    `<ul><li class="asTitle">Для выполнения упражнения необходимо:</li>
    <li>Оцените <span class="bold">все сферы</span> жизни по <span class="bold">10</span> бальной шкале.</li>
    <li>Заполните колонку <span class="bold">"Значение"</span>. Баллы по каждой сфере выбирайте <span class="bold">из выпадающего списка</bold>.</li>
    <li>После отправки результатов откроется лист с <span class="bold">Вашим Колесом баланса</span>. Не торопитесь и <span class="bold">изучите</span> его перед завершением тестирования.</li></ul>`,
  ],
  28: [
    `Тест интеллекта Г.Айзенка (Тест IQ)`,

    `На выполнение теста дается ровно <span class="bold">30 минут</span>! Таймер <span class="bold">запустится автоматически</span> после закрытия инструкции. Когда останется меньше 1-ой минуты, таймер начнет моргать. По истечении времени времени ваши ответы отправятся автоматически. Вы также можете отправить их самостоятельно, если готовы закончить раньше.`,
    `
    <span class="bold">Не задерживайтесь</span> слишком долго над одним заданием. Быть может, вы находитесь на ложном пути и <span class="bold">лучше перейти к следующей задаче</span>. Но и не сдавайтесь слишком легко; большинство заданий <span class="bold">поддается решению</span>, если вы – проявите немного настойчивости. Продолжать размышлять над заданием или отказаться от попыток и перейти к следующему – подскажет здравый смысл. Помните при этом, что к концу серии <span class="bold">задания становятся в общем труднее</span>. У вас достаточно времени, чтобы справиться со всеми заданиями (40 вопросов за 30 минут пройти можно, даже быстрее). Важно сделать <span class="bold">фокус на задании</span> и выбрать <span class="bold">правильный вариант на ваш взгляд</span>.`,

    `Ответ на задание может состоять из числа, буквы, слова. <span class="bold">Внимательно читайте</span> вопрос и правила оформление ответа. В некоторые ячейки вам нужно вписать ответ самостоятельно, в некоторых выбрать из выпадающего списка. Если ячейка горит зеленым, значит ответ добавлен в таблицу и будет учитываться при подсчете результатов.`,

    `Отвечайте, даже если не уверены в ответе. Но не пишите наугад.`,

    `Тест не содержит «каверзных» заданий, но всегда приходится рассмотреть несколько путей решения. Прежде чем приступить к решению, <span class="bold">удостоверьтесь, что вы правильно поняли</span>, что от вас требуется. Вы напрасно потеряете время, если возьметесь за решение, не уяснив, в чем состоит задача.`,

    `<ul><li class="asTitle">Примечания:</li>
    <li>Нижнее подчеркивание обозначает <span class="bold">количество букв</span> в пропущенном слове. Например, ( _ _ _ _ ) означает, что пропущенное слово состоит из 4-х букв.</li>
    <li>Для решения некоторых заданий потребуется использовать последовательность <span class="bold">букв русского алфавита</span> (без буквы «ё»).</li>
    <li>Для ответа на задания с фигурами, картинками и символами, выберете <span class="bold">из выпадающего списка</span> число, которое соответствует необходимому варианту.</li></ul>`,
  ],
};



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

const timer = document.querySelector(".timer");



let testsNames = []; // массив, куда функция ниже добавит необходимое количество листов, включая тесты, упражнения (+КБ и КБ результат), приветствие и прощанеи

/**
 * Цикл наполняет массив testsNames названиеями тестов, упражнений и доп.листов
 */
for (let i = 0; i <= numberOfTests + numberOfExercises; i++) {
  switch (i) {
    case 0:
      testsNames.push(["Введение"]);
      break;

    case numberOfTests + numberOfExercises:
      testsNames.push(
        [`У${i - numberOfTests}`],
        ["Колесо баланса"],
        ["Колесо: результат"],
        ["Заключение"]
      );
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

// console.log(testsNames); // пока оставила, чтобы всегда была возможность отследить их до начала работы

// дефолтные значения для таймера
const timerData = {
  time: 1800, // общее время на тест в секундах - 30 минут
  timerHasStarted: false, // был ли таймер уже запущен
  isFlashing: false, // мигание времени
  startFlashging: { // время, с которого таймер начинает мигать
    forMinutes: "00",
    forSeconds: "59",
  },
};

let intervalId; // переменна для setInterval, чтобы потом можно было удалить его
let time = timerData.time;
let timerHasStarted = timerData.timerHasStarted;
let isFlashing = timerData.isFlashing;

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

  checkForTimer(true);

  setTimeout(() => {
    instructionModal.style.display = "none";
  }, 150); // таймер ждет, пока пройден анимация ухода окна и затем полностью отключает блок
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
  if (
    /^У\d+/.test(listName) ||
    listName == "Колесо баланса" ||
    listName == 28
  ) {
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
  });
}

/**
 * Функция очистки. Цикл проверяет есть ди в блоке 1-ый элемент и если да, то удаляет его
 */
function clearInstructionBlock() {
  while (instrTextBlock.firstChild)
    instrTextBlock.removeChild(instrTextBlock.firstChild);
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
  // item.textContent = text;
  item.innerHTML = text;
  return item;
}

/**
 * Функция проверки нужно ли показывать таймер
 * @param {boolean} hasReadInstructions - была ли прочитана инструкция
 */
function checkForTimer(hasReadInstructions) {
  const listName = sessionStorage.getItem("listName");
  // Если это не 28 тест, таймер не нужен
  if (listName != 28) return;

  timerHasStarted = sessionStorage.getItem("timerHasStarted") != null && true;

  /**
   * Проверка: инструкция прочитана И таймер еще НЕ запущен
   *    если да -> запускается таймер, данные записываются в sessionStorage
   */
  if (hasReadInstructions && !timerHasStarted) {
    timerHasStarted = true;
    time = timerData.time;

    sessionStorage.setItem("timerHasStarted", timerHasStarted);
    sessionStorage.setItem("time", time);
  }

  /**
   * Проверка: логика - таймер не запускался, инструкцию не читали
   *    если да -> время не будет отсчитываться
   */
  if (!(timerHasStarted || hasReadInstructions)) return;

  const storageTime = sessionStorage.getItem("time", time);
  time = isNaN(storageTime) ? time : storageTime;

  timer.classList.remove("timer_hide");
  instrOpenBtn.classList.add("instrBtn_withTimer");

  timerHasStarted = true;
  sessionStorage.setItem("timerHasStarted", timerHasStarted);

  startTimer();
}

/**
 * Функция, создающая setInterval, вложенная функция будет вызывыться каждую секунду
 */
function startTimer() {
  /**
   * Если есть значение есть, то выходим из функции, чтобы не создавать новые setInterval
   */
  if (intervalId != undefined) return;

  intervalId = setInterval(() => {
    updateCountdown();
  }, 1000);
}

/**
 * Функция обновления времени на таймере
 */
function updateCountdown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  // добавляет 0 перед однозначными числами, чтобы таймер выглядел аккуратно
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  timer.textContent = `${minutes}:${seconds}`;
  time--;

  sessionStorage.setItem("time", time);

  /**
   *  Проверка: минуты и секунды ниже или равны пороговым значениям для начала мигания и мигание еще не было добавлено
   *    если да -> добавляет класс, чтобы таймер начал мигать
   */
  if (
    minutes <= timerData.startFlashging.forMinutes &&
    seconds <= timerData.startFlashging.forSeconds &&
    !isFlashing
  ) {
    timer.classList.add("timer_highlight");
    isFlashing = true;
  }

  /**
   * Проверка: переменная time равняется -1 (на таймере показано 00:00 => тестирование должно быть прекращено)
   *    если да -> вызываются функции очистки таймера и отправки данных на сервер
   */
  if (time == -1) {
    clearTimer();
    submitTest();
  }
}

/**
 * Функция очистки таймера, возвращения значений к дефолтным, удаления данных таймера из sessionStorage и setInterval
 */
function clearTimer() {
  time = timerData.time;
  timerHasStarted = timerData.timerHasStarted;
  isFlashing = timerData.isFlashing;

  sessionStorage.removeItem("timerHasStarted");
  sessionStorage.removeItem("time");

  timer.classList.add("timer_hide");
  timer.classList.remove("timer_highlight");
  instrOpenBtn.classList.remove("instrBtn_withTimer");

  clearInterval(intervalId);
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

    const isFirstTime = document.querySelector(
      "input[name=isFirstTime]:checked"
    ).value;
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
async function openTests(e) {
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
}

/**
 * Асинхронная функция посылающая POST запрос: отправляет почту и получает данные, необходимые для тестирования (переключение тестов)
 * @param {object} e - событие
 */
async function submitTest(e = null) {
  if (e != null) e.preventDefault();

  // если setInterval не был очищен, то принудительно очищаем перед отправкой результатов
  if (intervalId != undefined) clearTimer();

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
  checkForTimer(false);
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

// console.log(
//   `---> время ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
// );