const http = new jemHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector("#list-container");
const input =  document.querySelector("#new");
const addButton = document.querySelector("#add");

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

    console.log(theList);
});

/**
 * When the delete button is clicked, get the owner div and use the id to get the index in the list variable.
 * For every item div past the deleted item, the id needs to be decremented by 1 to match the new indices.
 */
result.addEventListener("click", (e)=>{
    e.preventDefault();

    if (e.target.id !== "delete")
        return;

    let id = e.target.parentNode.id;

    theList.splice(id, 1);
    ShowList();
    console.log(id);
});

/* Helper Functions */
function ShowList() {
    let output = "";

    let id = 0;
    for (const itm of theList) {
        output +=
            `<div id="${id}" class="item card">
                <input id="item" value="${itm}" />

                <svg id="delete" class="item-button" tabindex="0" viewBox="-0.5 -0.5 52 52">
                    <path d="M 13 13 C 11.9 13 11 12.1 11 11 C 11 9.9 11.9 9 13 9 L 21 9 L 21 7 L 31 7 L 31 9 L 39 9 C 40.1 9 41 9.9 41 11 C 41 12.1 40.1 13 39 13 Z" fill="#ffffff" />
                    <rect x="14" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
                    <rect x="23" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
                    <rect x="32" y="16" width="5" height="30" rx="3" ry="3" fill="#ffffff" />
                </svg>
            </div>`;

        id++;
    }

    result.innerHTML = output;
}

/**
 * Get's the list from the server.
 * Then updates the list variable and UI.
 */
async function GetList() {
    try {
        const resp = await http.get({ path: "/api" });

        if (resp.error)
            throw new Error(resp.error);

        if (Array.isArray(resp.data)) {
            theList = resp.data;

            ShowList();
        }
        else {
            console.error("Unexpected data from the server: ", resp);

            result.innerHTML = "<p style='color: red;'> Error: Invalid data.</p>";
        }
    }
    catch (err) {
        console.error("Failed to fetch list from server: ", err);

        result.innerHTML = "<p style='color: red;'>Failed to load list.</p>";
    }
}

/**
 * Writes an item to the list variable.
 * Then appends the new value to the server data.
 * 
 * @param {*} value 
 */
async function WriteList(value) {
    theList.push(value);

    try {
        await http.post("/api", { item: theList });
    }
    catch (err) {
        console.error("Failed to send item to server: ", err);

        result.innerHTML = "<p style='color: red;'>Failed to save item.</p>";
    }
}

// Loading functions
function showLoading() {
    result.innerHTML = "Loading...";
}

async function main() {
    addButton.disabled = true;

    showLoading();
    await GetList();

    addButton.disabled = false;
}

main();
