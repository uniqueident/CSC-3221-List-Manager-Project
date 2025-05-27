const http = new jemHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#new");
const addButton =  document.querySelector("#add");
const delButton =  document.querySelector("#delete");

// Listeners
addButton.addEventListener("click", (e)=>{
  WriteList();

  httpPost(e);
});
delButton.addEventListener("click", (e)=>{

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


async function GetList() {
  
}

async function WriteList() {

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

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();
  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();