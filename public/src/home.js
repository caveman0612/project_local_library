function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const list = books.filter((book) => !book.borrows[0].returned);
  return list.length;
}

function getMostCommonGenres(books) {
  // making an object of genres and counts
  const genreCount = books.reduce((obj, book) => {
    if (book.genre in obj) {
      obj[book.genre].count++;
    } else {
      obj[book.genre] = { name: book.genre, count: 1 };
    }
    return obj;
  }, {});
  //turning the obj into an array from values
  const genreArray = Object.values(genreCount);
  return _sortHighToLowAndSliceTo5(genreArray);
}

function getMostPopularBooks(books) {
  //making an array of objs with title and count then sorting that array then returning only the first 5
  const bookObject = books.map((item) => {
    return { name: item.title, count: item.borrows.length };
  });
  return _sortHighToLowAndSliceTo5(bookObject);
}

function getMostPopularAuthors(books, authors) {
  //returns an object with name and count of books.
  const objectOfAuthors = books.reduce((obj, book) => {
    const found = authors.find((author) => author.id === book.authorId);
    if (book.authorId in obj) {
      obj[book.authorId].count += book.borrows.length;
    } else {
      obj[book.authorId] = {
        name: `${found.name.first} ${found.name.last}`,
        count: book.borrows.length,
      };
    }
    return obj;
  }, {});
  //converting the object of authors to an array
  const list = Object.values(objectOfAuthors);
  return _sortHighToLowAndSliceTo5(list);
}

function _sortHighToLowAndSliceTo5(list) {
  list.sort((item1, item2) => item2.count - item1.count);
  return list.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
