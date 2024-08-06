const moment = require('moment');

function convertAndValidateDate(inputDate) {
    // Convert the date from DD-MM-YYYY format to ISO format (YYYY-MM-DD)
    const isoDate = moment(inputDate, 'DD-MM-YYYY').endOf('day').toISOString();

    if (!isoDate) {
         throw new Error("Invalid date format")
    }

    // Get today's date in ISO format
    const today = moment().utc().endOf('day').toISOString();
    // Check if the ISO date is greater than or equal to today's date
    if (isoDate < today) { 
           throw new Error("Due date must be today or in the future")  
    }
    console.log("isoDate",isoDate)

    return isoDate
    
}

module.exports = {convertAndValidateDate}