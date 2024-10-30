const contactContainer = document.getElementById("contact-container");
const globalVariable = 1;

function getCurrentPageDetailById() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    console.log("this query string: "+queryString);
    console.log("this params: "+params);

    const id = Number(params.get("id"));

    return id;
}

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

    document.getElementById("close-btn-contact-dialog").addEventListener('click', () => {
      profileDetailDialog.close();
    });

    document.getElementById("remove-btn-contact-dialog").addEventListener('click', () => {
        deleteContactById(id);
        profileDetailDialog.close();
        window.location.replace("/");
    });
  }

function renderContactById() {
    const id = getCurrentPageDetailById();
    const contact = loadContactById(id);

    console.log(contact);

    if(!contact) {
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
              <button onclick="" id="btn-contact-edit" type="submit" class="text-white bg-stone-950 hover:bg-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit
              </button>
  
              <button onclick="renderDeleteContactById(${contact.id})" id="btn-contact-remove" type="submit" class="text-black bg-stone-100 hover:bg-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Remove
              </button>
            </div>
          </div>
          <div class="p-8 rounded-xl bg-gray-100">
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900 dark:text-white">Email</p>
                <p class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">${contact.email}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900 dark:text-white">Phone Number</p>
                <p class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">${contact.phoneNumber}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900 dark:text-white">Company</p>
                <p class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">${contact.company}</p>
              </div>
              <div class="mb-4">
                <p class="block mb-0 text-md font-medium text-gray-900 dark:text-white">Label</p>
                <p class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">${contact.label}</p>
              </div>
          </div>
    `;
};

renderContactById();