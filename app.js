// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// // Define some built-in middleware
app.use(express.static("./client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
    console.log(req.query);

    try {
        const data = await fm.ReadData();

        res.status(200).json({ message: "Success", data: data });
    }
    catch (err) {
        console.error("Error reading data: ", err);

        res.status(500).json({ error: "Failed to read data" });
    }
});

app.post("/api", async (req,res) => {
    console.log("POST data: ", req.body);

    const { item } = req.body;

    if (!item || typeof item !== "string")
        return res.status(400).json({ error: "Invalid itme" });

    try {
        data = await fm.ReadData();
        data.push(item);

        const success = fm.WriteData(data);

        if (success)
            res.status(200).json({ message: "Item added", item });
        else
            res.status(500).json({ error: "Failed to write data" });
    }
    catch (err) {
        console.error("Error writing data: ", err);

        res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/:index", async (req, res) => {
    const index = parseInt(req.params.index);
    const { item } = req.body;

    if (isNaN(index) || typeof item !== "string")
        return res.status(400).json({ error: "Invalid request" });

    try {
        const data = await fm.ReadData();

        if (index < 0 || index >= data.length)
            return res.status(404).json({ error: "Item not found" });

        data[index] = item;
        const success = fm.WriteData(data);

        if (success)
            res.status(200).json({ message: "Item updated", index, item });
        else
            res.status(500).json({ error: "Failed to write data" });
    }
    catch (err) {
        console.error("Error updating item: ", err);

        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/:index", async (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index))
        return res.status(400).json({ error: "Invalid index" });

    try {
        data = await fm.ReadData();

        if (index < 0 || index >= data.length)
            return res.status(400).json({ error: "Item not found" });

        data.splice(index, 1);
        const dataOut = JSON.stringify(data, null, 2);
        const success = fm.WriteData(dataOut);

        if (success)
            res.status(200).json({ message: "Item deleted", index });
        else
            res.status(500).json({ error: "Failed to write data" });
    }
    catch (err) {
        console.error("Error deleting item: ", err);

        res.status(500).json({ error: "Server error" });
    }
});

// page not found route
app.use((req,res) => {
    res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 5000;
app.listen(port, () => {
    console.log(`App ${appName} is running on port ${port}`);
});