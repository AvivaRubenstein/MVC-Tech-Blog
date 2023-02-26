module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    check_if_user_wrote_comment: (commentsUserId, userId) => {
      if(userId == null){
        return false;
      }
      if(commentsUserId == userId){
        return true;
      } else {return false;}
    },
  };
  