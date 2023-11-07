$(document).ready(function () {
  let mouse_image = $(".mouse-image")
  let zoom_image = $(".zoom-image")
  let zoom_flow_1 = $('.zoom-flow-1')
  let zoom_flow_2 = $('.zoom-flow-2')
  let story_section = $('#story-section')
  let hexagon_details = $('.hexagon-details')
  let hexagon_first = hexagon_details.find('.first')
  let currentStep = 'Step1'


  const zoom_section = document.getElementById("zoom-section");
  const images = $(".gallery .hexagon-dskimg")
  const mb_image = $(".gallery .hexagon-mbimg")

  var prevScroll = $(window).scrollTop();
  mouse_image.on('click', function () {
    const rect = zoom_section.getBoundingClientRect();
    let zoomSectionOffset = story_section.offset().top
    // showFirstSection()
    window.scrollTo(0, zoomSectionOffset + 5 + (rect.height / 2));
  })

  function showFirstSection(type) {
    if (type === "back") {
      zoom_image.addClass("zoom-in-scale-image").removeClass('zoom-scale-image')
      setTimeout(() => {
        zoom_flow_1.show()
        zoom_flow_2.hide()
      }, 1000)
    } else {
      zoom_image.addClass("zoom-scale-image").removeClass("zoom-in-scale-image")
      setTimeout(() => {
        zoom_flow_1.hide()
        zoom_flow_2.show()
      }, 1000)
    }

  }

  function ourStorySection() {
    var scroll = $(window).scrollTop();
    const rect = zoom_section.getBoundingClientRect();
    let zoomSectionOffset = story_section.offset().top
    let rectHeight = window.innerHeight / 10
    if (rect.top < rectHeight) {
      if (scroll > prevScroll) {
        if ((scroll > (zoomSectionOffset + (rect.height * 1 / 4))) && (currentStep === 'Step1')) {
          showFirstSection()
          currentStep = 'Step2'
        }
        if ((scroll > (zoomSectionOffset + (rect.height * 1))) && currentStep === 'Step2') {
          mb_image.addClass('show-step3')
          images.each((image, container) => {
            if ($(container).hasClass(`tr-back-${image + 1}`)) {
              $(container).removeClass(`tr-back-${image + 1}`)
            }
            $(container).addClass(`tr-${image + 1}`).removeClass(`tr-back-${image + 1}`)
            hexagon_details.addClass('hexagon_details-show').removeClass('details-fade-down')
            if (image > 3) {
              $(container).hide()
            }
          })
          currentStep = 'Step3'
        }

        if ((scroll > (zoomSectionOffset + (rect.height * 2))) && (currentStep === 'Step3')) {
          if (hexagon_first.hasClass('details-fade-down')) {
          }
          hexagon_first.addClass('details-fade-up').removeClass('details-fade-down')
          currentStep = 'Step4'

        }

      } else {
        if ((scroll < (zoomSectionOffset + (rect.height * 1 / 2))) && (currentStep === 'Step2')) {
          showFirstSection('back')
          currentStep = 'Step1'
          images.each((image, container) => {
            $(container).removeClass(`tr-back-${image + 1}`)
          })
        }
        if ((scroll < (zoomSectionOffset + (rect.height * 1.2))) && (currentStep === 'Step3')) {
          images.each((image, container) => {
            $(container).addClass(`tr-back-${image + 1}`)
          mb_image.removeClass('show-step3')

            setTimeout(()=>{
              $(container).removeClass(`tr-${image + 1}`)
            },100)
            hexagon_details.removeClass('hexagon_details-show')
            hexagon_first.removeClass('details-fade-down details-fade-up')
            if (image > 3) {
              $(container).show().addClass("blur-hexagon-image")
            }
          })
          currentStep = 'Step2'
        }

        if ((scroll < (zoomSectionOffset + (rect.height * 2.3))) && (currentStep === 'Step4')) {
          hexagon_first.removeClass('details-fade-up').addClass('details-fade-down')
          currentStep = 'Step3'
        }

      }
      prevScroll = scroll;
    }
  }

  ourStorySection()
  $(window).scroll(function () { ourStorySection() })
});
