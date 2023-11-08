let letsBeginButton = $(".lets-begin")
let returns_impact_calculator = $("#returns_impact_calculator")
let returns_impact_calculator_form = $("#returns_impact_calculator-form")
var input = document.querySelector("#phone");

const iti = window.intlTelInput(input, {
    utilsScript: "/intl-tel-input/js/utils.js?1695806485509",
    separateDialCode: true,
    initialCountry: "auto",
geoIpLookup: function(callback) {
    // fetch("https://ipapi.co/json/")
    // .then(function(res) { return res.json(); })
    // .then(function(data) { callback(data.country_code); })
    // .catch(function() { callback("IN"); });
    callback("IN");
}
});



letsBeginButton.click(() => {
    returns_impact_calculator.hide();
    returns_impact_calculator_form.show()
})



$('.required').on('input', function () {
    var activeStep = $(this).closest('.step');
    var inputs = activeStep.find('.required');
    var allFieldsFilled = true;
    var nextButton = activeStep.find('.next-step');
    // if()
    if (nextButton.length === 0) {
        nextButton = activeStep.find('.submit-generate-results')
    }
    inputs.each(function () {
        var inputValue = $(this).val() ? $(this).val().trim() : "";
        if (inputValue === '') {
            allFieldsFilled = false;
            return false; // Exit the loop early
        } else {
            allFieldsFilled = true;
            $(this).removeClass('invalid');
        }

    });
    if (inputs.hasClass('invalid')) {
        allFieldsFilled = false;
    }
    nextButton.addClass(!allFieldsFilled ? 'next-sbtn' : 'next-enabled');
    nextButton.removeClass(allFieldsFilled ? 'next-sbtn' : 'next-enabled');
    nextButton.prop('disabled', !allFieldsFilled);
});



function isValidStep(step) {
    var inputs = step.find('input.required'); // Adjust the selector according to your form
    var selectSBoxs = step.find('select.required')
    var valid = true;

    selectSBoxs.each(function () {
        if ($(this).val() === '') {
            valid = false;
            $(this).addClass('invalid');
        }
    })

    inputs.each(function () {
        if ($(this).is(':radio')) { // Handle radio buttons
            var radioName = $(this).attr('name');
            if (!$('input[name="' + radioName + '"]:checked').length) {
                valid = false;
                // $(this).addClass('invalid');
            } else {
                // $(this).removeClass('invalid');
            }
        } else if ($(this).val() === '') {
            valid = false;
            $(this).addClass('invalid');
        } else {
            var inputValue = $(this).val().trim();
            if ($(this).attr('id') === 'phone') { // Check if input is empty or not a number
                if (iti.isValidNumber()) {
                    $(this).removeClass('invalid');
                } else {
                    console.log("this is runnnn");
                    $(this).addClass('invalid');
                    valid = false;
                    const errorCode = iti.getValidationError();
                    console.log(errorCode, ":::: errorCode");
                }
                // $(this).addClass('invalid');
            } else {
                $(this).removeClass('invalid');
            }

        }
    });
    return valid;
}

$.fn.openStep = function (step, callback) {
    $this = this;
    step_num = step - 1;
    let currency_dropdown = $('.currency_dropdown')
    if (step === 2) {
        currency_dropdown.show()
    } else {
        currency_dropdown.hide()
    }
    step = this.find('.step:visible:eq(' + step_num + ')');
    var targetPosition = step_num * (step.outerHeight() * 1.7);
    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    })
    if (step.hasClass('active')) return;
    active = this.find('.step.active');
    prev_active = next = $(this.children('.step:visible')).index($(active));
    order = step_num > prev_active ? 1 : 0;
    if (active.hasClass('feedbacking')) $this.destroyFeedback();
    active.closeAction(order);
    step.openAction(order, function () {
        $this.trigger('stepchange').trigger('step' + (step_num + 1));
        if (step.data('event')) $this.trigger(step.data('event'));
        if (callback) callback();
    });
};



