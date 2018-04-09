$(document).ready(function() { 
    $('body').bootstrapMaterialDesign(); 
    document.getElementById("right-bubble").style.display = "none";
	document.getElementById("left-bubble").style.display = "none";
	var final_transcript ="";
    var bubble_active = false;
    var active_chat = false;
    var last_chat = null;
    var time_now = null;
    var session = null;

    function open_chat(){
        active_chat = true;
        last_chat = time_now;
        session = time_now;
        show_response_bubble("Halo, ada yang bisa saya bantu?");
        speak(msg, "Halo, ada yang bisa saya bantu?");
    }

    function show_response_bubble(text){
        document.getElementById("left-bubble-text").innerHTML = text;
        document.getElementById("left-bubble").style.display = "block";
    }

    function speak(speechTool, text){
        speechTool.text = 'Halo, ada yang bisa saya bantu?';
        window.speechSynthesis.speak(speechTool);
        speechTool.onend = function(){
            document.getElementById("left-bubble").style.display = "none";
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
            console.log("Speech : " +  JSON.stringify(data.result.fulfillment.speech));
            var msg = new SpeechSynthesisUtterance(JSON.stringify(data.result.fulfillment.speech));
            msg.volume = 10;

            window.speechSynthesis.speak(msg);
        });


        // $.post(
        //     "/slider/voice_query", 
        //     {
        //         message : "Hello STEI",
        //         session : userSession
        //     },
        //     function (data, status) {
        //         if (data.status == "success"){
        //             console.log('Query sueccess !!');
        //         } else {
        //             console.log('Query failed');
        //         }
        //     }
        // );
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
            var msg = new SpeechSynthesisUtterance("SELAMAT DATANG");
            msg.volume = 10;

            window.speechSynthesis.speak(msg);

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
                document.getElementById("right-bubble-text").innerHTML = "";
				document.getElementById("right-bubble").style.display = "block";
                bubble_active = true;
			}
		}

		recognition.onspeechend = function(){
			// console.log("speech end");
			if (bubble_active){
                document.getElementById("right-bubble-text").innerHTML = "";
				document.getElementById("right-bubble").style.display = "none";
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
                        console.log(final_transcript[0]);
                            open_chat();
                             userQuery = final_transcript.toLowerCase();
                            sendVoiceQuery(userQuery, session);
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
                            open_chat();
                             userQuery = final_transcript.toLowerCase();
                            sendVoiceQuery(userQuery, session);
                            document.getElementById("right-bubble-text").innerHTML = final_transcript;
                    //   console.log(final_transcript);
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                        document.getElementById("right-bubble-text").innerHTML = interim_transcript;
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