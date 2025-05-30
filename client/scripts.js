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

//uses theList variable somehow not really sure what this function is supposed to be used for exactly
//TODO: figure out what this does and how it does it
async function GetList() {
  
}
//writes something to theList variable
//TODO: figure out how you write things to theList
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