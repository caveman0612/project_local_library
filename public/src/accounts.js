function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((acc1, acc2) =>
    acc1.name.last.toLowerCase() > acc2.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  //using one reduce to access the books array and another to access the borrows array inside the books object
  return books.reduce(
    (acc, cur) =>
      acc +
      cur.borrows.reduce(
        (acc1, cur1) => (cur1.id === account.id ? acc1 + 1 : acc1 + 0),
        0
      ),
    0
  );
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      const currentBookBorrowed = book.borrows[0];
      return (
        !currentBookBorrowed.returned && currentBookBorrowed.id === account.id
      );
    })
    .map((book) => {
      const author = authors.find((item) => item.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
