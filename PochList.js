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

    addBookButton.addEventListener("click", () => {
        searchForm.style.display = "block";
        addBookButton.style.display = "none";
    });

    resetButton.addEventListener("click", () => {
        cleanData ();
       
     });
 
 
     function cleanData () {
     
       authorInput.value = "";
       bookTitleInput.value ="";
       addBookButton.style.display = "block"; 
       searchForm.style.display = "none";
       resultSection.style.display = "none";
       errorMessage.style.display = "none";
       bookItems.innerHTML = ""; 
       
       if(isInPochlist) displayBooks (book, true);
 
     }
       
     var bookTitleSearched;
     var authorSearched;
     var isNewSearch;
     var isInPochlist;

    searchButton.addEventListener('click', () => {
        
      if((bookTitleInput.value == '') || (authorInput.value == '')) {
         errorMessage.style.display ="block";
      
        } else {
      
      errorMessage.style.display  ="none";
      bookTitleSearched           = bookTitleInput.value;
      authorSearched              = authorInput.value;
      searchBooks(bookTitleSearched,authorSearched);
      resultSection.style.display = "block";
    }

      if(isInPochlist) displayBooks (book, true); 

    });


function searchBooks (bookTitleSearched, authorSearched) {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + bookTitleSearched + '+inauthor:'+ authorSearched +'&key=AIzaSyCnc1UAUzaVJF7MnVL49PUaRdHplB0daDg';
  
  const encodedURL = encodeURI(url);
  let request = new XMLHttpRequest(); // We create an object that will allow us to make requests

  request.open('GET', url); // We are just recovering data
    
  request.responseType = 'json'; // We are waiting for Json format
  
  request.send(); // We send our request

  // Once we get a response, this function will be executed
  request.onload = function() {
    
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {

      let response = request.response;

      
      // If results are already displayed on the results section, clean the results before displaying other books items
      if(!isNewSearch) bookItems.innerHTML = "";

      // Check if results are found 
      if(response.totalItems!= 0) {
              
             
              resultSectionTitle.style.display = "block";
              messageNoFoundBook.style.display ="none";
              for(let i = 0; i < 10; i++) {
                  if(response.items[i]) displayBooks(response.items[i], false); 
              }
        
       //If not, display a message on the result section.  
      } else {
     
        messageNoFoundBook.style.display ="block";
        resultSectionTitle.style.display = "none";
              }
    
    isNewSearch = false;

    } else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    }
}


function displayBooks(book, isInPochlist){ 
  
    var bookTitle                       = book.volumeInfo.title ? book.volumeInfo.title : "PAS DE TITRE";
    var bookId                          = book.id; 
    var bookAuthor                      = book.volumeInfo.authors[0];
    var bookDescription                 = book.volumeInfo.description ? book.volumeInfo.description : "Description manquante"; 
    var bookCoverLink                   = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "Images/unavailable.png" ;
   
   
    var bookItem                        = document.createElement("div"); 
        bookItem.className              = "bookItem";
        if(!isInPochlist) {

          bookItems.appendChild(bookItem);
           
        } else {

          bookItem.setAttribute ('data-id', bookId);  
          bookItemsPochlist.appendChild(bookItem);  
         
        }
        

    var headerSection                   = document.createElement('div');
        headerSection.className         ="headerSection";
        bookItem.appendChild (headerSection);


    var bookMarkIcon                    = document.createElement ('i');
       
        if(!isInPochlist) {
          bookMarkIcon.className        = "fas fa-bookmark";
          bookMarkIcon.title            = "Ajouter ce livre dans ma poch'list";
          
        } else {
          bookMarkIcon.className        = "far fa-trash-alt";
          bookMarkIcon.title            = "Supprimer ce livre de ma poch'list";
      }
        
        bookMarkIcon.alt                = bookTitle;
        headerSection.appendChild(bookMarkIcon);
        
        if(sessionStorage.getItem(bookId)) 
        bookMarkIcon.style.color        = "#1DACA0";

    var bookTitleItem                   = document.createElement("h1");
        bookTitleItem.className         = "bookTitleItem";
        headerSection.appendChild (bookTitleItem);
   
    var bookIdItem                      = document.createElement("p");
        bookIdItem.className            = "bookIdItem";
        bookItem.appendChild(bookIdItem);
    
    var bookAuthorItem                  = document.createElement("p");
        bookAuthorItem.className        = "bookAuthorItem";
        bookItem.appendChild(bookAuthorItem);
      
    var bookDescriptionItem             = document.createElement("p");
        bookDescriptionItem.className   = "bookDescriptionItem";
        bookItem.appendChild(bookDescriptionItem);
    
    var bookCoverBlock                  = document.createElement('p');
        bookCoverBlock.className        = "bookCoverBlock";
        bookItem.appendChild(bookCoverBlock);

    var bookCoverImg                    = document.createElement("img");
        bookCoverImg.className          = "bookCover";
        bookCoverBlock.appendChild(bookCoverImg);

    if(bookTitle.length < 80) {
        bookTitleItem.innerHTML         = "Titre: "+bookTitle;
    }   else {
        bookTitleItem.innerHTML         = "Titre: "+bookTitle.substr(0, 76) +  " [...]";
    }
    bookIdItem.innerHTML                = "Id: "+bookId;
    bookAuthorItem.innerHTML            = "Auteur: "+bookAuthor;
    bookDescriptionItem.innerHTML       = "Description: "+bookDescription.substr(0,200) + " [...]";
    bookCoverImg.src                    = bookCoverLink;
    bookCoverImg.alt                    = bookTitle;
   
        
    bookMarkIcon.addEventListener ('click', (e)=> {   
      if(!isInPochlist) {
        saveItemStorage (bookId, book);
        bookMarkIcon.style.color = "#1DACA0";
        
      } else {
        deleteItemStorage (bookId);
        
      }
      
      });
     
    }  
    document.querySelector('input').addEventListener('focus', () => {

        if(!isNewSearch) {
          bookTitleInput.value="";
          authorInput.value="";
        }
    });
  
  function saveItemStorage (bookId, book)
   {
  
    if(sessionStorage.getItem(bookId)) {
  
     alert ("Vous ne pouvez pas ajouter deux fois le même livre");
  
    } else {
  
      sessionStorage.setItem (bookId, JSON.stringify(book));
      alert ("Livre ajouté dans votre Poch'List !");
      displayBooks (book, true);
      
    }
  
  }
  
  function deleteItemStorage (bookId){
  
    sessionStorage.removeItem (bookId);
    alert ("Livre supprimé de votre Poch'List !");
    document.body.querySelector("div[data-id='"+bookId+"']").remove();
    
  }
  
  window.onload = function(){
    
    Object.keys(sessionStorage).forEach( bookId => {
    displayBooks (JSON.parse(sessionStorage.getItem(bookId)), true);
    })
  }