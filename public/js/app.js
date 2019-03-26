$(document).ready(function() {
  $(".sidenav").sidenav();
  $(".modal").modal();
  M.updateTextFields();

  $(".scrape").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function(data) {
      console.log(data);
    });
  });

  $("#submit-new-playlist").on("click", function() {
    var newPlaylist = $("#playlist-name")
      .val()
      .trim();
    $.ajax({
      method: "POST",
      url: "/playlist",
      data: {
        name: newPlaylist,
        list: []
      }
    }).then(function(data) {
      $("#playlist-name").val("");
    });
  });

  $(".add-playlist").on("click", function() {
    var videoId = $(this).attr("value");
    $(".playlist").on("click", function() {
      var playlistId = $(this).attr("value");
      $.ajax({
        method: "POST",
        url: "/playlist/" + playlistId,
        data: {
          videoId: videoId
        }
      }).then(function(data) {
        console.log(data);
      });
    });
  });

  $(".remove-from-playlist").on("click", function() {
    var videoId = $(this).attr("value");
    var playlistId = $(this).attr("value2");
    $.ajax({
      method: "POST",
      url: "/remove_from_playlist/" + playlistId,
      data: {
        videoId: videoId
      }
    }).then(function(data) {
      console.log(data);
    });
  });

  $(".delete-playlist").on("click", function() {
    $.ajax({
      method: "DELETE",
      url: "/delete_playlist/" + $(this).attr("value")
    }).then(function(data) {});
  });
  $(".cleardb").on("click", function() {
    $.ajax({
      method: "DELETE",
      url: "/cleardb"
    }).then(function(data) {});
  });
});
