$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
    
});

function confirmDeleteSlide(){
    $('#deleteSlideModal').modal('show');
}

function confirmDeletePlaylist(){
    $('#deletePlaylistModal').modal('show');
}

function confirmEditSlide(){
    $('#editSlideModal').modal('show');
}

function confirmEditPlaylist(){
    $('#editPlaylistModal').modal('show');
}

function addPlaylist(){
    $('#addPlaylistModal').modal('show');
}

function updatePlaylistName(playlistId) {
    $.post(
        "http://localhost:3000/playlist/update", 
        {
            id : playlistId,
            name : $('#editPlaylistModal').find('input[name="name"]').val()
        },
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}

function deletePlaylist(playlistId) {
    $.post(
        "http://localhost:3000/playlist/delete", 
        {id : playlistId},
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}

function updateSlideName(slideId) {
    $.post(
        "http://localhost:3000/slider/update_name", 
        {
            slider_id : slideId,
            slider_name : "nama slide"//$('#editSlideModal').find('input[name="name"]').val()
        },
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}

function updateSlidePlaylistId(slideId) {
    $.post(
        "http://localhost:3000/slider/update_playlist", 
        {
            slider_id : slideId,
            playlist_id : 5//$('#editSlideModal').find('input[name="name"]').val()
        },
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}

function updateSlideContent(slideId) {
    $.post(
        "http://localhost:3000/slider/update_content", 
        {
            slider_id : slideId,
            slider_content : "Hoho"//$('#editSlideModal').find('input[name="name"]').val()
        },
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}

function deleteSlide(slideId) {
    $.post(
        "http://localhost:3000/slider/delete", 
        {slider_id : slideId},
        function (data, status) {
            alert(JSON.stringify(data));
            alert(status);
        }
    );
    location.reload();
}