# Poch'List


[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) 

Poch lib is an app which allows customers to search for books by entering the title and the author. The search displays 10 results on the page with additionial information such as the book title, its author, a description of the story (if available) and the book cover (if available).
The customer can make his own choice by clicking on the "Bookmark" icon at the top right, which saves the book in his Poch'List. 

### Prerequisite

This app is using Google Books API. 
Requests to the Books API for public data must be accompanied by an identifier, which can be an API key. 
To get an API key, please follow the instructions by clicking the link : https://developers.google.com/books/docs/v1/using#APIKey

After you have an API key, your application can append the query parameter key=yourAPIKey to all request URLs :

- Open Poch'List.js file
- Go to function searchBooks (bookTitleSearched, authorSearched) 
- Into "const url" : after "&key=", add your own APIKey. Example : 
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + bookTitleSearched + '+inauthor:'+ authorSearched +'&key=yourAPIKey';

### Installation

1. Click on the green button at the top right "Clone or download".
2. Select "Download ZIP".
3. Extract the zip file on your computer.
4. If you are using an IDE, copy past the github link and clone the repository into your IDE.


## Start

To start the app, double click on "index.html" which will open an new tab on your browser.

## Made with

The app is using Google books API for book search requests.

## Author

**Sandra Cabessa** 



