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
    let listOptions = `<option>---- انتخاب کنید ----</option>`;

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

    equipmentItems.forEach((item) => {
      listOptions += `
      <input type="checkbox" ${item.isChecked}>${item.title}</input>`;
      htmlSuggestedEquipmentList.innerHTML = listOptions;
    });
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
travelType.newItem("camping", "کمپینگ");
travelType.newItem("kohnavardi", "");
travelType.newItem("boomgardi", "");
travelType.newItem("kavirgardi", "");

// suggestedEquipments.newItem()
