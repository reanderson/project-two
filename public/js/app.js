$(document).ready(function () {
  // VARIABLES
  // All of these names can be changed later

  // make reference variables for various locations on the page
  var newEntryButton = $("#submitNewEntry") // submit new entry button in modal
  var entryButtonsArea = $("#entryButtons") // column of entry buttons
  var entryDisplayArea = $("#entryContent") // area where entry content is displayed

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleEntryDelete);
  $(document).on("click", "button.edit", handleEntryEdit);

  //variable to hold entries
  var posts;

  //looks for query
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getEntries(authorId);
  }

  //function to get posts from DB
  function getEntries(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/entries" + authorId, function (data) {
      console.log("Entries", data);
      entires = data;

      if (!entries || !entries.length) {
        displayEmpty(author);
      } else {
        initalizeRows();
      }
    });
  }

  //API call to delete entries
  function deleteEntry(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
      })
      .then(function () {
        getEntries(entrySelect.val());
      })
  }

  //appends posts inside container
  function initalizeRows() {
    entryContent.empty();
    var addEntry = [];
    for (var i = 0; i < entries.length; i++) {
      addEntry.push(createNew(entries[i]));
    }
    entryContent.append(addEntry);
  }

  //constructs HTML for entry
  function createNew(entry) {
    var postDate = new Date(post.createdAt);

    postDate = moment(postDate).format("MM Do YYYY, h:mm:ss a");

    var newCard = $("<div");
    newCard.addClass("card");

    var newCardHeader = $("<div>");
    newCardHeader.addClass("card-header");

    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");

    var editBtn = $("<button>");
    editBtn.text("x");
    editBtn.addClass("edit btn btn-info");

    var newEntryTitle = $("<h3>");
    var newPostDate = $("<small>");

    var newCardBody = $("<div>");
    newCardBody.addClass("card-body");

    newEntryTitle.text(post.title + " ");
    newPostDate.text(formattedDate);
    newEntryTitle.append(newPostDate);
    newCardHeader.append(deleteBtn);
    newCardHeader.append(editBtn);
    newCardHeader.append(newEntryTitle);

    newCard.append(newCardHeader);
    newCard.data("entry", entry);
    return newCard;

  }

  //function to call deleteEntry
  function handleEntryDelete() {
    var currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    deleteEntry(currentEntry.id);
  }

  //function to edit posts
  function handleEntryEdit() {
    var currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    window.location.href = "/entry?post_id=" + currentEntry.id;
  }

  //function to display message when there are no entries
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";

    if (id) {
      partial = id;
    }
    entryContent.empty();
    var messageH3 = $("<h3>");
    messageH3.css({
      "text-align": "center"
    });
    messageH3.html("No entries yet!");
    entryContent.append(messageH3);
  }

});