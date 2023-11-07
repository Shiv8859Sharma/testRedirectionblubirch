 $(document).ready(function () {
               let currentPart = 0;
               let isScrolling = false;

               function showPart(partIndex) {
                  if (!isScrolling) {
                     isScrolling = true;
                     $('.section').animate({ scrollTop: partIndex * $('.part').height() }, 800, function () {
                        isScrolling = false;
                     });
                     currentPart = partIndex;
                  }
               }

               // Mousewheel event
               $('.section').on('mousewheel DOMMouseScroll', function (e) {
                  if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                     // Scrolling up
                     if (currentPart > 0) {
                        showPart(currentPart - 1);
                     }
                  } else {
                     // Scrolling down
                     if (currentPart < 2) {
                        showPart(currentPart + 1);
                     }
                  }
               });

               // Touch event
               let touchStartY = 0;
               $('.section').on('touchstart', function (e) {
                  touchStartY = e.originalEvent.touches[0].clientY;
               });

               $('.section').on('touchmove', function (e) {
                  e.preventDefault(); // Prevent the default touch behavior

                  let touchEndY = e.originalEvent.touches[0].clientY;
                  let deltaY = touchStartY - touchEndY;

                  if (deltaY > 0) {
                     // Swiped up
                     if (currentPart < 2) {
                        showPart(currentPart + 1);
                     }
                  } else if (deltaY < 0) {
                     // Swiped down
                     if (currentPart > 0) {
                        showPart(currentPart - 1);
                     }
                  }
               });
            });