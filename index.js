const setBaseContact = () => {
  const contacts = getContacts();

  if (contacts.length === 0) {
    setContacts(basesContact);
  }
};

const checkContact = () => {
  const trs = document
    .getElementById("contactsTableBody")
    .getElementsByTagName("tr");

  for (tr of trs) {
    const link = tr.getAttribute("id");
    document.getElementById(link).addEventListener("click", () => {
      window.location.replace(link);
    });
  }
};

const searchContacts = (contacts, keyword) => {
  const searchedContact = contacts.filter((contact) => {
    return contact.fullName.toLowerCase().includes(keyword.toLowerCase());
  });
  return searchedContact;
};

const renderData = () => {
  const seachKeywordForElement = document.getElementById("search-input");
  const searchParams = new URLSearchParams(window.location.search);
  const keyword = searchParams.get("key");
  seachKeywordForElement.value = keyword;

  const contacts = getContacts();

  const contactsToDisplay = keyword
    ? searchContacts(contacts, keyword)
    : contacts;

  const contactsTableBody = document.getElementById("contactsTableBody");
  contactsTableBody.innerHTML = "";

  if (contactsToDisplay.length == 0) {
    const item = `
       <div class="flex items-center max-w-full p-10">Data not found</div>
     `;
    contactsTableBody.innerHTML = item;
  } else {
    contactsToDisplay.forEach((contact) => {
      const item = `
         <tr id="/detail-contact/?id=${contact.id}" class="bg-white border-b hover:bg-gray-100 hover:cursor-pointer">
           <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
             <div>
               ${contact.fullName}
             </div>
           </th>
           <td class="px-6 py-4">
             <div>
               ${contact.email}
             </div>
           </td>
           <td class="px-6 py-4">
             <div>
               ${contact.phoneNumber}
             </div>
           </td>
           <td class="px-6 py-4">
             <div>
               ${contact.company}
             </div>
           </td>
           <td class="px-6 py-4">
             <div>
               ${contact.label}
             </div>
           </td>
         </tr>
       `;
      contactsTableBody.innerHTML += item;
    });
  }
  checkContact();
};

const renderContactDetailDialog = (id) => {
  const profileDetailDialog = document.getElementById("contact-dialog");
  const contact = loadContactById(id);
  const elementDetail = `
     <form id="delete-contact-form">
       <h1 class="text-3xl">Delete from contacts?</h1>
       <input id="delete-contact-id" name="id" type="hidden" required />
       <p class="mt-6 text-gray-700">
         This contact will be permanently deleted from this account after 30 days.
       </p>
       <div class="flex justify-end gap-3 mt-12">
         <button
           type="button"
           id="close-btn-contact-dialog"
           class="text-stone-700 hover:bg-gray-100 rounded-full p-3"
         >
           Cancel
         </button>
         <button
           type="submit"
           class="text-white bg-stone-950 hover:bg-stone-500 rounded-full p-3"
         >
           Move to trash
         </button>
       </div>
     </form>
   `;
  profileDetailDialog.innerHTML = elementDetail;

  const btnCloseContactDialog = document.getElementById(
    "close-btn-contact-dialog"
  );
  btnCloseContactDialog.addEventListener("click", () => {
    profileDetailDialog.close();
  });
};

const initListener = () => {
  const btnAddContact = document.getElementById("btn-add-contact");
  const addContactDialog = document.getElementById("new-contact-dialog");
  const btnNewContactClose = document.getElementById(
    "new-contact-dialog-btn-close"
  );
  const newContactForm = document.getElementById("new-contact-form");

  btnAddContact.addEventListener("click", () => {
    addContactDialog.showModal();
  });

  btnNewContactClose.addEventListener("click", () => {
    addContactDialog.close();
  });

  newContactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const contactFormData = new FormData(newContactForm);

    const currentContacts = getContacts();
    const newId = currentContacts.length
      ? currentContacts[currentContacts.length - 1].id + 1
      : 1;

    const newContact = new Contact(
      (id = newId),
      (fullName = contactFormData.get("full-name")),
      (email = contactFormData.get("email")),
      (phoneNumber = contactFormData.get("phone-number")),
      (company = contactFormData.get("company")),
      (label = "FRIEND")
    );

    // Update by adding a new object in the array
    const updatedContacts = [...currentContacts, newContact];

    setContacts(updatedContacts);
    newContactForm.reset();
    addContactDialog.close();
    renderData();
  });
};

function getContactByLabel() {
  const contacts = getContacts();
  const contactFiltered = contacts.filter;
}
setBaseContact();
initListener();
renderData();
