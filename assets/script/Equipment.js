let travelType = {
  list: {},
  newItem: function (value, title) {
    if (!this.list[value]) {
      this.list[value] = title;
    }
    this.saveToLocalStorage();
  },
  removeItem: function (value) {
    delete this.list[value];
    this.saveToLocalStorage();
  },
  saveToLocalStorage: function () {
    localStorage.setItem("travelTypeList", JSON.stringify(this.list));
  },
  loadFromLocalStorage: function () {
    travelType.list = JSON.parse(localStorage.getItem("travelTypeList"));
  },
  showInPage: function () {
    const htmlSelectTravelType = document.querySelector("#traveltype"),
      travelList = Object.keys(travelType.list);
    let listOptions = ``;

    travelList.forEach((value) => {
      listOptions += `
      <option value=${value}>${this.list[value]}</option>`;
      htmlSelectTravelType.innerHTML = listOptions;
    });
  },
  showRelevantEquipments: function () {
    const htmlSelectTravelType = document.querySelector("#traveltype");
    suggestedEquipments.showInPage(htmlSelectTravelType.value);
  },
};

let suggestedEquipments = {
  list: {},
  newItem: function (category, title, isChecked = "unchecked") {
    if (!this.list[category]) {
      this.list[category] = [];
    }
    this.list[category].push({ title, isChecked });

    this.saveToLocalStorage();
  },
  removeItem: function (category, title) {
    const categoryArray = this.list[category];
    for (let i = 0; i < categoryArray.length; i++) {
      if (categoryArray[i].title == title) {
        this.list[category].splice(i, 1);
      }
    }

    this.saveToLocalStorage();
  },
  saveToLocalStorage: function () {
    localStorage.setItem("suggestedEquipmentsList", JSON.stringify(this.list));
  },
  loadFromLocalStorage: function () {
    suggestedEquipments.list = JSON.parse(
      localStorage.getItem("suggestedEquipmentsList")
    );
  },
  showInPage: function (category) {
    const htmlSuggestedEquipmentList = document.querySelector(
        "#SuggestedEquipmentList"
      ),
      equipmentItems = suggestedEquipments.list[category];
    let listOptions = ``;

    if (category == "") {
      htmlSuggestedEquipmentList.innerHTML = "";
    } else {
      equipmentItems.forEach((item) => {
        listOptions += `
        <div>
        <input type="checkbox" ${item.isChecked}>
        <label>${item.title}</label>
        </div>
        `;
        htmlSuggestedEquipmentList.innerHTML = listOptions;
      });
    }
  },
};

function appInit() {
  travelType.loadFromLocalStorage();
  travelType.showInPage();
}

// event listeners
document.addEventListener("DOMContentLoaded", appInit);
const htmlSelectTravelType = document.querySelector("#traveltype");
htmlSelectTravelType.addEventListener(
  "change",
  travelType.showRelevantEquipments
);