$.fn.nextStep = function (ignorefb) {
    stepper = this;
    form = this.closest('form');
    active = this.find('.step.active');
    next = $(this.children('.step:visible')).index($(active)) + 2;
    feedback = $(active.find('.step-content').find('.step-actions').find('.next-step')).data("feedback");
    if (isValidStep(active)) {
        if (feedback && ignorefb) {
            stepper.activateFeedback();
            return window[feedback].call();
        }
        active.removeClass('wrong').addClass('done');
        this.openStep(next);
        return this.trigger('nextstep');

    } else {
        return active.removeClass('done').addClass('wrong');
    }
};

$.fn.prevStep = function () {
    active = this.find('.step.active');
    prev = $(this.children('.step:visible')).index($(active));
    active.removeClass('wrong');
    this.openStep(prev);
    return this.trigger('prevstep');
};


$.fn.openAction = function (order, callback) {
    openable = this.removeClass('done').addClass('active').find('.step-content');
    if (!this.closest('ul').hasClass('horizontal')) {
        openable.slideDown(300, "easeOutQuad", callback);
    } else {
        if (order == 1) {
            openable.css({
                left: '100%',
                display: 'block'
            }).animate({
                left: '0%'
            }, callback);
        } else {
            openable.css({
                left: '-100%',
                display: 'block'
            }).animate({
                left: '0%'
            }, callback);
        }
    }
};

$.fn.closeAction = function (order, callback) {
    closable = this.removeClass('active').find('.step-content');
    if (!this.closest('ul').hasClass('horizontal')) {
        closable.stop().slideUp(300, "easeOutQuad", callback);
    } else {
        if (order == 1) {
            closable.animate({
                left: '-100%'
            }, function () {
                closable.css({
                    display: 'none',
                    left: '0%'
                }, callback);
            });
        } else {
            closable.animate({
                left: '100%'
            }, function () {
                closable.css({
                    display: 'none',
                    left: '0%'
                }, callback);
            });
        }
    }
};

function chnageInNumber(value, name) {
    let fieldName = ['avg_unit_sales_price', 'annual_revenue_in_cr']
    if (fieldName.includes(name)) {
        return parseFloat(value.replace(/,/g, ''));
    } else {
        return false
    }
}
$.fn.handleSubmit = async function (event) {
    // event.preventDefault();
    active = this.find('.step.active');
    var assessment = this.find('#assessment')
    var assets_input = this.find('#assets_input')

    if (isValidStep(active)) {
        var formData = {};
        var assessment_value = {}
        var policies_value = {}

        assessment.find('input[type="text"] , select').each(function () {
            var fieldName = $(this).attr('name');
            var fieldValue = $(this).val();
            assessment_value[fieldName] = fieldValue;
        });


        var countryCode = await iti.promise.then(function() {
            const countryData = iti.getSelectedCountryData();
             return  countryData.dialCode;
        });
        assets_input.find('input[type="text"], select').each(function (index) {
            var fieldName = $(this).attr('name');
            var fieldValue = $(this).val();
            let numberValue = chnageInNumber(fieldValue, fieldName)
            policies_value[fieldName] = isNaN(fieldValue) ? numberValue ? numberValue : fieldValue : Number(fieldValue);
        });
        formData = {
            ...assessment_value,
            currency: policies_value.currency,
            country_code : countryCode,
            asset_inputs: {
                ...policies_value
            }
        }
        delete formData.asset_inputs.currency
        localStorage.setItem("returns_calculator", JSON.stringify(formData))
        location.href = window.location.origin + "/returns-impact-calculator-result.html"
    } else {
        return active.removeClass('done').addClass('wrong');
    }
}




