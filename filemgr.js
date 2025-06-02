const fs = require("fs/promises")

/**
 * @brief Asynchrnonously attempts to read data from given file. (Assumes JSON).
 * 
 * @param {String} filepath File location relative to current file, or absolute path.
 * @returns On success returns contents of given file, otherwise error.
 */
async function ReadData(filepath ='./listdata.json') {
    try {
        //keeps the function async
        const data = await fs.readFile(filepath,'utf8');
        //needed for conversion. (SUCCESS)
        const parsed = JSON.parse(data);

        console.log(`Data Retrieved: ${parsed}`);

        return parsed;
    }
    catch (error) {
        //needed in case of failure.
        console.log(`FAILURE TO READ, REASON: ${error}`);

        return error;
    }
}


/**
 * @brief Asynchronously attempts to write data from given file.
 * 
 * @param {String} dataOut Data to write to the file.
 * @param {String} filepath File location relative to current file, or absolute path.
 * @returns {boolean} On success returns true, otherwise false.
 */
async function WriteData(dataOut,filepath = './listdata.json') {
  try {
        // Write the file
        await fs.writeFile(filepath, JSON.stringify(dataOut, null, 2));

        console.log(`Data Written: ${dataOut}`);

        return true;
    }
    catch (error) {
        console.log(`FAILURE TO WRITE, REASON: ${error}`);

        return false;
    }
}

/**
 * @brief Asynchronously attempts to append given data to file. (Does not create a json object to modify, just appends to the end of the file)
 * 
 * @param {String} data Data to append.
 * @param {String} filepath File location relative to current file, or absolute path.
 * @returns {boolean} On success returns true, otherwise false.
 */
async function AppendData(data,filepath = './listdata.json'){
    try{
        fs.appendFile(filepath, data);

        console.log(`Data Appended: ${data}`);

        return true;
    }
    catch(error) {
        console.log(`FAILURE TO APPEND, REASON: ${error}`);

        return false;
    }
}

exports.AppendData = AppendData;
exports.ReadData = ReadData;
exports.WriteData = WriteData;
