prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Qorn6llzx/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesturename").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("resultemoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "Its Amazing";
        }
        if(results[0].label == "Best"){
            document.getElementById("resultemoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "Thanks for saying best";
        }
        if(results[0].label == "Victory"){
            document.getElementById("resultemoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Damn!! Its Victory";
        }
        if(results[0].label == "Unity"){
            document.getElementById("resultemoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "WE ALL IN A UNITY";
        }
        if(results[0].label == "Clap"){
            document.getElementById("resultemoji").innerHTML = "&#128079;";
            document.getElementById("quote").innerHTML = "Ayy thanks👏";
        }
        if(results[0].label == "Rock"){
            document.getElementById("resultemoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "U rock bro";
        }
        if(results[0].label == "Bye"){
            document.getElementById("resultemoji").innerHTML = "&#128075;";
            document.getElementById("quote").innerHTML = "Good byee";
        }
    }
}