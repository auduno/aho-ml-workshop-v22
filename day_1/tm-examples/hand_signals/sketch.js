let classifier;
let video;
let flippedVideo;
let result;
let div;
let img1;
let img2;

// paste your url from teachable machine here
let modelURL = "https://teachablemachine.withgoogle.com/models/qEFSmRGzt/";

function preload() {
  // load image before we start setup
  // note that this image has been uploaded (see sketch files to left)
  img1 = loadImage("images/emoji_thumbs_up.png");
  img2 = loadImage("images/emoji_disappointed_face.png");
  // Load image classifier model before setting up canvas
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  div = createDiv("Loading model...");
  flippedVideo = ml5.flipImage(video);
  
  classifyVideo();
}

function draw() {
  flippedVideo = ml5.flipImage(video)
  image(flippedVideo, 0, 0);
  if (result == 'Thumbs up') {
    div.html('Thumbs up');
    image(img1, 25, 25, 50, 50);
  } else if (result == 'Thumbs down') {
    div.html('Thumbs down');
    image(img2, 25, 25, 50, 50);
  } else if (result == 'No class') {
    div.html('');
  }  
}

function classifyVideo() {
  // call gotResult when classification is done
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(err, results) {
  if (results.length > 0) {
    if (results[0].label != result) {
      // look at first (most likely) result
      result = results[0].label;
    }
  }
  
  // start a new classification after 100 ms
  setTimeout(classifyVideo, 100);
}
