import validator from 'validator';
/**
 * Set mail validation.
 */
 export const checkMailValidationHandler = (eve) => {
    var email = eve.target.value;
    //console.log(email);
    if (validator.isEmail(email)) {
        return '';
    } else {
        return 'Invalid Email';
    }
    
}

/**
 * Set url validation.
 */
 export const checkUrlValidationHandler = (eve) => {
    var url = eve.target.value;
   // console.log('url : ' + url);
    
    if(eve.target.value.length == 0) {
        return '';
    }

    if (validator.isURL(url)) {
        return '';
    } else {
        return 'Invalid URL';
    }
    
}