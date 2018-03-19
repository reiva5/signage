$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
    
});

function confirmDelete(){
    $('#deleteSlideModal').modal('show');
}

function editSlide(){
    $('#editSlideModal').modal('show');
}

function addPlaylist(){
    $('#addPlaylistModal').modal('show');
}