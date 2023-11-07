document.addEventListener('DOMContentLoaded', function () {
   var gallerySection = $(".gallery");
   var images = $(".gallery .image-container"); // Select all gallery images
   var currentIndex = 0; // Initial index of the centered image (0-based)
   var scrollSensitivity = 15; // Adjust this value for slower or faster scrolling
   var isScroll = false
   var scrollAuto = false
   const imageContainers = document.querySelectorAll('.image-container');

   let hash = window.location.hash;

   // imageContainers.forEach((container, index) => {
   //    container.style.height = '0';
   //    container.style.width = '100%';
   // })
   // if (!hash) {
   //    imageContainers[0].classList.add('active');
   //    imageContainers[0].style.height = 'auto';
   //    imageContainers[0].style.width = '100%';
   //    imageContainers[1].style.height = '10%';
   // }
   $(window).scroll(function () {
      let currentHash = window.location.hash
      if (hash !== currentHash) {
         hash = currentHash
         imageContainers.forEach((container, index) => {
            const image = container.querySelector('img');
            const imageId = image.getAttribute('id');
            updateImageVisibilityByHash(`#${imageId}`, index)
         })
      }
   })

   imageContainers.forEach((container, index) => {
      const image = container.querySelector('img');
      image.addEventListener('click', function () {
         currentIndex = index
         updateImageVisibility()
      });
      if (hash) {
         const imageId = image.getAttribute('id');
         updateImageVisibilityByHash(`#${imageId}`, index)
      }
   });

   function updateImageVisibilityByHash(id, index) {
      if (hash === id) {
         const elementId = hash.substring(1);
         const element = document.getElementById(elementId);
         if (element) {
            const yOffset = element.getBoundingClientRect().top - window.innerHeight / 4;
            window.scrollTo(0, window.scrollY + yOffset);
         }
         currentIndex = index
         updateImageVisibility()
      }
   }


   // Function to update image visibility based on the current index
   function updateImageVisibility() {
      images.removeClass("show-top-image active show-bottom-image").addClass('hide-other-image');
      images.eq(currentIndex).addClass("active").removeClass('hide-other-image');
      if (currentIndex > 0) {
         images.eq(currentIndex - 1).addClass("show-top-image").removeClass('hide-other-image');
         images.eq(currentIndex - 2).addClass("hide-other-image")

      }
      if (currentIndex < images.length - 1) {
         images.eq(currentIndex + 1).addClass("show-bottom-image").removeClass('hide-other-image');
         images.eq(currentIndex + 2).addClass('hide-other-image')
      }
   }

   updateImageVisibility(); // Initial setup
   function curserStop(){
         if((currentIndex > 0) && (currentIndex < 7)){
         const element = $('.potential-ntwrk');
         const yoffset = element.offset()
         window.scrollTo(0, yoffset.top + element.innerHeight() - 130);
      }

   }
   // Scroll event handler
   gallerySection.on("mouseenter mouseleave" , function (event){
      
      if(event.type === 'mouseenter'){
         $("body").css("overflow", "hidden");
         const element = $('.potential-ntwrk');
         const yoffset = element.offset()
         window.scrollTo(0, yoffset.top + element.innerHeight() - 130);
      }
      if(event.type === "mouseleave"){
         $("body").css("overflow", "auto");
      }
   })

   gallerySection.on("mousewheel touchstart touchmove", function (event) {
    
      $("body").css("overflow", "hidden");
      curserStop()  
      
      // Re-enable scrolling after animation is complete

      var deltaY = event.originalEvent.deltaY;

      if (event.type === "touchstart") {
         lastTouchY = event.originalEvent.touches[0].clientY;
         return;
      }
      if ((currentIndex > 0) || (currentIndex < 7)) {
         // $("body").css("overflow", "auto");
         scrollAuto = true
      }
      if ((currentIndex === 0) && scrollAuto || (currentIndex === 7) && scrollAuto) {
         $("body").css("overflow", "auto");
         scrollAuto = false
      }

      if (event.type === "touchmove") {
         var currentTouchY = event.originalEvent.touches[0].clientY;
         deltaY = lastTouchY - currentTouchY;
         lastTouchY = currentTouchY;
      }
      if (deltaY > scrollSensitivity && !isScroll && currentIndex < images.length - 1) {
         // Scrolling down
         isScroll = true
         currentIndex++;
         setTimeout(() => {
            isScroll = false
         }, 1000)
         updateImageVisibility();
      } else if (deltaY < -scrollSensitivity && !isScroll && currentIndex > 0) {
         // Scrolling up
         isScroll = true
         currentIndex--;
         setTimeout(() => {
            isScroll = false
         }, 1000)
         updateImageVisibility();
      }
   });


});  

