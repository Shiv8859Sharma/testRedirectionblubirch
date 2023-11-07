$(document).ready(function() {
  $("#resumeInput").change(function() {
    var fileName = $(this).val().split("\\").pop();
    var validExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
    var fileExtension = fileName.split('.').pop().toLowerCase();       
    if (!validExtensions.includes(fileExtension)) {
      alert('Invalid file type. Only PDF, DOC, DOCX, TXT, and RTF files are allowed.');
      $(this).val("");
      $("#attachedBox").hide();
      return;
    }
   
    var truncatedFileName = truncateFileName(fileName, 10); 
    $(this).next(".attach-btn").text(" Attached: " + truncatedFileName);
    $("#attachedBox").show();
  });

  $(".attach-btn").click(function() {
    var fileInput = $("#resumeInput");
  });

  $(".cancel-icon").click(function() {
    var fileInput = $("#resumeInput");

    if (fileInput.is(":visible")) {
      fileInput.val("");
      $("#attachedBox").hide();
    }
  });

  function truncateFileName(fileName, maxLength) {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    var truncatedName = fileName.substring(0, maxLength - 4); 
    var extension = fileName.substring(fileName.length - 4); 

    return truncatedName + '....' + extension;
  }
});