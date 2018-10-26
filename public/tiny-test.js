$(document).ready(function() {
  tinymce.init({
    selector: "#mytestarea",
    min_height: 500,
    resize: false,
    plugins: "link hr image imagetools visualchars lists",
    toolbar:
      "undo redo | bold italic underline strikethrough | forecolor backcolor | hr link image | subscript superscript | alignleft aligncenter alignright alignjustify | styleselect fontselect fontsizeselect | numlist bullist indent outdent blockquote",
    default_link_target: "_blank"
  });

  $("#testbutton").on("click", function(event) {
    event.preventDefault();

    console.log("hello out there");

    console.log(tinyMCE.get("mytestarea").getContent());
    const request = {};
    request.contents = tinyMCE.get("mytestarea").getContent();
    request.title = $("#title").val();
    request.UserId = 1;

    $.ajax({
      url: "/api/entries",
      method: "POST",
      data: request
    }).then(response => {
      console.log(response);
    });
  });

  //============================================================================================
  // PAINTERRO
  var ptro = Painterro({
    defaultSize: "300x300",

    saveHandler: function(image, done) {
      $.ajax("/api/sketch", {
        method: "POST",
        data: {
          paint: image.asDataURL("image/jpeg", 0.5)
        }
      }).then(function(response) {
        console.log(response);
        tinymce.activeEditor.execCommand(
          "mceInsertContent",
          false,
          `<img src='${response}' alt='Painterro Sketch'/>`
        );
        done(true);
      });
    }
  });

  function openSketch() {
    ptro.show();
  }

  $("#callSketch").on("click", function() {
    openSketch();
  });

  $.ajax({
    url: "/api/entries/1",
    method: "GET"
  }).then(entries => {
    entries.forEach(entry => {
      $("#testEntries").append(
        `<h2> ${entry.title} </h2> ${entry.contents} <hr />`
      );
    });
  });
});