$(document).ready(function () {
   let topSliderContainer = document.getElementById("top-slider")
   let top_slider_section = $('#top-slider-section')
   let first_slide = $(".top-slider-first")
   let second_slide = $(".top-slider-second")
   let top_slider_first_details = $(".top-slider-first-details")
   let top_slider_second_details = $(".top-slider-second-details")
   let second_details = $(".second-details")
   let second_details_h3 = second_details.find("h2")
   let second_details_a = second_details.find("a")

   var prevScroll = $(window).scrollTop();
   let currentStep = "Step1"

   function topSliderSection() {
      var scroll = $(window).scrollTop();
      const getTopSliderPosition = topSliderContainer.getBoundingClientRect();
      let SectionOffset = top_slider_section.offset()
      let rectHeight = window.innerHeight / 9
      if (getTopSliderPosition.top < 100) {
         if (scroll > prevScroll) {
            if ((scroll > (SectionOffset.top + (getTopSliderPosition.height * 1 / 4))) && (currentStep === 'Step1')) {
               top_slider_first_details.addClass("fade-up-first-details-text").removeClass("fade-down-first-details-text")
               top_slider_second_details.show()
               second_details_a.each((index, item) => {
                  $(item).addClass(`show-second-detail-a${index + 1}`)
               })
               second_details_h3.addClass("show-second-detail-h3")
               $("body").css("overflow", "hidden");

               setTimeout(() => {
                  currentStep = 'Step2'
                  $("body").css("overflow", "auto");
               }, 5000)
            }

            if ((scroll > (SectionOffset.top + (getTopSliderPosition.height * 1 / 2))) && currentStep === 'Step2') {
               $("body").css("overflow", "hidden");
               top_slider_first_details.hide();
               second_slide.show()
               second_slide.addClass("show-second-slide")
               first_slide.addClass("hide-first-slide")
               setTimeout(() => {
                  $("body").css("overflow", "auto");
               }, 2000)
               currentStep = "Step3"
            }
         }
         else {
            if ((scroll < (SectionOffset.top + (getTopSliderPosition.height * 1 / 4))) && currentStep === 'Step2') {
               top_slider_first_details.show()
               top_slider_first_details.removeClass("fade-up-first-details-text")
               top_slider_first_details.addClass("fade-down-first-details-text")
               top_slider_second_details.hide()
               second_details_a.each((index, item) => {
                  $(item).removeClass(`show-second-detail-a${index + 1}`)
               })
               second_details_h3.removeClass("show-second-detail-h3")
               $("body").css("overflow", "hidden");

               setTimeout(() => {
                  currentStep = 'Step1'
                  $("body").css("overflow", "auto");
               }, 2000)
            }

            if ((scroll < (SectionOffset.top + (getTopSliderPosition.height))) && currentStep === 'Step3') {
               $("body").css("overflow", "hidden");
               second_slide.removeClass("show-second-slide")
               first_slide.removeClass("hide-first-slide")
               setTimeout(() => {
                  second_slide.hide()
               }, 1000)
               setTimeout(() => {
                  $("body").css("overflow", "auto");
               }, 5000)
               currentStep = "Step2"
            }

         }
      }


      prevScroll = scroll
   }

   $(window).scroll(function () { topSliderSection() })
})