$.fn.activateStepper = function () {
    $(this).each(function () {
        var $stepper = $(this);
        $stepper.find('li.step.active').openAction(1);
        $stepper.on("click", '.step:not(.active)', function () {
            object = $($stepper.children('.step:visible')).index($(this));
            if (!$stepper.hasClass('linear')) {
                $stepper.openStep(object + 1);
            } else {
                active = $stepper.find('.step.active');
                if ($($stepper.children('.step:visible')).index($(active)) + 1 == object) {
                    $stepper.nextStep(true);
                } else if ($($stepper.children('.step:visible')).index($(active)) - 1 == object) {
                    $stepper.prevStep();
                }
            }
        }).on("click", '.next-step', function (e) {
            e.preventDefault();
            $stepper.nextStep(true);
        }).on("click", '.previous-step', function (e) {
            e.preventDefault();
            $stepper.prevStep();
            // May want to ammend to 'a' tag for R purposes or more than likely use an ID selector
            // for shiny observer purposes... so for R if the action button for submissions was 
            // `input$form_step_submit`:
            //}).on("click", "#form_step_submit", function(e) { 
        })
            .on("click", "button:submit:not(.next-step, .previous-step)", function (e) {
                e.preventDefault();
                $stepper.handleSubmit(e)
            });
    });
};
function getCategoriesList() {
    localStorage.removeItem("returns_calculator")
    fetch("https://qa-docker.blubirch.com:3064/returns_calculator/categories_list")
        .then(response => response.json())
        .then(result => {
            let option = $("#categories_list")
            let optionList = result.map(value => `<option value="${value}">${value}</option>`)
            option.append(optionList)
        }).catch((error) => {
            let result = [
                "Large Appliances",
                "Small Appliances",
                "AC Split 1 ton",
                "AC Split 1.5 ton",
                "Ac Split 2 Ton",
                "AC Window",
                "Microwave 20L",
                "Microwave 28L",
                "Refrigerator 192L",
                "Refrigerator 850L",
                "Refrigerator 328L",
                "Refrigerator 185L",
                "Refrigerator 224L",
                "Refrigerator 628L",
                "Washing Machine top load - 6L",
                "Washing Machine top load - 7L",
                "Washing Machine Top Load 8L",
                "Washing Machine Front Load 6L",
                "Washing Machine Front Load 7L",
                "Dishwasher 6Place",
                "Dishwasher 8 Place",
                "Dishwasher 13 Place",
                "Dryer 5 Kg",
                "Dryer 8 Kg",
                "TV 32 Inches",
                "TV 43 Inches",
                "TV 65 Inches",
                "LCD TFT 24",
                "LCD TFT 30",
                "Tower AC 2 Ton",
                "Tower AC 3 Ton",
                "Room Cooler 12L",
                "Room Cooler 75L",
                "Room Cooler 90L",
                "Room Heater 800W",
                "Room Heater 1500W",
                "Speakers - Bluetooth",
                "Speakers - Echo",
                "Deep Freezer 192L",
                "Deep Freezer 320L",
                "Deep Freezer 500L",
                "Android Phones",
                "Iphones",
                "Ceiling Fans",
                "Gyser 5L",
                "Gyser 10L",
                "Gyser 15L",
                "Gas Stoves/Cooktops",
                "Hobs",
                "Induction Cookers",
                "Printer - Small",
                "Printer - Mideum",
                "PC - 24ich i3",
                "Laptop i5 15inch",
                "Iron"
            ]
            let option = $("#categories_list")
            let optionList = result.map(value => `<option value="${value}">${value}</option>`)
            option.append(optionList)
        })
}

