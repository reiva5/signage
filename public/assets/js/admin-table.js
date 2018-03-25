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

function updatePlaylistName() {
    $.post("http://localhost:3000/playlist/update", {
        id : "1",
        name : $('#editSlideModal').find('input[name="name"]').val()});
}

function deletePlaylist() {
    $.post("http://localhost:3000/playlist/delete", {
        id : "4",
        name : $('#editSlideModal').find('input[name="name"]').val()});
}

function addRow(user_id, username) {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<th scope="row">' + user_id + '</th>';
    cols += '<td>' + username + '</td>';
    cols += '<td>' + 
            '<a href="ckeditor/samples/edit.html" class="editor_edit"><i class="material-icons">mode_edit</i></a>' +
            ' <a onclick="confirmDelete()" style="cursor: pointer;"><i class="material-icons text-danger">delete</i></a>' +
            '</td>';

    newRow.append(cols);
    $("table.dosen-list").append(newRow);
}
