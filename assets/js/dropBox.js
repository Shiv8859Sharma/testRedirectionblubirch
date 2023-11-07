document.getElementById('choose-file').addEventListener('click', function () {
    event.preventDefault();
             Dropbox.choose({
               success: function (files) {
                var selectedFile = files[0];
                selectFile = selectedFile.link
                 // Here you can handle the selected files
                 var maxLength = 10; 
                       var truncatedFileName = selectedFile.name.length > maxLength ?
                        selectedFile.name.substring(0, maxLength) + '....' +
                        selectedFile.name.substring(selectedFile.name.length - 4) :
                        selectedFile.name;

                         var chooseFileLabel = document.getElementById('choose-file-label');
                         chooseFileLabel.textContent = 'Selected File: ' + truncatedFileName;
               },
               cancel: function () {
                // Handle if the user cancels the file selection
               },
               linkType: 'direct', 
               multiselect: false 
            });
       });