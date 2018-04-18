$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
    //document.getElementById("right-bubble").style.display = "none";
	//document.getElementById("left-bubble").style.display = "none";
	var final_transcript ="";
    var bubble_active = false;
    var active_chat = false;
    var last_chat = null;
    var time_now = null;
    var session = null;
    var last_response = "Halo, ada yang bisa saya bantu ?";

    function open_chat(lastResponse){
        active_chat = true;
        last_chat = time_now;
        session = time_now;
        add_response_bubble(lastResponse);
        speak(msg, lastResponse);
    }

    function show_response_bubble(text){
        document.getElementById("left-bubble-text").innerHTML = text;
        document.getElementById("left-bubble").style.display = "block";
    }
    function create_new_input_bubble(id,text){
        let new_bubble = document.createElement("div");
        let bubble_text = document.createElement("div");
        let inner_text = document.createElement("a");
        let inner_icon = document.createElement("i");
        inner_icon.setAttribute('class','material-icons');
        inner_icon.innerHTML('account_circle');
        new_bubble.classList.add("talk-bubble tri-right right-top round"); 
        new_bubble.setAttribute('id','right-bubble-text_'+id);
        //inner_text.setAttribute("id","left-bubble-text_1");
        inner_text.innerHTML(text);
        bubble_text.classList.add("talktext");
        bubble_text.appendChild(inner_icon);
        bubble_text.appendChild(inner_text);
        new_bubble.innerHTML(bubble_text);
        document.getElementById('right-bubble').appendChild(new_bubble);
    }
    function set_input_text(idx, text){
        let bubble = document.getElementById('right-bubble-text_'+idx);
        if(bubble.length>0){
            document.getElementById('right-bubble-text_'+idx).innerHTML(text);
        }else{
            create_new_input_bubble(idx,text);
        }
    }
    function add_response_bubble(text){
        let new_response = document.createElement("div");
        let response_text = document.createElement("div");
        let inner_text = document.createElement("a");
        let inner_icon = document.createElement("i");
        inner_icon.setAttribute('class','material-icons');
        inner_icon.innerHTML('android');
        new_response.classList.add("talk-bubble tri-right left-top round"); 
        new_response.setAttribute("id","left-bubble-text_1");
        inner_text.innerHTML(text);
        response_text.classList.add("talktext");
        response_text.appendChild(inner_icon);
        response_text.appendChild(inner_text);
        new_response.innerHTML(response_text);
        document.getElementById("left-bu bble").appendChild(new_response);
    }
    function speak(speechTool, text){
        speechTool.text = 'Halo, ada yang bisa saya bantu?';
        window.speechSynthesis.speak(speechTool);
        speechTool.onend = function(){
            //document.getElementById("left-bubble").style.display = "none";
        }
    }
// 
     function sendVoiceQuery(userQuery, userSession) {
        $.ajax({
            url: 'https://api.dialogflow.com/v1/query?v=20150910',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType : 'json',
            headers: {
                'Authorization': 'BEARER ' + '3db08300491841ad95a8acd25a8910b8',   //If your header name has spaces or any other char not appropriate
            },
            data: JSON.stringify(
                {originalRequest: 
                    {data: {exampleMessage: 'Signage'}}, 
                    contexts: ["active"],
                    query: userQuery, 
                    lang: 'id-ID', 
                    sessionId: session
                }),
        }).done (function (data) {
            console.log("Result : " + JSON.stringify(data));
            console.log("Speech : " +  (data.result.fulfillment.speech));
            var msg = new SpeechSynthesisUtterance(JSON.stringify(data.result.fulfillment.speech));
            msg.volume = 10;
            last_response = data.result.fulfillment.speech;
            window.speechSynthesis.speak(msg);
        });
    }

	if (!('webkitSpeechRecognition' in window && 'speechSynthesis' in window)) {
		alert('Recognition not supported!\n Please use Chrome version 25 or later');
	} else {
        var recognition = new webkitSpeechRecognition();
        var msg = new SpeechSynthesisUtterance();
        msg.lang = "id-ID";
        msg.volume = 1;
		recognition.interimResults = true;
		recognition.lang = 'id-ID';

		recognition.onstart = function(){
		}

		recognition.onerror = function(){
			// console.log("error occured");
		}

		recognition.onend = function(){
            // console.log("recognition end");
			recognition.start();
		}

		recognition.onspeechstart = function(){
            // console.log("speech start");
            time_now = new Date().getTime();
			if (!bubble_active && active_chat && time_now - last_chat <= 60*1000){
                // document.getElementById("right-bubble-text").innerHTML = "";
				// document.getElementById("right-bubble").style.display = "block";
                bubble_active = true;
			}
		}

		recognition.onspeechend = function(){
			// console.log("speech end");
			if (bubble_active){
                // document.getElementById("right-bubble-text").innerHTML = "";
				// document.getElementById("right-bubble").style.display = "none";
                bubble_active = false;
            }	
            final_transcript = "";
			interim_transcript = "";
		}

		recognition.onresult = function(event){
            interim_transcript = "";
            if (last_chat == null || time_now - last_chat > 60*1000){
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    // console.log("masuk");
                    if (event.results[i].isFinal) {
                        for (var j = 0; event.results[i][j]; j++ ) {
                            final_transcript += event.results[i][j].transcript;
                        }
                        userQuery = final_transcript.toLowerCase();
                        sendVoiceQuery(userQuery, session);    
                        open_chat(last_response);                         
                    }
                }
            } else if (active_chat && time_now - last_chat <= 60*1000) {
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    // console.log("active");
                    if (event.results[i].isFinal) {
                        for (var j = 0; event.results[i][j]; j++ ) {
                            final_transcript += event.results[i][j].transcript;
                        }
                        console.log(final_transcript[0]);
                        userQuery = final_transcript.toLowerCase();
                        sendVoiceQuery(userQuery, session);
                        //document.getElementById("right-bubble-text").innerHTML = final_transcript;
                        set_input_text(id,final_transcript);
                        open_chat(last_response);
                        //   console.log(final_transcript);
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                        //document.getElementById("right-bubble-text").innerHTML = interim_transcript;
                        set_input_text(id,interim_transcript);
                    //   console.log(interim_transcript);
                    }
                }
                last_chat = time_now;
            }
            console.log(session);
            // console.log(active_chat);
		}
		recognition.start();
		// console.log('start');
	}
});