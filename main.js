function setup(){
   canvas = createCanvas(1000, 500);
   //canvas.right();
   background("white");
   canvas.mouseReleased(classifyCanvas);
   synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='Etiqueta: '+results[0].label;
    document.getElementById('confidence').innerHTML='Precision: '+Math.round(results[0].confidence *100)+'%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}