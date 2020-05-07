let divMyBooks = document.getElementById("myBooks");
    
let addBookButton = document.createElement("button");
    addBookButton.id = "addABook";
    addBookButton.innerHTML = "Ajouter un livre";
    divMyBooks.appendChild(addBookButton);

let searchForm = document.createElement("div");
    searchForm.id = "search";
    divMyBooks.appendChild(searchForm);

let divFieldBlocs = document.createElement("div");
    divFieldBlocs.id = "blocFields";
    searchForm.appendChild(divFieldBlocs);

let bookTitleLabel = document.createElement("label");
    bookTitleLabel.innerHTML = "Titre du Livre";
    divFieldBlocs.appendChild(bookTitleLabel);

let bookTitleInput = document.createElement("input");
    bookTitleInput.id = "bookTitle";
    bookTitleInput.type = "textarea";
    divFieldBlocs.appendChild(bookTitleInput);

let authorLabel = document.createElement("label");
    authorLabel.innerHTML = "Auteur";
    divFieldBlocs.appendChild(authorLabel);

let authorInput = document.createElement("input");
    authorInput.id = "author";
    authorInput.type = "textarea";
    divFieldBlocs.appendChild(authorInput);

let errorMessage = document.createElement("p");
    divFieldBlocs.appendChild(errorMessage);
    errorMessage.innerHTML = "Vous devez renseigner à la fois le titre et le nom de l'auteur";
    errorMessage.id = "errorMessage";
    errorMessage.style.color ="red";
    errorMessage.style.display = "none";

let divButtons = document.createElement("div");
    divButtons.id = "buttons";
    searchForm.appendChild(divButtons);

let searchButton = document.createElement("button");
    searchButton.id = "searching";
    searchButton.innerHTML = "Rechercher";
    divButtons.appendChild(searchButton);

let resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.innerHTML = "Annuler";
    divButtons.appendChild(resetButton);


let resultSection = document.createElement("section");
    resultSection.id = "results";
    divMyBooks.appendChild(resultSection);

let resultSectionTitle = document.createElement("h2");
    resultSectionTitle.innerHTML = "Résultats de recherche";
    resultSectionTitle.className = "h2";
    resultSection.appendChild(resultSectionTitle);
    resultSectionTitle.style.display = "none";

let messageNoFoundBook = document.createElement("h2");
    messageNoFoundBook.innerHTML = "Aucun livre n'a été trouvé";
    messageNoFoundBook.className = "h2";
    resultSection.appendChild(messageNoFoundBook);
    messageNoFoundBook.style.display ="none";

let bookItems = document.createElement('div');
    bookItems.className = "bookItems";
    resultSection.appendChild(bookItems);

let myPochListSection = document.getElementById("content");
    divMyBooks.appendChild(myPochListSection);

let myPochListTitle = document.querySelector("#content h2");
    myPochListTitle.className = "h2";

let bookItemsPochlist = document.createElement('div');
    bookItemsPochlist.className = "bookItems";
    myPochListSection.appendChild(bookItemsPochlist);

let breakLine = document.querySelector("hr");
    divMyBooks.removeChild(breakLine);
    divMyBooks.insertBefore(breakLine, myPochListSection);