// create lists
travelType.newItem("", "");
travelType.newItem("camping", "کمپینگ");
travelType.newItem("kohnavardi", "کوهنوردی");
travelType.newItem("boomgardi", "بومگردی");
travelType.newItem("kavirnavadi", "کویرگردی");
//camp
suggestedEquipments.newItem("camping", "کیسه‌خواب");
suggestedEquipments.newItem("camping", "زیر انداز");
suggestedEquipments.newItem("camping", "پتو");
suggestedEquipments.newItem("camping", "وسایل شخصی");
suggestedEquipments.newItem("camping", "پاوربانک");
suggestedEquipments.newItem("camping", "پیکنینک مسافرتی");
suggestedEquipments.newItem("camping", "شارژر فندکی");
suggestedEquipments.newItem("camping", "چادر");
suggestedEquipments.newItem("camping", "وسایل پخت و پز مخصوص کمپ");
suggestedEquipments.newItem("camping", "هدلامپ ");
suggestedEquipments.newItem("camping", "جعبه‌ی کوچک کمک‌های اولیه ");
suggestedEquipments.newItem("camping", "قمقمه/بطری آب ");
//koh
suggestedEquipments.newItem("kohnavardi", "کوله پشتی");
suggestedEquipments.newItem("kohnavardi", "بوت یا کفش مخصوص کوهنوردی ");
suggestedEquipments.newItem("kohnavardi", "جوراب‌های کوهپیمایی پشمی");
suggestedEquipments.newItem("kohnavardi", "سوت");
suggestedEquipments.newItem("kohnavardi", "کلاه آفتابی");
suggestedEquipments.newItem("kohnavardi", "قمقمه/ بطری آب");
suggestedEquipments.newItem("kohnavardi", "عصای کوهنوردی");
suggestedEquipments.newItem("kohnavardi", "حداقل دو دست لباس");
suggestedEquipments.newItem("kohnavardi", " عینک کوهنوردی");
suggestedEquipments.newItem("kohnavardi", "اب و خوراکی");
suggestedEquipments.newItem("kohnavardi", " وسایل بهداشتی");
suggestedEquipments.newItem("kohnavardi", "حداقل دو دست لباس");
suggestedEquipments.newItem("kohnavardi", "پاوربانک");
//boom
suggestedEquipments.newItem("boomgardi", "مدارک شناسایی و دفترچه بیمه");
suggestedEquipments.newItem("boomgardi", "وسایل شخصی");
suggestedEquipments.newItem("boomgardi", "لباس ");
suggestedEquipments.newItem("boomgardi", "عینک و کلاه");
suggestedEquipments.newItem("boomgardi", "ضد آفتاب ");
suggestedEquipments.newItem("boomgardi", "پاور بانک");
suggestedEquipments.newItem("boomgardi", " وسایل بهداشتی");
suggestedEquipments.newItem("boomgardi", "پتوهای مسافرتی");
//kavir
suggestedEquipments.newItem("kavirnavadi", "کلمن و قمقمه آب");
suggestedEquipments.newItem("kavirnavadi", "سایه‌بان پایه‌دار ");
suggestedEquipments.newItem("kavirnavadi", "وسایل بهداشت شخصی ");
suggestedEquipments.newItem("kavirnavadi", "زیرانداز و پتوی مسافرتی");
suggestedEquipments.newItem("kavirnavadi", " کرم ضدآفتاب");
suggestedEquipments.newItem(
  "kavirnavadi",
  " اپلیکیشن‌های موقعیت‌ یابی افلاین و قطب نما "
);
suggestedEquipments.newItem("kavirnavadi", "چادر مناسب کویر ");
suggestedEquipments.newItem("kavirnavadi", "حشره‌کش");
suggestedEquipments.newItem("kavirnavadi", "  لباس تهیه شده از الیاف مصنوعی ");
suggestedEquipments.newItem("kavirnavadi", "دستمال محافظ");
suggestedEquipments.newItem("kavirnavadi", "صندل مخصوص پیاده‌روی در کویر");
suggestedEquipments.newItem("kavirnavadi", "قطره چشم");
suggestedEquipments.newItem("kavirnavadi", "ظرف نگهداری سوخت");
suggestedEquipments.newItem("kavirnavadi", "دستمال");

//Optional
const Optionalform = document.querySelector("#Optional"),
  textoptional = document.querySelector("#textoptional"),
  OptionalEquipmentList = document.querySelector("#OptionalEquipmentList"),
  removeOptionalitem = document.querySelector("#removeOptionalitem");

//eventlistner

Optionalform.addEventListener("submit", (e) => {
  e.preventDefault();
  const textOpti = textoptional.value;
  if (!textOpti) {
    alert("error");
    return;
  } else {
    //create  add new item
    submit();
  }
});

//function
//add new item optionallist
function submit() {
  const textopti = document.querySelector("#textoptional").value,
    OptionalEquipmentList = document.querySelector("#OptionalEquipmentList");
  const divitem = document.createElement("div");
  divitem.innerHTML = `
  <i>
       <input type="checkbox" >${textopti}</input><span  onclick="removeitemop(this.parentElement)"  ><img src="./assets/img/remove-icon.png" alt="remove-icon"></span>
   </i>`;
  OptionalEquipmentList.appendChild(divitem);
}

//remove

function removeitemop(e) {
  e.remove();
}
