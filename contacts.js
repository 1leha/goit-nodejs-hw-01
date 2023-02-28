const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

// Function readind data from contacts.json
async function readDB(dbFile) {
  try {
    const contactsFile = await fs.readFile(dbFile, "utf8");

    try {
      return JSON.parse(contactsFile);
    } catch (error) {
      console.log("JSON parse error!");
    }
  } catch (error) {
    console.log(`Read file error! >> `, error);
  }
}

// Function writind data to contacts.json
async function writeDB(dbFile, dbData) {
  try {
    await fs.writeFile(dbFile, JSON.stringify(dbData), "utf8");
  } catch (error) {
    console.log("File write error! >> ", error);
  }
}

// TODO: задокументировать каждую функцию

// Function consolind data from contacts.json
async function listContacts() {
  const contacts = await readDB(contactsPath);
  console.log("contacts :>> ", contacts);
}

// Function gettind data by ID
async function getContactById(contactId) {
  const contacts = await readDB(contactsPath);
  const contactById = contacts.find(({ id }) => +id === +contactId);
  if (!contactById) {
    console.log(`Contact with id: ${contactId} is not found!`);
    return;
  }
  console.log(`object by id:${contactId} :>> `, contactById);
}

// Function remove data by ID from db
async function removeContact(contactId) {
  const contacts = await readDB(contactsPath);
  const actualContacts = contacts.filter(({ id }) => +id !== +contactId);

  // Writing new data to db
  writeDB(contactsPath, actualContacts);
}

// Addind new conact to db
async function addContact(name, email, phone) {
  const contacts = await readDB(contactsPath);

  // Cereate ID for new contact.
  // I desided to use this method, to get same IDs format in whole contacts.json
  const lastId = +contacts[contacts.length - 1].id;
  const id = String(lastId + 1);
  const newConact = {
    id,
    name,
    email,
    phone,
  };

  const newConactArray = [...contacts, newConact];

  writeDB(contactsPath, newConactArray);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
