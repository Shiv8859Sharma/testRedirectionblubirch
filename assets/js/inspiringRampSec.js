function debounce(func, delay) {
    let timer;
    return function (arg) {
        clearTimeout(timer);
        timer = setTimeout(func(arg), delay);
    };
}

const container = document.querySelector('.scroll-main-container');
const ramp_sec_ecosystem = document.querySelector('.ramp-sec_ecosystem');

// const ramp_se = document.querySelector('.ramp-se');
const image_container = document.querySelector('.image-container')
const wheel_container = document.querySelector(".wheel-container")
const flow_1 = document.querySelector("#flow-1")
const flow_2 = document.querySelector("#flow-2")
const flow_3 = document.querySelector("#flow-3")
// const flow_1_img = flow_1.querySelector(".container");

const images = document.querySelectorAll('.img');
const wrap_images = document.querySelectorAll('.img-wrap')
const b_path_img = document.querySelectorAll(".verticle-arrow");
const eating_y_path = container.querySelector(".eating-y-path")
const source_tabs = container.querySelectorAll(".channel-list_tab")
const t_container = container.querySelector(".t-container")
const scroll_ramp_sec = document.querySelector('.scroll-ramp-sec')

let containerWidth = container.offsetWidth;
const minLeft = [2, 4, 6, 20];
const maxLeft = 50;
const sensitivity = 1;
let secondsPassed = 0;
let prevScrollY = window.scrollY;

function changeColors() {
    const listItems = document.querySelectorAll("#changing-list li");
    for (let i = 0; i < listItems.length; i++) {
        if (i < secondsPassed) {
            if (i > 0) {
                listItems[i - 1].classList.remove("active");
            }
            listItems[i].classList.add("active");
        }
    }
}
setInterval(function () {
    if (getComputedStyle(wheel_container).display === "flex") {
        if (secondsPassed < 7) {
            secondsPassed++;
            changeColors();
        }
    } else {
        const listItems = document.querySelectorAll("#changing-list li");
        secondsPassed = 0
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove("active")
        }
    }
}, 3000);

