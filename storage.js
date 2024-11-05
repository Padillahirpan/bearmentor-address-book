const basesContact = [
  // {
  //   id: 1,
  //   fullName: "John Doe",
  //   email: "johndoe@mail.com",
  //   phoneNumber: "+6285712345678",
  //   company: "PT DELL",
  //   label: "FRIEND",
  // },
  // {
  //   id: 2,
  //   fullName: "Dani Alonso",
  //   email: "dani-alonso@mail.com",
  //   phoneNumber: "+6285712345678",
  //   company: "PT OBM",
  //   label: "FAMILY",
  // },
];

class Contact {
  constructor(id, fullName, email, phoneNumber, company, label) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.company = company;
    this.label = label;
  }
}

const getContacts = () => {
  const contacts = localStorage.getItem("contacts");
  if (!contacts) {
    setContacts([]);
  }

  try {
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to load contacts", error);
  }
};

const setContacts = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const goToHomePage = () => {
  window.location = "/";
};

function loadContactById(id) {
  const contacts = getContacts();
  const contact = contacts.find((cont) => cont.id === id);

  return contact;
}

function deleteContactById(id) {
  const contacts = getContacts();
  const updatedContact = contacts.filter(
    (contact) => contact.id !== Number(id)
  );

  setContacts(updatedContact);
}
