const myLibrary = [];

function Book(id, title, author, pages, status) {
  // the constructor...will only have the properties
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.addBookToLibrary = function () {
  const bookdetails = {
    id: this.id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    status: this.status,
  };

  myLibrary.push(bookdetails);
  console.log("Current library:", myLibrary);
};
// const book1 = new Book("", "idiot", "doestovesy", "100", "yes");
// book1.addBookToLibrary();

//Getting the elements

const close = document.getElementsByClassName("close")[0];

const formbutton = document.getElementById("openFormBtn");

const userform = document.getElementById("userForm");
const formModal = document.getElementById("formModal");

//Display the form

formbutton.addEventListener("click", function () {
  formModal.style.display = "block";
  formbutton.style.display = "none";
});
//Close the form
close.addEventListener("click", function (event) {
  formModal.style.display = "none";
  formbutton.style.display = "block";
});

//Get the results in Array

userform.addEventListener("submit", function (event) {
  event.preventDefault();
  let status = "";
  const isChecked = document.getElementById("myCheckbox").checked;
  if (isChecked) {
    status = "read";
  } else {
    status = "unread";
  }
  const bookName = document.getElementById("bookname");
  const authorName = document.getElementById("author");
  const pages = document.getElementById("pages");
  console.log("Form submitted");
  const book = new Book(
    "",
    bookName.value,
    authorName.value,
    pages.value,
    status
  );

  book.addBookToLibrary();
  displayBook();
  console.log("Current library:", myLibrary);

  this.reset();
  formModal.style.display = "none";
  formbutton.style.display = "block";
});

function displayBook() {
  //Loop Through the Array

  const getTilte = myLibrary[myLibrary.length - 1].title;
  const getId = myLibrary[myLibrary.length - 1].id;
  const status = myLibrary[myLibrary.length - 1].status;
  const getAuthor = myLibrary[myLibrary.length - 1].author;
  const getPages = myLibrary[myLibrary.length - 1].pages;
  //Display the Results
  const cardcontainer = document.querySelector(".container");
  const classDiv = document.createElement("div");
  classDiv.className = "card";
  classDiv.id = getId;
  const TitleDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  TitleDiv.textContent = "Title:" + getTilte;
  const AuthorDiv = document.createElement("div");
  AuthorDiv.textContent = "Author: " + getAuthor;

  const PagesDiv = document.createElement("div");
  PagesDiv.textContent = "Pages: " + getPages;
  deleteButton.innerHTML = "Delete";
  deleteButton.id = getId;
  deleteButton.className = "delete-btn";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = getId + "-checkbox"; // Make ID unique per book
  checkbox.name = "readStatus";
  checkbox.className = "read-status-checkbox";

  // Set checkbox state based on status

  // Create the label
  const label = document.createElement("label");
  label.htmlFor = getId + "-checkbox"; // Connect label to checkbox
  label.textContent = "Read?";
  cardcontainer.appendChild(classDiv);
  classDiv.appendChild(TitleDiv);
  classDiv.appendChild(AuthorDiv);
  classDiv.appendChild(PagesDiv);
  classDiv.appendChild(checkbox);
  classDiv.appendChild(label);
  classDiv.appendChild(deleteButton);
  if (status === "read") {
    checkbox.checked = true;
    classDiv.classList.add("read");
  } else {
    classDiv.classList.add("unread");
  }
}

//Eventlistener
document
  .querySelector(".container")
  .addEventListener("click", function (event) {
    // Update Status
    if (event.target.id && event.target.id.includes("-checkbox")) {
      const bookId = event.target.id.replace("-checkbox", "");
      const isChecked = event.target.checked;
      const card = document.getElementById(bookId);
      if (card) {
        // Remove both classes first
        card.classList.remove("read", "unread");

        // Add the appropriate class based on checkbox state
        if (isChecked) {
          card.classList.add("read");
        } else {
          card.classList.add("unread");
        }
      }

      updateStatus(bookId, isChecked);
    }

    if (event.target.classList.contains("delete-btn")) {
      deleteFunction(event.target.id);
    }
  });

function updateStatus(bookId, isChecked) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    // Update its status
    myLibrary[bookIndex].status = isChecked ? "read" : "unread";
    console.log("Updated book status:", myLibrary[bookIndex]);
  }
}
function deleteFunction(buttonID) {
  //DeleteHTML
  document.getElementById(buttonID).remove();
  const bookIndex = myLibrary.findIndex((abc) => abc.id === buttonID);
  //DeleteFromArray
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    console.log("Book removed from library");
  }
}
