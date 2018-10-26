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

  //=======================================================================================
  // GET ALL ENTRIES BY USER
  // This placeholder code uses the user with an id of 1,
  // obviously adjustments should be made to allow for the current active user, once that table exists.
  // Additionally, the append will need to be adjusted to look nicer with our format.
  // We may want to conside usng Moment or something of the sort to dsplay the time that the entry was written
  $.ajax({
    url: "/api/entries/1",
    method: "GET"
  }).then(entries => {
    entries.forEach(entry => {
      $("#testEntries").append(
        `<div class="row justify-content-between">
        <div class="col"><h2> ${entry.title} </h2></div>
        <div class="col text-right">
        <button class="btn edit-btn" data-entryId=${entry.id}>
        <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn delete-btn" data-entryId=${entry.id}>
        <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>
        ${entry.contents} <hr />`
      );
    });
  });

  $(document).on("click", ".delete-btn", function() {
    const entryId = $(this).attr("data-entryId");
    $.ajax({
      url: `/api/entries/${entryId}`,
      method: "DELETE"
    }).then(response => {
      console.log(response);
    });
  });
});
