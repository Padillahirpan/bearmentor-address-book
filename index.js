
const contacts = [
   {
      id: 1,
      fullname: "Andreas Amba",
      phone: +6289661456234,
      email: "andreas.amba@gmail.com",
      addresses: [
         {
           country: 'Indonesia',
           city: 'Bandung',
           postalCode: '12345',
           street: 'Jl. Cihampelas',
         },
       ],
   },
   {
      id: 2,
      fullname: "Hinata Zom",
      phone: +62896613451,
      email: "hinata@gmail.com",
      addresses: [
         {
           country: 'Indonesia',
           city: 'Jakarta',
           postalCode: '12345',
           street: 'Jl. Kemang',
         },
       ],
   },
   {
      id: 3,
      fullname: "Numata Zhaira",
      phone: 100,
      email: "numata@gmail.com",
      addresses: [
         {
           country: 'Indonesia',
           city: 'Malang',
           postalCode: '12345',
           street: 'Jl. Merjosari',           
         },
       ],
   },
   
];

const printUser = (contact) => {
   return 'Name: ' + contact.fullname + '\n Email: ' + contact.email + '\n'
}

contacts.forEach (item =>
   console.log(printUser(item))
)


