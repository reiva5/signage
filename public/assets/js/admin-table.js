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

function deletePlaylist(id) {
    $.ajax("demo_test.asp")
        .done(function () {
            alert("success");
        });
}