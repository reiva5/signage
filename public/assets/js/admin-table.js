var active_playlist = null;

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


function addPlaylist(){
    $('#addPlaylistModal').modal('show');
}

function submitAddPlaylist(){
    console.log($('#addPlaylistModal').find('input[name="name"]')[0].value);
    $.post(
        "http://localhost:3000/playlist/insert",
        {
            name : $('#addPlaylistModal').find('input[name="name"]')[0].value
        },
        function(data, status){
            console.log(data);
            if(data.status == "success"){
                location.reload();
            } else {
                alert(data);
            }
        }
    )
};

function editPlaylist(id, name){
    active_playlist = id;
    $('#editPlaylistModal').find('input[name="name"]')[0].value = name;
    $('#editPlaylistModal').modal('show');
}

function submitEditPlaylist(){
    $.post(
        "http://localhost:3000/playlist/update", 
        {
            id : active_playlist,
            name : $('#editPlaylistModal').find('input[name="name"]')[0].value
        },
        function (data, status) {
            if(data.status == "success"){
                location.reload();
            } else {
                alert(data);
            }
            active_playlist = null;
        }
    );
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
            slider_name : $('#editSlideModal').find('input[name="name"]')[0].value
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
            playlist_id : $('#editSlideModal').find('input[name="name"]')[0].value
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
            slider_content : $('#editSlideModal').find('input[name="name"]')[0].value
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