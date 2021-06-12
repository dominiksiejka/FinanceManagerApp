const addBtn = document.querySelector(".controls").firstElementChild;
const removeBtn = document.querySelector(".controls").children[1];
const modal = document.getElementById("modal");
const exitModal = document.querySelector("#modal .inside i");
const submitData = document.getElementById("submit-data");
const allDataInputs = [...document.querySelectorAll(".opt-inside")];
const getElemnents = allDataInputs.map((itm) => itm.lastElementChild);
const outcomeList = document.getElementById("outcome-list");
const incomeList = document.getElementById("income-list");
let finalBudget = document.getElementById("owning-budget");
const changeColorWhite = document.getElementById("color-white");
const changeColorBlack = document.getElementById("color-black");

const changeColorToWhite = () => {
  document.documentElement.style.setProperty(
    "--colorMode",
    "rgba(255, 255, 255, 0.9)"
  );
  document.documentElement.style.setProperty(
    "--bgcMode1",
    "rgba(249, 86, 255, 0.8)"
  );
  document.documentElement.style.setProperty("--transcationsH2color", "black");
};
const changeColorToBlack = () => {
  document.documentElement.style.setProperty("--colorMode", "rgba(0,0,0,0.8)");
  document.documentElement.style.setProperty(
    "--bgcMode1",
    "rgba(253, 33, 88, 0.8)"
  );
  document.documentElement.style.setProperty("--transcationsH2color", "yellow");
};
changeColorBlack.addEventListener("click", changeColorToBlack);
changeColorWhite.addEventListener("click", changeColorToWhite);

const values = [];
const clearNumberFields = () => {
  outcomeList.textContent = "";
  incomeList.textContent = "";
};

const handleShowTitle = (title) => {
  alert("Saved message for this transaction: " + `" ${title} "`);
};

const createNewLi = () => {
  clearNumberFields();
  values.forEach((itm, index) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = `<span>$${itm.typedValue}</span><i class="fas fa-ban"></i>`;
    newLi.firstElementChild.addEventListener(
      "click",
      handleShowTitle.bind(this, itm.title)
    );
    const deletionBtn = newLi.querySelector("i");
    deletionBtn.addEventListener("click", handleDeleteLi.bind(this, index));
    if (itm.categoryType === "outgoings") {
      outcomeList.appendChild(newLi);
    } else if (itm.categoryType === "income") {
      incomeList.appendChild(newLi);
    }
  });
};
const handleDeleteLi = (index, e) => {
  console.log(e.target.closest("li"), index);
  values.splice(index, 1);
  createNewLi();
  handleAddMoneyToBudget();
};
const addIncome = () => {
  modal.style.display = "flex";
};

const handleCloseModal = () => {
  modal.style.display = "none";
  getElemnents.forEach((itm) => {
    itm.value = "";
    if (itm.id === "expense") {
      itm.value = "default";
    }
  });
};
handleColorChange = () => {
  if (parseFloat(finalBudget.textContent.replace("$", "")) > 0) {
    finalBudget.style.color = "greenyellow";
  } else if (parseFloat(finalBudget.textContent.slice(1)) < 0) {
    finalBudget.style.color = "red";
  } else if (finalBudget.textContent.slice(1) === "0.00") {
    finalBudget.style.color = "white";
  }
};
handleAddMoneyToBudget = () => {
  let score = 0;
  values.forEach((number) => {
    if (number.categoryType === "income") {
      score += parseFloat(number.typedValue);
    } else {
      score -= parseFloat(number.typedValue);
    }
  });
  finalBudget.textContent = `$${score.toFixed(2)}`;
  handleColorChange();
};
const handleSubmitData = () => {
  let input1 = false;
  let input2 = false;
  let input3 = false;

  if (getElemnents[0].value.length >= 6) {
    input1 = true;
  }
  if (getElemnents[1].value.trim() !== "") {
    input2 = true;
  }
  if (getElemnents[2].value !== "default") {
    input3 = true;
  }

  if (input1 && input2 && input3) {
    const infoObj = {
      typedValue: getElemnents[1].value,
      categoryType: getElemnents[2].value,
      title: getElemnents[0].value,
    };
    values.push(infoObj);
    createNewLi();
    handleAddMoneyToBudget();
    handleCloseModal();
  } else {
    alert("Please fill in all inputs in order to add new transaction!");
  }
};

const removeAllIncomes = function () {
  if (
    outcomeList.textContent.length !== 0 ||
    incomeList.textContent.length !== 0
  ) {
    values.length = 0;
    clearNumberFields();
    finalBudget.textContent = "0.00";
    finalBudget.style.color = "black";
  } else {
    alert("There is not a single transaction, first of all add some");
  }
};
getElemnents[1].addEventListener("input", (e) => {
  if (e.target.value.length > 6) {
    getElemnents[1].value = getElemnents[1].value.slice(0, 6);
  }
});
submitData.addEventListener("click", handleSubmitData);
exitModal.addEventListener("click", handleCloseModal);
addBtn.addEventListener("click", addIncome);
removeBtn.addEventListener("click", removeAllIncomes);
