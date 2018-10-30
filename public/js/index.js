$(document).ready(function() {
  // Get references to page elements
  const entryList = $("#entryButtons");
  const entryDisplay = $("#entryContent");
  const entryHeader = $("#entryHeader");
  const entryBody = $("#entryBody");
  const entryFooter = $("<div>").addClass("card-footer");

  //UPDATE THIS LATER TO REFLECT LOGIN FUNCTIONALITY

  //GET ALL ENTRIES BY USER
  //and then make entry buttons for them
  function getAllEntries() {
    $.ajax({
      // THIS WILL PROBABLY NEED TO BE CHANGED ONCE PASSPORT IS IMPLEMENTED
      type: "GET",
      url: "/api/entries/"
    }).then(entries => {
      console.log(entries);
      entryList.empty();
      entries.forEach(entry => {
        entryBtn = $("<li>");
        entryBtn
          .addClass("list-group-item entryBtn")
          .attr("data-id", entry.id)
          .text(entry.title)
          .appendTo(entryList);
        console.log("heck");
      });
    });
  }

  // on clicking an entry button, display entry contents
  $(document).on("click", ".entryBtn", function() {
    $.ajax({
      url: "/api/entries/" + $(this).attr("data-id"),
      type: "GET"
    }).then(entry => {
      if (!entry) {
        console.log("No entry found");
        return false;
      }
      entryDisplay.empty();
      writeEntry(entry);
    });
  });

  // Function to write the entry to the entry display area
  function writeEntry(entry) {
    // Empty whatever is in the entry display area
    entryDisplay.empty();
    entryHeader.empty();
    entryBody.empty();
    entryFooter.empty();

    // create the card header (title, edit/delete buttons)
    const headerRow = $("<div>").addClass(
      "row align-items-center justify-content-between"
    );
    const titleCol = $("<div>").addClass("col col-md-10");
    const btnCol = $("<div>").addClass("col col-md-2 text-right");

    $("<h5>")
      .addClass("card-title my-0")
      .text(entry.title)
      .appendTo(titleCol);

    titleCol.appendTo(headerRow);

    $("<button>")
      .addClass("btn btn-danger deleteBtn mr-1")
      .html("<i class='fas fa-trash-alt'></i>")
      .attr("data-id", entry.id)
      .appendTo(btnCol);

    $("<button>")
      .addClass("btn btn-success editBtn")
      .html("<i class='fas fa-pencil-alt'></i>")
      .attr("data-id", entry.id)
      .appendTo(btnCol);

    btnCol.appendTo(headerRow);
    headerRow.appendTo(entryHeader);

    // create the card body (contents)
    entryBody.html(entry.contents);

    // create the card footer (time created/last edited)
    let postDate = new Date(entry.createdAt);
    postDate = moment(postDate).format("MMM Do YYYY, h:mm a");
    let postEdit = new Date(entry.updatedAt);
    postEdit = moment(postEdit).format("MMM Do YYYY, h:mm a");

    $("<div>")
      .addClass("small text-muted text-right")
      .html(
        `<strong>Entry Created:</strong> ${postDate}<br/>
        <strong>Last Edited:</strong> ${postEdit}`
      )
      .appendTo(entryFooter);

    entryDisplay.append(entryHeader, entryBody, entryFooter);
  }

  //On pressing a delete button, calls the delete entry modal
  $(document).on("click", ".deleteBtn", function() {
    //
    console.log("hmm");
    $.ajax({
      url: "/api/entries/" + $(this).attr("data-id"),
      type: "GET"
    }).then(entry => {
      //set the title in the delete modal
      $("#titleToDelete").text(entry.title);
      //apply the id to the deleteEntry button
      $("#deleteEntry").attr("data-id", $(this).attr("data-id"));
      $("#deleteEntryModal").modal("show");
    });
  });

  //Pressing an edit button brings you to the page to edit that entry
  $(document).on("click", ".editBtn", function() {
    window.location.href = "/entry?entry_id=" + $(this).attr("data-id");
  });

  //Pressing the Delete Entry button in the delete modal
  $("#deleteEntry").on("click", function() {
    const entryId = $(this).attr("data-id");
    $.ajax({
      url: `/api/entries/${entryId}`,
      method: "DELETE"
    }).then(function() {
      //clear the title in the delete modal
      $("#titleToDelete").empty();
      //remove the id to the deleteEntry button
      $("#deleteEntry").attr("data-id", "-1");

      getAllEntries();

      $("#deleteEntryModal").modal("hide");

      //clear display area
      entryDisplay.empty();
      entryHeader.empty();
      entryBody.empty();
      entryFooter.empty();

      entryHeader.text("Entry Deleted");
      entryBody.text("Entry successfully deleted!");
      entryDisplay.append(entryBody);
    });
  });

  getAllEntries();
});
