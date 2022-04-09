video = "";
status = "";
objects = [];
a = [1,2,3,4,5,6];
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    for(i = 0; i < 6; i++)
    {
        console.log(a[i]);
    }
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected:" + objects.length;
            fill("#1ed69c");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#1ed69c");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;  
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects...";
}

function modelLoaded()
{
    console.log("model is loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1.5);
}