$("#currency_list").on('change', function () {
    var inputValue = $(this).val()
    let currencyEl = $(".currency_type")
    currencyEl.each(function () {
        $(this).css({ color: "#000" })
        $(this).html(inputValue === "₹" ? '₹' : inputValue)
    })
    $(".currency_tens").each(function(){
        $(this).html(inputValue === "₹" ? 'CR' : "")
    })

    $(".format_in_currency").each(function (){
        let currencyValue = parseFloat($(this).val().replace(/,/g, ''));
        if(!currencyValue) return
        let formmatingType = ["INR", "₹", "Rs", "₨"].includes(inputValue) ? 'en-IN' : 'en-US'
        var formattedValue = parseFloat(currencyValue).toLocaleString(formmatingType);
        $(this).val(formattedValue);
    })
});
let currenciesSymbolsb = [
    "€",
    "د.إ.‏",
    "؋",
    "$",
    "Lek",
    "դր.",
    "Kz",
    "Afl.",
    "ман.",
    "KM",
    "৳",
    "CFA",
    "лв.",
    "د.ب.‏",
    "FBu",
    "Bs",
    "R$",
    "Nu.",
    "kr",
    "P",
    "руб.",
    "FrCD",
    "FCFA",
    "CHF",
    "CN¥",
    "₡",
    "₱",
    "CV$",
    "ƒ",
    "Kč",
    "Fdj",
    "RD$",
    "د.ج.‏",
    "ج.م.‏",
    "د.م.‏",
    "Nfk",
    "Br",
    "£",
    "GEL",
    "GH₵",
    "D",
    "FG",
    "Q",
    "L",
    "kn",
    "G",
    "Ft",
    "Rp",
    "₪",
    "₹",
    "د.ع.‏",
    "﷼",
    "د.أ.‏",
    "￥",
    "Ksh",
    "С̲ ",
    "៛",
    "FC",
    "₩",
    "د.ك.‏",
    "тңг.",
    "₭",
    "ل.ل.‏",
    "SL Re",
    "د.ل.‏",
    "MDL",
    "MGA",
    "MKD",
    "K",
    "₮",
    "MOP$",
    "MURs",
    "ރ",
    "RM",
    "MTn",
    "N$",
    "F",
    "₦",
    "C$",
    "नेरू",
    "ر.ع.‏",
    "B/.",
    "S/.",
    "₨",
    "zł",
    "₲",
    "ر.ق.‏",
    "RON",
    "дин.",
    "₽.",
    "FR",
    "ر.س.‏",
    "SR",
    "SDG",
    "Le",
    "Ssh",
    "ل.س.‏",
    "฿",
    "SM",
    "T",
    "د.ت.‏",
    "T$",
    "TL",
    "NT$",
    "TSh",
    "₴",
    "USh",
    "UZS",
    "Bs.F.",
    "₫",
    "VT",
    "ST",
    "ر.ي.‏",
    "R",
    "ZK",
    "ZWL$",
    "UM",
    "Db"
]
const currenciesSymbols = ['$','€','£','د.إ', 'S$','₹'];
function getCurrencyList() {
    // fetch("https://openexchangerates.org/api/currencies.json")
    //     .then(response => response.json())
    //     .then(result => {
            let option = $("#currency_list")
    //         let currencies = Object.keys(result)
            let optionList = currenciesSymbols.map(value => ['₹' ,"₨"].includes(value) ?`<option value="${value}" selected>${value}</option>` : `<option value="${value}">${value}</option>`)
            option.append(optionList)
            let currencyEl = $(".currency_type")
            currencyEl.each(function () {
                $(this).css({ color: "#000" })
                $(this).html('₹')
            })
            $(".currency_tens").each(function(){
                $(this).html('CR')
            })
    //     })
}
$(document).ready(function () {
    //    $('ul.tabs').tabs()
    //    $('.rt-select').material_select();
    //Init for stepper
    $('.stepper').activateStepper();
    //$(selector).nextStep();
    // /returns_calculator/categories_list 
    getCategoriesList()
    getCurrencyList()

});

// intlTelInput(input, {
//     initialCountry: "auto",
//     separateDialCode: true,
//     geoIpLookup: function (success, failure) {
//         $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
//             var countryCode = (resp && resp.country) ? resp.country : "us";
//             success(countryCode);
//         });
//     },
// });


