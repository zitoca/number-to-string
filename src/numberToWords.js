(function($) {
  $.fn.numberToWords = function(input_number) {
    
    var number = input_number;
    var finalString = "";
    var decimals = "";
    var hundreds = "";
    var thousands = "";
    var millions = "";
    var billions = "";
    var trillions =  "";
    var quadrillions = "";
    var helper = {};        
    
    // This function will take a number and split it into groups according to scale
    helper._assignNumbersToScale = function() { 
      //Strip all non-numeric characters from input number
      number = number.replace(/[^0-9]/g, "");
      while (number.length < 2) {
        number = "0".concat(number);
      }
      // Starting at decimals, place groups of numbers into their appropriate scale
      
      // The two rightmost numbers will always be assumed to be the decimal entries
      decimals = number.slice(-2);
      number = number.slice(0,-2);
      
      // The numbers will be assigned and later converted in groups of 3 so it is important that the length
      // of the number is a factor of three to avoid indexing errors
      while (number.length % 3 != 0) {
        number = "0".concat(number);
      }
      
      // Split the number into groups of 3 numbers and store the groups in an array
      // Each group of 3 represents a scale with the most significant scale first in the array
      if (number){
        arrayOfScales = number.match(/.../g);
      } else {
        return;
      }
      
      if ( arrayOfScales.length == 1 ){
        hundreds = arrayOfScales[0];
      } else if (arrayOfScales.length == 2 ) {
        hundreds = arrayOfScales[1];
        thousands = arrayOfScales[0];	
      } else if ( arrayOfScales.length == 3 ) {
        hundreds = arrayOfScales[2];
        thousands = arrayOfScales[1];
        millions = arrayOfScales[0];	
      } else if ( arrayOfScales.length == 4 ) {
        hundreds = arrayOfScales[3];
        thousands = arrayOfScales[2];
        millions = arrayOfScales[1];
        billions = arrayOfScales[0];
      } else if ( arrayOfScales.length == 5 ){
        hundreds = arrayOfScales[4];
        thousands = arrayOfScales[3];
        millions = arrayOfScales[2];
        billions = arrayOfScales[1];
        trillions = arrayOfScales[0];
      } else {
        hundreds = arrayOfScales[5];
        thousands = arrayOfScales[4];
        millions = arrayOfScales[3];
        billions = arrayOfScales[2];
        trillions = arrayOfScales[1];
        quadrillions = arrayOfScales[0];
      }	
      
    };
    
    // convert3NumbersToWords will accept a 3 digit number and return the string representing that number
    helper._convert3NumbersToWords = function(num) { 
      // Each digit of the number, beginning with the most significant digit is analyzed.
      string = "";
      if (num.length != 3){
        return "Error! The input number, " + num + ", was not 3 digits long!";
      }
      if (num == "000") {
        return "";
      }
      if (num[0] == 1){
        string = "one hundred ";
      } else if (num[0] == 2){
        string = "two hundred ";
      }  else if (num[0] == 3){
        string = "three hundred ";
      }  else if (num[0] == 4){
        string = "four hundred ";
      }  else if (num[0] == 5){
        string = "five hundred ";
      }  else if (num[0] == 6){
        string = "six hundred ";
      }  else if (num[0] == 7){
        string = "seven hundred ";
      }  else if (num[0] == 8){
        string = "eight hundred ";
      }  else if (num[0] == 9){
        string = "nine hundred ";
      }
      if (num[1] == 1) {
        if (num[2] == 0){
          return string.concat("ten ");
        } else if (num[2] == 1){
          return string.concat("eleven ");
        } else if (num[2] == 2){
          return string.concat("twelve ");
        } else if (num[2] == 3){
          return string.concat("thirteen ");
        } else if (num[2] == 4){
          return string.concat("fourteen ");
        } else if (num[2] == 5){
          return string.concat("fifteen ");
        } else if (num[2] == 6){
          return string.concat("sixteen ");
        } else if (num[2] == 7){
          return string.concat("seventeen ");
        } else if (num[2] == 8){
          return string.concat("eighteen ");
        } else if (num[2] == 9){
          return string.concat("nineteen ");
        }
      } else if (num[1] == 2) {
        string = string.concat("twenty ");
      } else if (num[1] == 3) {
        string = string.concat("thirty ");
      } else if (num[1] == 4) {
        string = string.concat("forty ");
      } else if (num[1] == 5) {
        string = string.concat("fifty ");
      } else if (num[1] == 6) {
        string = string.concat("sixty ");
      } else if (num[1] == 7) {
        string = string.concat("seventy ");
      } else if (num[1] == 8) {
        string = string.concat("eighty ");
      } else if (num[1] == 9) {
        string = string.concat("ninety ");
      }
      if (num[2] == 0){
        return string;	
      } else if (num[2] == 1){
        return string.concat("one ");
      } else if (num[2] == 2){
        return string.concat("two ");
      } else if (num[2] == 3){
        return string.concat("three ");
      } else if (num[2] == 4){
        return string.concat("four ");
      } else if (num[2] == 5){
        return string.concat("five ");
      } else if (num[2] == 6){
        return string.concat("six ");
      } else if (num[2] == 7){
        return string.concat("seven ");
      } else if (num[2] == 8){
        return string.concat("eight ");
      } else if (num[2] == 9){
        return string.concat("nine ");
      }
    };
    
    // convertAllScales will run convert3NumbersToWords	on each set of numbers created by assignNumberToScales
    // The three digit number in each variable representing a scale will be replaced with the correct string representation
    helper._convertAllScales = function() { 
      if (hundreds){
        hundreds = helper._convert3NumbersToWords(hundreds);
      }
      if (thousands){
        thousands = helper._convert3NumbersToWords(thousands);
      }
      if (millions){
        millions = helper._convert3NumbersToWords(millions);
      }
      if (billions){
        billions = helper._convert3NumbersToWords(billions);
      }
      if (trillions){
        trillions = helper._convert3NumbersToWords(trillions);
      }
      if (quadrillions){
        quadrillions = helper._convert3NumbersToWords(quadrillions);
      }
    };        
    
    // createFinalString will combine the contents of each scale in order to create the logical string representation
    helper._createFinalString = function() { 
      if(quadrillions != 0) {
        finalString += quadrillions+ "quadrillion ";
      }
      if(trillions != 0) {
        finalString += trillions + "trillion ";
      }
      if(billions != 0) {
        finalString += billions + "billion ";
      }
      if(millions != 0) {
        finalString += millions + "million ";
      }
      if(thousands != 0) {
        finalString += thousands + "thousand ";
      }
      if(hundreds != 0) {
        finalString += hundreds;
      }
      if (!finalString){
        finalString = "Zero ";
      } else {
        finalString = finalString.charAt(0).toUpperCase() + finalString.slice(1);
      }
      finalString += "and " + decimals + "/100 dollars";
    };
    
    
    helper._assignNumbersToScale();
    helper._convertAllScales();
    helper._createFinalString();        
    return finalString;
  }
})( jQuery );