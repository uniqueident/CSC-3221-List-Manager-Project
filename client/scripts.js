const http = new jemHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector("#list-container");
const input =  document.querySelector("#new");
const addButton = document.querySelector("#add");
const delButton = document.querySelector("#delete");

// Listeners
/**
 * When the add button is clicked, take the input and add it to the list variable.
 * Then refresh the UI by using ShowList().
 */
addButton.addEventListener("click", (e)=>{
    e.preventDefault();

    const value = input.value.trim();

    if(!value)
        return;

    WriteList(value);
    ShowList();
});

delButton.addEventListener("click", (e)=>{
  e.preventDefault();
  
  httpDelete(e);
});

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

//returns whatever is in theList
//TODO: return theList to the html DOM
async function GetList() {
  
}
//writes new items to theList variable
//TODO: figure out how you write things to theList
async function WriteList(value) {
  theList.push(value);
}

/* Listener Functions */
async function httpPost(e) {
  console.log(`ADD BUTTON PRESSED: ${e.value}__ ${input.value}`);
  return;
  
}

async function httpDelete(e) {
  console.log(`DELETE BUTTON PRESSED: ${e.value}__ ${input.value}`);
  return;
}

// Loading functions
function showLoading() {
 result.innerHTML = "Loading...";
}

// async function main() {
//   addButton.disabled = true;
//   delButton.disabled = true;
//   showLoading();
//   await GetList();

//   addButton.disabled = false;
//   delButton.disabled = false;
// }

// main();
