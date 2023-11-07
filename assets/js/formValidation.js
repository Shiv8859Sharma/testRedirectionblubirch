var alphabetCheck = $('.check-alphabet');
var numberCheck = $('.check-number');
var emailCheck = $('.check-email');
var URLCheck = $('.check-url');
var careersFromField = $('.required-contact-field')
var ChecknumberWithDecimal = $(".check-number-with-decimal")
var formatInCurrency =  $(".format_in_currency")

alphabetCheck.on('input', function () {
    let inputValue = $(this).val();
    let alphabeticOnly = inputValue.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
    if (inputValue === '') {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
    $(this).val(alphabeticOnly);
});

numberCheck.on('input', function () {
    let inputValue = $(this).val();
    let numericOnly = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (inputValue === '') {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
    $(this).val(numericOnly);

});

emailCheck.on('input', function () {
    let inputValue = $(this).val();
    let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
    if (!isValidEmail) {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
});
URLCheck.on('input', function () {
    let inputValue = $(this).val();
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    let isValidURL = urlPattern.test(inputValue);
    if (!isValidURL) {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
});

ChecknumberWithDecimal.on('input' , function(){
    let inputValue = $(this).val();
    
    // Remove non-numeric and non-decimal characters, except for the first decimal point
    let numericOnly = inputValue.replace(/[^0-9.]/g, '');

    // Remove extra decimal points
    numericOnly = numericOnly.replace(/(\..*)\./g, '$1');

    // Remove leading zeros before the decimal point
    numericOnly = numericOnly.replace(/^0+(\d+\.)?/, '$1');

    if (inputValue === '' || inputValue !== numericOnly) {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
    
    $(this).val(numericOnly);
})

formatInCurrency.on('blur' , function (){
    let inputValue = parseFloat($(this).val().replace(/,/g, ''));
    let returns_calculator = JSON.parse(localStorage.getItem("returns_calculator"))

    let currency_type = $("#currency_list").val() || returns_calculator.currency
    if(!inputValue) return
    let formmatingType = ["INR", "₹", "Rs", "₨"].includes(currency_type) ? 'en-IN' : 'en-US' 
    var formattedValue = parseFloat(inputValue).toLocaleString(formmatingType);
    $(this).val(formattedValue);

})