function updateImagePositionLeft(event) {
    let wheelDelta = event.deltaY;
    var scroll = $(window).scrollTop();
    const triggerBottom = scroll_ramp_sec.getBoundingClientRect()

    if ((getComputedStyle(flow_2).display != "none")) {
        const imageCurrentPositions = Array.from(images).map((image) => parseFloat(getComputedStyle(image).left));
        const imageNewPositions = imageCurrentPositions.map((currentLeft, index) => {
            const imageNewLeft = ((currentLeft - wheelDelta * sensitivity) * 100) / containerWidth;
            return Math.max(minLeft[index], Math.min(maxLeft + (index * 51), imageNewLeft));
        });
        images.forEach((image, index) => {
            t_container.style.display = imageNewPositions[3] < 25 ? "none" : "flex"
            if ((wheelDelta > 0) && (imageNewPositions[3] < 21)) {
                image_container.style.display = "none"
                wheel_container.style.display = "flex"
            }

            if ((imageNewPositions[index] > minLeft[index]) && wheelDelta > 0) {
                image.style.left = `${imageNewPositions[index]}%`;
            }

            if (index !== 3) {
                if (imageNewPositions[index] < 10) {
                    image.style.opacity = "0"
                } else if (imageNewPositions[index] > 40) {
                    image.style.opacity = "1"
                }
                else {
                    image.style.opacity = `${imageNewPositions[index] / 60}`
                }
            }

            if (index === 0) {
                t_container.style.left = imageNewPositions[0] < 3 ? "5%" : `${imageNewPositions[index] - 1}%`;
            }
            if (index === 3 && imageNewPositions[3] < 102) {
                let currentPosition = imageNewPositions[3] - (event.key ? 10 : 0)
                t_container.style.width = currentPosition < 35 ? `${currentPosition - 6}%` : `${currentPosition}%`;
            }

            if (imageNewPositions[0] < 45) {
                b_path_img.forEach((img) => {
                    // img.classList.add("verticle-arrow-line")
                    img.srcset = "assets/img/inspiringImage/line.svg"
                })
            } else {
                b_path_img.forEach((img) => {
                    // img.classList.remove("verticle-arrow-line")
                    img.srcset = "assets/img/inspiringImage/top-arrow.svg"
                })
            }

            imageNewPositions.forEach((position, index) => {
                if (((position > 45) && (position < 60))) {
                    source_tabs.forEach((source_tab, ind) => {
                        source_tab.style.display = ind === index ? "block" : "none"

                    })
                // source_tabs[index].style.display = index === ind[index] ? "block" : "none"
                    document.getElementById("footer-container").style.display = "block"
                }
            })

            if (imageNewPositions[index] < 70) {
                if (index === 3) {
                    document.getElementById("footer-container").style.display = "none"
                } else {
                    document.getElementById("footer-container").style.display = "block"
                }
            } else {
                if (index === 0) {
                    source_image_tab.srcset = "assets/img/inspiringImage/source-tab.svg"
                }
            }
            // if ((wheelDelta < 0) && (scroll < 5000) && (scroll > 4900)) {
            //     image_container.style.display = "none"
            //     wheel_container.style.display = "flex"
            // }
            if ((wheelDelta < 0) && (triggerBottom.bottom > 2000)) {
                if (index === 3) {
                    if ((imageNewPositions[index] === 20) && (getComputedStyle(wheel_container).display === "flex")) {
                        image_container.style.display = "block"
                        wheel_container.style.display = "none"
                        image.style.left = `${imageNewPositions[index]}%`;
                    } else {

                        image.style.left = `${imageNewPositions[index]}%`;
                    }
                }
                if ((index === 2) && imageNewPositions[3] > 56) {
                    image.style.left = `${imageNewPositions[index]}%`;
                }
                if ((index === 1) && imageNewPositions[2] > 56) {
                    image.style.left = `${imageNewPositions[index]}%`;
                }
                if ((index === 0) && (imageNewPositions[1] > 56)) {
                    image.style.left = `${imageNewPositions[index]}%`;
                }
            }
        });

        wrap_images.forEach((wrap_image, index) => {
            if ((imageNewPositions[index] < 25) && wheelDelta > 0) {
                wrap_image.style.left = `${imageNewPositions[index]}%`;
            }
            if (imageNewPositions[index] < 15) {
                wrap_image.style.opacity = "1"
            } else if (imageNewPositions[index] > 30) {
                wrap_image.style.opacity = "0"
            }
            else {
                wrap_image.style.opacity = `${imageNewPositions[index] / 60}`
            }
            if (imageNewPositions[3] < 35) {
                let n = [0, 2, 4]
                t_container.style.left = `${(36 - imageNewPositions[3] + n[index])}%`
                wrap_image.style.left = `${(36 - imageNewPositions[3] + n[index])}%`
            }
            if ((wheelDelta < 0) && (scroll < 4800)) {
                if ((index === 2) && imageNewPositions[3] < 30) {
                    wrap_image.style.left = `${imageNewPositions[index]}%`;
                }
                if ((index === 1) && imageNewPositions[2] > 30) {
                    wrap_image.style.left = `${imageNewPositions[index]}%`;
                }
                if ((index === 0) && imageNewPositions[1] > 30) {
                    wrap_image.style.left = `${imageNewPositions[index]}%`;
                }
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(function () {
        document.getElementById('processing').style.opacity = '1';
        document.getElementById('processing').style.left = '102%';
        document.getElementById('remarketing').style.opacity = '1';
        document.getElementById('remarketing').style.left = '152%';
        document.getElementById('bb-logo').style.opacity = '1';
        document.getElementById('bb-logo').style.left = '202%';
    }, 500);
    // container.addEventListener('wheel', updateImagePositionLeft);
});
function updateDynamicValues() {
    containerWidth = container.offsetWidth
}

var lastWidth = window.innerWidth
function resizePage() {
    const currentWidth = window.innerWidth;
    console.log(Math.abs(currentWidth - lastWidth) , lastWidth);
    // Check if the screen size crosses a certain threshold
    if (Math.abs(currentWidth - lastWidth) > 50) {
        // Reload the page when the width change is significant (e.g., 50 pixels)
        window.location.reload();
    }

    // Update the lastWidth variable
    lastWidth = currentWidth;
    
}

function checkScroll(event) {
    const triggerBottom = scroll_ramp_sec.getBoundingClientRect()
    const currentScrollY = window.scrollY;
    let targetheight = window.innerHeight
    if ((triggerBottom.top < (targetheight / 10)) && (triggerBottom.top > -5450)) {
        if (triggerBottom.bottom > 1000) {
            updateImagePositionLeft({ deltaY: Math.round(currentScrollY - prevScrollY) })
        }
    }
    prevScrollY = currentScrollY;
}

window.addEventListener('scroll', checkScroll)

window.addEventListener('resize', resizePage);
// Event listener for ctrl + - / ctrl + +
window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === '-' || event.key === '=')) {
        updateDynamicValues();
    }
});

// Initial call to set up the dynamic values based on the initial container size
updateDynamicValues();

document.addEventListener('keyup', debounce((event) => {
    if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
        // plusSlides(-1, 'ArrowLeft');
        updateImagePositionLeft({ deltaY: -48, key: event.key })
    } else if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
        // plusSlides(1, 'ArrowRight');
        updateImagePositionLeft({ deltaY: 48, key: event.key })

    }
}));

