$(document).ready(function() {
  $(".sidenav").sidenav();
  $(".modal").modal();
  M.updateTextFields();

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
      });
    });
  });
});
