const addBookBtn = document.querySelector('.addBook')
const bookContainer = document.querySelector('.bookContainer')

const dialog = document.querySelector('dialog')
const xCircle = document.querySelector('.x-circle')
const cancelBook = document.querySelector('#cancelBook')
const form = document.querySelector('form')

const formTitle = document.querySelector('#title')
const formAuthor = document.querySelector('#author')
const formPages = document.querySelector('#pages')
const formRead = document.querySelector('#read')

const myLib = []
updateContent()

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

function addBookToLibrary(author, title, pages, read) {

    const newBook = new Book(author, title, pages, read)
    myLib.push(newBook)

}
function updateContent() {
    bookContainer.innerHTML = ''
    myLib.forEach((bookObj, index) => {
        const newCard = document.createElement('div')
        newCard.classList.add('bookCard')
        newCard.setAttribute('index', index)
        newCard.innerHTML = `
        <p>Title: <span class="cardTitle">${bookObj.title}</span></p>
        <p>Author(s): <span class="cardAuthor">${bookObj.author}</span></p>
        <p># of Pages: <span class="cardPages">${bookObj.pages}</span> Pages</p>
        <div class="cardBtnContainer">
          <button class="cardRead" onclick='updateRead(${index})'>${bookObj.read === 'yes' ? 'Read' : 'Not Read'}</button>
          <button class="cardDelete" onclick='deleteCard(${index})'>Delete</button>
        </div>`
        bookContainer.appendChild(newCard)
    })

    if (myLib.length == 0) {
        bookContainer.innerHTML = `<p>Your library is empty...</p>`
    }
}
function updateRead(index) {
    myLib[index].read = (myLib[index].read === 'yes') ? 'no' : 'yes';
    updateContent()
}
function deleteCard(index) {
    myLib.splice(index, 1);
    updateContent()
}
addBookBtn.addEventListener('click', () => {
    form.reset()
    dialog.showModal()
})
xCircle.addEventListener('click', () => {
    dialog.close()
})
cancelBook.addEventListener('click', () => {
    dialog.close()
})
form.addEventListener('submit', () => {
    addBookToLibrary(formAuthor.value, formTitle.value, formPages.value, formRead.value)
    // console.log(myLib)
    updateContent()
})