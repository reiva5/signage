var active_playlist = null;
var active_slider = null;

$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
    
});

function confirmDeleteSlide(id){
    active_slider = id;
    $('#deleteSlideModal').modal('show');
}

function submitDeleteSlide(slideId) {
    $.post(
        "/slider/delete", 
        {slider_id : active_slider},
        function (data, status) {
            if (data.status == "success"){
                location.reload();
            } else {
                alert(data);
            }
            active_slider = null;
        }
    );
}

function confirmDeletePlaylist(id){
    active_playlist = id;
    $('#deletePlaylistModal').modal('show');
}

function submitDeletePlaylist() {
    $.post(
        "/playlist/delete", 
        {id : active_playlist},
        function (data, status) {
            console.log(data);
            if(data.status == "success"){
                location.reload();
            } else {
                alert(data);
            }
            active_playlist = null;
        }
    );
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
        "/playlist/insert",
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
        "/playlist/update", 
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

function addSlide(id) {
    window.location = "/view/add_slider?id=" + id;
}


function updateSlideName(slideId) {
    $.post(
        "/slider/update_name", 
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
        "/slider/update_playlist", 
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
        "/slider/update_content", 
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

function setActive(inputId){
    let playlist_id = inputId.split("_")[1];
    let playlist_active = 0;
    if($("#"+inputId).prop("checked")){
        playlist_active = 1;
    }
    console.log(playlist_id);
    console.log(playlist_active);
    $.post(
        "/playlist/update_active",
        {
            id : playlist_id,
            active : playlist_active
        },
        function (data, status){
            console.log(JSON.stringify(data));
            console.log(status);
        }
    );
}