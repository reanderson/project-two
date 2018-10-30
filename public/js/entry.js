$(document).ready(function() {
  var url = window.location.search;
  var entryId;
  // Sets a flag for whether or not we're updating a post to be false initially
  let updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?entry_id=") !== -1) {
    entryId = url.split("=")[1];
    getEntryData(entryId);
  }

  function getEntryData(id) {
    $.get("/api/entries/" + id, function(data) {
      console.log(id);
      if (data) {
        console.log(data);
        // If this post exists, prefill our cms forms with its data
        $("#title").val(data.title);
        // tinyMCE.get("contents").setContent(data.contents);
        $("#contents").text(data.contents);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  //========================================================================================
  //TINYMCE
  // initializes the tinymce text editor
  tinymce.init({
    selector: "#contents",
    min_height: 500,
    resize: false,
    plugins: "link hr image imagetools visualchars lists textcolor colorpicker",
    toolbar:
      "undo redo | bold italic underline strikethrough | forecolor backcolor | hr link image sketch | subscript superscript | alignleft aligncenter alignright alignjustify | styleselect fontselect fontsizeselect | numlist bullist indent outdent blockquote",
    default_link_target: "_blank",
    setup: function(ed) {
      ed.addButton("sketch", {
        title: "Painterro Sketch",
        image: "../img/pen.png",
        tooltip: "Add a Sketch",
        onclick: function() {
          openSketch();
        }
      });
    }
  });

  // save entry
  $("#submitEntry").on("click", function(event) {
    event.preventDefault();

    // if this is an edited entry, run a PUT route
    if (updating) {
      const request = {};
      request.contents = tinyMCE.get("contents").getContent();
      request.title = $("#title").val();
      request.id = entryId;
      $.ajax({
        url: "/api/entries",
        method: "PUT",
        data: request
      }).then(response => {
        console.log(response);
        window.location.href = "/";
      });
    }

    // if this is a new entry, run a POST route
    else {
      if ($("#title").val().length === 0) {
        return false;
      }
      const request = {};
      request.contents = tinyMCE.get("contents").getContent();
      request.title = $("#title").val();
      request.UserId = 1;
      $.ajax({
        url: "/api/entries",
        method: "POST",
        data: request
      }).then(response => {
        console.log(response);
        window.location.href = "/";
      });
    }
  });

  //============================================================================================
  // PAINTERRO
  // initializes sketchpad
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
});
