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
    var w = $(window).width();
    var h = $(window).height();
    $('.slider-container').css('width', w);
    $('.slider-container').css('height', h);
    $('.carousel-container').css('width', w);
    $('.carousel-container').css('height', h);
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
			// console.log("recognizing");
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
                        final_transcript += event.results[i][0].transcript;
                        // console.log(final_transcript);
                        if (final_transcript.toLowerCase() == "halo") {
                            open_chat();
                        }
                    }
                }
            } else if (active_chat && time_now - last_chat <= 60*1000) {
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    // console.log("active");
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                        if (final_transcript.toLowerCase() == "halo"){
                            open_chat();
                        } else {
                            document.getElementById("right-bubble-text").innerHTML = final_transcript;
                        }
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