const contactContainer = document.getElementById("contact-container");
const globalVariable = 1;

function getCurrentPageDetailById() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const id = Number(params.get("id"));

  return id;
}

const renderEditContactById = (id) => {
  const contact = loadContactById(id);

  const profileDetailDialog = document.getElementById("contact-dialog");
  const editContactFormComponent = `
     <div class="p-0 rounded-md">
       <div class="mb-4">
         <h1 class="text-3xl">Edit contact</h1>
       </div>
       <form id="edit-contact-form" class="w-full">
         <div class="mb-5">
           <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
           <input type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Irpan Padillah" required 
           value="${contact.fullName}"/>
         </div>
         <div class="mb-5">
           <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
           <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required 
           value="${contact.email}"/>
         </div>
         <div class="mb-5">
           <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
           <input type="tel" id="phone-number" name="phone-number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="+6289661456123" required
           value=${contact.phoneNumber} />
         </div>
         <div class="mb-5">
           <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
           <input type="text" id="company" name="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="PT ABC"
           value="${contact.company}" />
         </div>
        
         <div class="flex justify-end gap-3 mt-12">
            <button
              type="button"
              id="close-btn-edit-contact"
              class="text-stone-700 hover:bg-gray-100 rounded-full p-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-48 text-white bg-stone-950 hover:bg-stone-700 rounded-2xl p-3"
            >
              Save
            </button>
          </div>
       </form>    
     </div>
   `;

  profileDetailDialog.innerHTML = editContactFormComponent;
  profileDetailDialog.showModal();

  document
    .getElementById("close-btn-edit-contact")
    .addEventListener("click", () => {
      profileDetailDialog.close();
    });

  const editContactForm = document.getElementById("edit-contact-form");
  editContactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const contactFormData = new FormData(editContactForm);

    const currentContacts = getContacts();

    const editedContact = new Contact(
      (id = contact.id),
      (fullName = contactFormData.get("name")),
      (email = contactFormData.get("email")),
      (phoneNumber = contactFormData.get("phone-number")),
      (company = contactFormData.get("company")),
      (label = contact.label)
    );

    const updatedContacts = currentContacts.map((contactMap) => {
      if (contactMap.id === editedContact.id) {
        return editedContact;
      } else {
        return contactMap;
      }
    });

    setContacts(updatedContacts);
    profileDetailDialog.close();
    renderContactById();
  });
};

const renderDeleteContactById = (id) => {
  const profileDetailDialog = document.getElementById("contact-dialog");
  const contact = loadContactById(id);
  const elementDetail = `
      <form id="delete-contact-form">
          <h1 class="text-3xl">Delete from contacts?</h1>
          <input id="delete-contact-id" name="id" type="hidden" required />
          <p class="mt-6 text-gray-700">
            This contact will be permanently deleted from this account after 30
            days.
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
              type="button"
              id="remove-btn-contact-dialog"
              class="text-white bg-stone-950 hover:bg-stone-500 rounded-full p-3"
            >
              Move to trash
            </button>
          </div>
        </form>
    `;
  profileDetailDialog.innerHTML = elementDetail;
  profileDetailDialog.showModal();

  document
    .getElementById("close-btn-contact-dialog")
    .addEventListener("click", () => {
      profileDetailDialog.close();
    });

  document
    .getElementById("remove-btn-contact-dialog")
    .addEventListener("click", () => {
      deleteContactById(id);
      profileDetailDialog.close();
      window.location.replace("/");
    });
};

function renderContactById() {
  const id = getCurrentPageDetailById();
  const contact = loadContactById(id);

  console.log(contact);

  if (!contact) {
    contactContainer.innerHTML = "<p>User not found</p>";
    return;
  }

  contactContainer.innerHTML = `
        <div class="flex justify-between items-center mb-4 mt-8">
            <div class="flex items-center">
              <div class="rounded-full grid items-center text-center w-20 h-20 p-4 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300">
                <p class="text-gray-700 text-2xl">${contact.fullName[0]}</p>
              </div>
              <div class="ps-3 text-center text-2xl">
                ${contact.fullName}
              </div>
            </div>
            
            <div>
              <button onclick="renderEditContactById(${contact.id})" id="btn-contact-edit" type="submit" class="text-white bg-stone-950 hover:bg-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Edit
              </button>
  
              <button onclick="renderDeleteContactById(${contact.id})" id="btn-contact-remove" type="submit" class="text-black bg-stone-100 hover:bg-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Remove
              </button>
            </div>
          </div>
          <div class="p-8 rounded-xl bg-gray-100">
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900">Email</p>
                <p class="block mb-2 text-sm font-medium text-gray-700">${contact.email}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900">Phone Number</p>
                <p class="block mb-2 text-sm font-medium text-gray-700">${contact.phoneNumber}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900">Company</p>
                <p class="block mb-2 text-sm font-medium text-gray-700">${contact.company}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900">Label</p>
                <p class="block mb-2 text-sm font-medium text-gray-700">${contact.label}</p>
              </div>
          </div>
    `;
}

function initListener() {
  const btnAddContact = document.getElementById("btn-add-contact");
}

initListener();
renderContactById();
