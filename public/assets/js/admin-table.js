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
        "http://localhost:3000/slider/delete", 
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
        "http://localhost:3000/playlist/delete", 
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

function addSlide() {
    window.location = "/view/add_slider";
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