let contacts = [];                                              // Här initieras en tom array för att lägga in kontakter

// Här hämtas alla HTML-element med deras Id
let nameInput = document.getElementById("name");                // Detta är input-fält för namn
let telInput = document.getElementById("tel");                  // Detta är input-fält för telefon
let createButton = document.getElementById("createButton");     // Detta är en knapp för att skapa en ny kontakt
let contactList = document.getElementById("contactList");       // Detta är en kontainer för att visa kontakter
let errorMessage = document.getElementById("errorMessage");     // Detta är ett element för error-meddelande

createButton.addEventListener("click", function () {            // Event listener för skapa-knappen när man klickar
    let name = nameInput.value;                                 // Hämtar värde från namn input-fält
    let telefon = telInput.value;                               // Hämtar värde från telefon input-fält

    if (!name || !telefon) {                                    // Om inte namn och telefon är ifyllda så visas ett error-medelande
        errorMessage.textContent = 'Får ej skapa tom kontakt';
    } else {
        errorMessage.textContent = '';                          // Tar bort tidigare error-meddelande
        const contact = { name, telefon, editable: false };     // Skapar ett kontaktsobjekt och lägger till det i kontakt-array
        contacts.push(contact);
        displayContacts();                                      // Kallar på funktionen för att visa den uppdaterade kontaktlistan
        nameInput.value = '';                                   // Tar bort i input-fält för namn 
        telInput.value = '';                                    // Tar bort i input-fält för telefon
    }
});

function displayContacts() {                                    // En funktion för att visa listan av kontakter
    contactList.innerHTML = "";                                 // Tar bort i kontaktlista-kontainer

    const ul = document.createElement("ul");                    // Skapar en oordnad lista-element för att ha i kontakter
    for (let i = 0; i < contacts.length; i++) {
        const li = document.createElement("li");

        if (contacts[i].editable) {
            // Om kontakten är i ett redigeringsläge, så skapa ett input-fält för namn och telefon
            let nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = contacts[i].name;
            li.appendChild(nameInput);

            let telInput = document.createElement("input");
            telInput.type = "tel";
            telInput.value = contacts[i].telefon;
            li.appendChild(telInput);

            let saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            li.appendChild(saveButton);

            saveButton.addEventListener("click", function () {              // En Event listener för spara-knappen vid redigeringsläge när man klickar
                let name = nameInput.value;
                let telefon = telInput.value;

                if (!name || !telefon) {                                    // Om inte namn och telefon är ifyllda så visas ett error-medelande
                    errorMessage.textContent = 'Får ej skapa tom kontakt';
                } else {
                    errorMessage.textContent = '';                          // Detta tar bort tidigare error-meddelande
                    // Uppdaterar namn och telefon, lämnar redigeringsläge och uppdaterar det som ska visas
                    contacts[i].telefon = telefon;
                    contacts[i].name = name;
                    contacts[i].editable = false;
                    displayContacts();
                }
            });
        } else {
            // Om kontakten inte är i redigeringsläge, visa deras namn och telefon med knappar
            let nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = contacts[i].name;
            nameInput.setAttribute("disabled", "true");         // Disabled i input-fältet så att det blir grått och ej redigerbart
            li.appendChild(nameInput);

            let telInput = document.createElement("input");     
            telInput.type = "text";
            telInput.value = contacts[i].telefon;
            telInput.setAttribute("disabled", "true");          // Disabled i input-fältet så att det blir grått och ej redigerbart
            li.appendChild(telInput);

            let editButton = document.createElement("button");
            editButton.textContent = "Ändra";
            li.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Radera";
            li.appendChild(deleteButton);

            editButton.addEventListener("click", function () {     // Event listener för ändra-knappen när man klickar
                contacts[i].editable = true;
                displayContacts();
            });

            deleteButton.addEventListener("click", function () {    // Event listener för radera-knappen när man klickar
                contacts.splice(i, 1);                              // Tar bort kontakt från array
                displayContacts();                                  // Uppdatera kontaktlistan
            });
        }

        ul.appendChild(li);
    }
    contactList.appendChild(ul);                // Lägger till en oordnad lista av kontakter till kontaktlistan 
}

let btnAllt = document.getElementById("deleteButton");              // Event listener för knappen som raderar hela listan när man klickar
btnAllt.addEventListener("click", function () {
    contacts = [];                                                  // Tar bort kontakt array
    displayContacts();                                              // Uppdatera kontaktlistan
});