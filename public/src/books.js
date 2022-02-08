function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter((book) => book.borrows[0].returned);
  const notReturned = books.filter((book) => !book.borrows[0].returned);
  return [notReturned, returned];
}

function getBorrowersForBook(book, accounts) {
  // maping objects from accounts to array
  const arrayOfAccounts = book.borrows.map((bookItem) => {
    let matchingAccount = accounts.find((account) => {
      if (account.id === bookItem.id) return account;
    });
    //adding what the returned value from the borrows array to the account array
    matchingAccount = { ...matchingAccount, returned: bookItem.returned };
    return matchingAccount;
  });
  //only getting the first 10
  return arrayOfAccounts.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
