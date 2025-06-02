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
  if(!value){
    return;
  }
  WriteList(value);
  ShowList();
  httpPost(e);
});

delButton.addEventListener("click", (e)=>{
  e.preventDefault();
  // theList.at(e.target.parentNode.id);
  
  httpDelete(e);
});

/* Helper Functions */
function ShowList() {
  let output = "";
  let num = 0;
  for (const itm of theList) {
    output += `<div id="${num++}" class="item card">
            <input id="item" value="${itm}" />

            <svg id="delete" class="item-button" tabindex="0" viewBox="-0.5 -0.5 52 52">
                <path d="M 13 13 C 11.9 13 11 12.1 11 11 C 11 9.9 11.9 9 13 9 L 21 9 L 21 7 L 31 7 L 31 9 L 39 9 C 40.1 9 41 9.9 41 11 C 41 12.1 40.1 13 39 13 Z" fill="#ffffff" />
                <rect x="14" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
                <rect x="23" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
                <rect x="32" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
            </svg>
        </div>`;
  }
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
