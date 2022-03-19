Status = "";
Glass_image = "";
object = [];

function preload()
{
    Glass_image = loadImage("glass.jpg")
}

function setup()
{
    canvas = createCanvas(640,350);
    canvas.position(450,200);
    document.getElementById("status").innerHTML = "Status :- Detecting Objects";
    object_detector = ml5.objectDetector("cocossd",modelLoaded);
}

function modelLoaded()
{
    console.log("Model is Loaded");
    Status = "true";
    object_detector.detect(Glass_image,gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
      console.log(error);
    }
    else
    {
      console.log(results);
      object = results;
    }
}

function draw()
{
    image(Glass_image,0,0,640,350);
    if(Status != "")
    {
        for(i = 0 ; i< object.length ; i++)
    {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        fill("#ff0000");
        percent = floor(object[i].confidence*100);
        text(object[i].label + " " + percent + "%" , object[i].x , object[i].y-30);
        noFill();
        stroke("#ff0000");
        rect(object[i].x,object[i].y-30,object[i].width,object[i].height-600);
    }
    }
}