// Export an object containing helper functions
module.exports = {
    // Define a function 'format_date' that takes a date and returns it in the format MM/DD/YYYY
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    // Define a function 'format_plural' that takes a word and an amount
    // If the amount is not 1, it returns the word with an 's' at the end
    // If the amount is 1, it returns the word as is
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
    }
  }