$(document).ready(function () {
    var section = $(".ramp-sec_ecosystem");
    var flow_1 = section.find('.flow_start_end_image')
    var flow_2 = section.find('.slider')
    var header = flow_1.find(".ramps-text-section");
    var paragraph = flow_1.find("p");
    var sectionPosition = section.offset();
    var prevScroll = 0; // Variable to store the previous scroll position
    var animationTriggered = false;
    var currentStep = "Step1"
    var image_container = $('.image-container')
    var wheel_container = $('.wheel-container')
    var imagePostions = []
    for (let index = 50; index < 203; index++) {
        imagePostions = [...imagePostions, index]
    }

    checkScroll()
    function resetImagePosition() {
        document.getElementById('initiation').style.opacity = '1';
        document.getElementById('initiation').style.left = '50%';
        document.getElementById('processing').style.opacity = '1';
        document.getElementById('processing').style.left = '102%';
        document.getElementById('remarketing').style.opacity = '1';
        document.getElementById('remarketing').style.left = '152%';
        document.getElementById('bb-logo').style.opacity = '1';
        document.getElementById('bb-logo').style.left = '202%';
        t_container.style.left = "50%"
        wrap_images.forEach((wrap_image, index) => {
            wrap_image.style.opacity = "0"
            wrap_image.style.left = "22%"
        })
    }

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
    const triggerBottom = scroll_ramp_sec.getBoundingClientRect()
        if (scroll > prevScroll) {
            if (scroll < sectionPosition.top) {
                checkScroll()
            }

            if (scroll > sectionPosition.top && !animationTriggered && (currentStep === "Step1")) {
                header.addClass("animate-fade-up").removeClass('animate-fade-down');
                paragraph.addClass("animate-fade-up").removeClass('animate-fade-down');
                flow_2.show()
                flow_2.addClass("slider_show")
                resetImagePosition()
                animationTriggered = true;
                setTimeout(() => {
                    currentStep = "Step2"
                }, 600)
                $("body").css("overflow", "hidden");

                // Re-enable scrolling after animation is complete
                setTimeout(function() {
                  $("body").css("overflow", "auto");
                }, 600);
            }

            // if (((scroll > sectionPosition.top)) && (currentStep === "Step1")) {
            //     resetImagePosition()
            //     TopScroll = window.pageYOffset || document.documentElement.scrollTop;
            //     LeftScroll = window.pageXOffset || document.documentElement.scrollLeft,

            //         // if scroll happens, set it to the previous value
            //         window.onscroll = function () {
            //             window.scrollTo(LeftScroll, (scroll-500));
            //         }
            // } else {
            //     window.onscroll = function () { };
            // }
            // if ((scroll > 3000) && (scroll < 6000) && (currentStep === "Step2")) {
            //     checkScroll()
            // }
            if ((triggerBottom.bottom < 1500) && (currentStep === 'Step2')) {
                header.removeClass("animate-fade-up").addClass('animate-fade-down');
                paragraph.removeClass("animate-fade-up").addClass('animate-fade-down');
                paragraph.text("Leader in RA-PaaS")
                flow_2.removeClass("slider_show")
                flow_2.hide()
                currentStep = "Step3"
            }
        } else {
            if ((triggerBottom.top > 50) && animationTriggered && (currentStep === 'Step2')) {
                header.removeClass("animate-fade-up").addClass('animate-fade-down');
                paragraph.removeClass("animate-fade-up").addClass('animate-fade-down');
                paragraph.show()
                animationTriggered = false;
                flow_2.removeClass("slider_show")
                resetImagePosition()
                flow_2.hide()
                currentStep = "Step1"
            }

            // if ((triggerBottom.bottom > 1500) && (currentStep === "Step3")) {
            //     TopScroll = window.pageYOffset || document.documentElement.scrollTop;
            //     LeftScroll = window.pageXOffset || document.documentElement.scrollLeft,

            //         // if scroll happens, set it to the previous value
            //         window.onscroll = function () {
            //             window.scrollTo(LeftScroll, 5000);
            //         }
            // } else {
            //     window.onscroll = function () { };
            // }
            if ((triggerBottom.bottom > 1200) && (currentStep === 'Step3')) {
                header.addClass("animate-fade-up").removeClass('animate-fade-down');
                // paragraph.addClass("paragraph-hide").removeClass('paragraph-show');
                paragraph.text("[Returns Automation and Monetization Platform]")

                animationTriggered = true;
                flow_2.show()
                image_container.css({ display: "none" })
                wheel_container.css({ display: "flex" })
                // flow_2.addClass("slider_show")
                setTimeout(() => {
                    currentStep = "Step2"
                }, 600)
                $("body").css("overflow", "hidden");

                // Re-enable scrolling after animation is complete
                setTimeout(function() {
                  $("body").css("overflow", "auto");
                }, 600);
            }
        }
        prevScroll = scroll; // Update the previous scroll position
    });
});
