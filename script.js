const myLibrary = [];

function Book(title, author, pages) {
  // the constructor...will only have the properties

  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.addBookToLibrary = function () {
  const bookdetails = {
    id: self.crypto.randomUUID(),
    title: this.title,
    author: this.author,
    pages: this.pages,
  };

  myLibrary.push(bookdetails);
};
const book1 = new Book("idiot", "doestovesy", "100");

book1.addBookToLibrary();

console.log(myLibrary);

function addNewbook() {}
deleteBook();
