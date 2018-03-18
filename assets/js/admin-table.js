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

function addSlide() {
    $.post("http://localhost:3000/retrieve", function(data, status){
        ;
    })
    .done(function(data, status) {
        data.forEach(element => {
            addRow(JSON.stringify(element.user_id), JSON.stringify(element.username).replace(/"/g, ''));
            
        });
    });
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
