const fs = require("fs/promises")

async function ReadData(filepath ='./listdata.json') {
  try {
    fs.readFile(filepath,'utf8',(error,data));
    if(error){
      throw new Error(`Unable to read file! FILE:${filepath}`);
    }
    // Make sure the file exists
    // Read the file
    // convert the buffer to a json object and return it
  } catch (error) {
    console.log(`${error}`)
    return error;
  }
}

async function WriteData(dataOut) {
  try {
    // Write the file

  } catch (error) {


  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
