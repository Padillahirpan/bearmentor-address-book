const setBaseContact = () => {
   const contacts = getContacts();
 
   if(contacts.length === 0) {
     setContacts(basesContact);
   }
 };
 
 const checkContact = () => {
   const trs = document.getElementById("contactsTableBody").getElementsByTagName("tr");
 
   for (tr of trs) {
     const link = tr.getAttribute("id");
     document.getElementById(link).addEventListener('click', () => {
       window.location.replace(link);
     });
   }
 };
 
 const renderData = () => {
   const contacts = getContacts();
 
   console.log(contacts.length);
 
   const contactsTableBody = document.getElementById("contactsTableBody");
   contactsTableBody.innerHTML = "";
 
   if(contacts.length == 0) {
     const item = `
       <div class="flex items-center max-w-full p-10">Data not found</div>
     `;
     contactsTableBody.innerHTML = item;
   } else {
     contacts.forEach((contact) => {
       const item = `
         <tr id="/detail-contact/?id=${contact.id}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer">
           <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
 
   const btnCloseContactDialog = document.getElementById("close-btn-contact-dialog");
   btnCloseContactDialog.addEventListener('click', () => {
     profileDetailDialog.close();
   });
 };
 
 const createProfileDetailDialog = () => {
   const profileDetailDialog = document.getElementById("addContactDialog");
   const addNewContactForm = `
     <div class="p-0 rounded-md">
       <div class="mb-4">
         <h1 class="text-3xl">Add new contact</h1>
       </div>
       <form class="max-w-sm">
         <div class="mb-5">
           <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
           <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Irpan Padillah" required />
         </div>
         <div class="mb-5">
           <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
           <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
         </div>
         <div class="mb-5">
           <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
           <input type="tel" id="phone-number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+6289661456123" required />
         </div>
         <div class="mb-5">
           <label for="comany" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
           <input type="text" id="compay" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PT ABC" />
         </div>
         <button type="submit" class="text-white bg-stone-950 hover:bg-stone-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
       </form>    
     </div>
   `;
 
   profileDetailDialog.innerHTML = addNewContactForm;
   
 };
 
 const initListener = () => {
   const btnAddContact = document.getElementById("btn-add-contact");
   const addContactDialog = document.getElementById("new-contact-dialog");
   const btnNewContactClose = document.getElementById("new-contact-dialog-btn-close");
   const newContactForm = document.getElementById("new-contact-form");
 
   btnAddContact.addEventListener('click', () => {
     addContactDialog.showModal();
   });
 
   btnNewContactClose.addEventListener('click', () => {
     addContactDialog.close();
   });
 
   newContactForm.addEventListener("submit", (event) => {
     event.preventDefault();
 
     const contactFormData = new FormData(newContactForm);
 
     const currentContacts = getContacts();
     const newId = currentContacts.length ? currentContacts[currentContacts.length - 1].id + 1 : 1;
 
     const newContact = new Contact(
       id = newId,
       fullName = contactFormData.get("full-name"),
       email = contactFormData.get("email"),
       phoneNumber = contactFormData.get("phone-number"),
       company = contactFormData.get("company"),
       label = "FRIEND"
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
   const contactFiltered = contacts.filter
 }
 setBaseContact();
 initListener();
 renderData();