function add(){
    var name = $("#name").val();
    var content = CKEDITOR.instances["editor"].getData();
    $.post(
        "http://localhost:3000/slider/insert", 
        {
            playlist_id : id,
            slider_name : name,
            slider_content : content
        },
        function (data, status) {
            if (data.status == "success"){
                window.location = "/view/admin_dashboard";
            } else {
                alert(data);
            }
        }
    );
}

function edit(){
    var name = $("#name").val();
    var content = CKEDITOR.instances["editor"].getData();
    $.post(
        "http://localhost:3000/slider/update_name", 
        {
            slider_id : id,
            slider_name : name
        },
        function (data, status) {
            if (data.status == "success"){
                $.post(
                    "http://localhost:3000/slider/update_content", 
                    {
                        slider_id : id,
                        slider_content : content
                    },
                    function (data, status) {
                        if (data.status == "success"){
                            window.location = "/view/admin_dashboard";
                        } else {
                            alert(data);
                        }
                    }
                );
            } else {
                alert(data);
            }
        }
    );
}