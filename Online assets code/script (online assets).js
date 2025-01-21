let keyImg, drumImg, hornImg, violinImg, muteImg
var keyaudio, drumaudio, violinaudio, hornaudio
let keyaudioJazz, drumaudioJazz, violinaudioJazz, hornaudioJazz;
let keyaudioHiphop, drumaudioHiphop, violinaudioHiphop, hornaudioHiphop;
let currentKeyAudio, currentDrumAudio, currentViolinAudio, currentHornAudio
let hiphopbackgound
let speakerImg;
let speakerImgWidth = 120;
let keyImgWidth, drumImgWidth, violinImgWidth, hornImgWidth;
let grammy, radio;
let circlecolor
var fft
let ismute = false;
let instruction = true
let popsound
let popSoundKeyPlayed = false
let popSoundDrumPlayed = false
let popSoundViolinPlayed = false
let popSoundHornPlayed = false
let vinylscratchsound
let musicalfont
let contentfont
function preload() {
    contentfont = loadFont('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/contenttext.ttf?v=1737346558995');
   musicalfont=
    loadFont('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/musicfont.otf?v=1737345753831');
    circlecolor = color(255, 255, 255, 255);
    keyaudioJazz = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/key%20jazz.wav?v=1736841608009';
    drumaudioJazz = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/drum%20jazz.wav?v=1736842301819';
    violinaudioJazz = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/violin%20jazz.wav?v=1736840324847';
    hornaudioJazz = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/horn%20jazz.wav?v=1736840314161';


    
    keyaudioHiphop = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/key%20hiphop.wav?v=1736841608009';
    drumaudioHiphop = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/drum%20hiphop.wav?v=1736840321085';
    violinaudioHiphop = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/violin%20hiphop.wav?v=1736840324847';
    hornaudioHiphop = 'https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/horn%20hiphop.wav?v=1736871557323'
    popsound=loadSound('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/pop.mp3?v=1736840324847')
    vinylscratchsound= loadSound('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/vinyl%20scratch.mp3?v=1737340569865')

    currentKeyAudio = keyaudioJazz;
    currentDrumAudio = drumaudioJazz;
    currentViolinAudio = violinaudioJazz;
    currentHornAudio = hornaudioJazz;


    keyaudio = loadSound(currentKeyAudio);
    drumaudio = loadSound(currentDrumAudio);
    violinaudio = loadSound(currentViolinAudio);
    hornaudio = loadSound(currentHornAudio);


    radio = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/radio%20round.png?v=1737195232751');
    grammy = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/grammy.png?v=1736859962139');
    keyImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/key%20sticker%20jazz.png?v=1737042712390');
    drumImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/drum%20sticker%20jazz.png?v=1737042700171');
    hornImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/horn%20sticker%20jazz.png?v=1737042709707');
    violinImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/violin%20sticker%20jazz.png?v=1737042716756');
    muteImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/mute.png?v=1737042720112');
    speakerImg = grammy;
    hiphopbackgound = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/hiphop%20background.png?v=1737235219573&fbclid=IwY2xjawH4-ztleHRuA2FlbQIxMAABHT-DmUJ02jdqQmQFoCrcKl1uMVidIDWyPWhGRSvXT-V2QUZO9PmjX5ZJFQ_aem_8OCG90dXaURGMemQNWqS_A')
}

let draggingKey = false;
let draggingDrum = false;
let draggingViolin = false;
let draggingHorn = false;

let offsetXKey, offsetYKey, offsetXDrum, offsetYDrum, offsetXViolin, offsetYViolin, offsetXHorn, offsetYHorn;
let imgXKey, imgYKey, imgXDrum, imgYDrum, imgXViolin, imgYViolin, imgXHorn, imgYHorn;

function setup() {
    textStyle(NORMAL);
    textFont(musicalfont);
    textLeading(40); // Increase the leading (line spacing)
    createCanvas(800,500);
    background(0);
    fft = new p5.FFT();
    angleMode(DEGREES);

    imgXKey = width * 0.0375;
    imgYKey = height * 0.24;
    imgXDrum = width * 0.075;
    imgYDrum = height * 0.48;
    imgXViolin = width * 0.8125;
    imgYViolin = height * 0.08;
    imgXHorn = width * 0.7875;
    imgYHorn = height * 0.54;
    myInput = createInput();
    myInput.size(170, 30);
    myInput.position((width - 170) / 2 - 10, height - 70);
    myInput.style('color', circlecolor);

    myInput.style('outline', 'none');
    myInput.style('border', 'none');
    myInput.style('background-color', 'transparent');
    myInput.style('text-align', 'center');
    myInput.elt.addEventListener('keydown', event => event.stopPropagation());
}

let isHoveringKey = false;
let isHoveringDrum = false;
let isHoveringViolin = false;
let isHoveringHorn = false;


function draw() {
    vinylscratchsound.setVolume(0.5);

    if (popsound.isPlaying()) {
        popsound.setVolume(0.7);
    }

    if (currentKeyAudio === keyaudioHiphop) {
        background(color(200, 41, 135));
    } else {
        background('#4654ae');
    }
    if (currentKeyAudio === keyaudioHiphop) {
        image(hiphopbackgound, 0, 0, width, height);
    }

    fill(255);
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(NORMAL);
    textSize(32);
    fill(255);
    noStroke();
    if (document.activeElement !== myInput.elt) {
        textSize(width * 0.055);
        textFont(musicalfont);

        text(myInput.value().toUpperCase() || 'CREATE YOUR SONG', width / 2, height * 0.06);
        textFont(contentfont);

        textStyle(ITALIC);
        textSize(width * 0.02);
        fill(255, 255, 255, 127); // White with 50% opacity
        text('Press I to see instruction.', width / 2, height * 0.16);
    } else {
        textSize(width * 0.055);
        textFont(musicalfont);
        text(myInput.value().toUpperCase() || 'CREATE YOUR SONG', width / 2, height * 0.06);
        textSize(width * 0.02);
        textStyle(ITALIC);
        textFont(contentfont);
        fill(255, 255, 255, 127); // White with 50% opacity

        text('Press I to see instruction.', width / 2, height * 0.16);

    }
    textStyle(NORMAL);

    noStroke();
    if (currentKeyAudio === keyaudioJazz) {
        // Draw the bar visualizer around the ellipse
        let spectrum = fft.analyze();
        let numBars = 140; // Increase the number of bars to make them closer together
        let angleStep = 360 / numBars;
        for (let i = 0; i < numBars; i++) {
            let angle = i * angleStep;
            let amp = spectrum[i];
            let r = map(amp, 0, 256, 100, 180); // Increase the upper limit to make the bars more sensitive
            let x = width / 2 + r * cos(angle);
            let y = height / 2 + r * sin(angle);
            let x2 = width / 2 + 120 * cos(angle); // Adjust the line to touch the ellipse
            let y2 = height / 2 + 120 * sin(angle); // Adjust the line to touch the ellipse
            stroke(circlecolor);
            strokeWeight(3); // Increase the thickness of the bars
            line(x, y, x2, y2);
        }
    } else {
        // Draw the waveform visualizer
        push();
        translate(width / 2, height / 2);
        var wave = fft.waveform();
        beginShape();
        for (var i = 0; i <= 300; i += 0.5) { // Increase the step to make the wave length shorter
            var index = floor(map(i, 0, 180, 0, wave.length - 1));
            var r = map(wave[index], -1, 1, 100, 140); // Increase the upper limit to make the wave go higher
            var x = r * sin(i);
            var y = r * cos(i);
            vertex(x, y);
            stroke(circlecolor);
            fill(circlecolor);
            strokeWeight(3); // Increase the thickness of the bars
        }
        endShape();
        beginShape();
        for (var i = 0; i <= 300; i += 0.5) { // Increase the step to make the wave length shorter
            var index = floor(map(i, 0, 180, 0, wave.length - 1));
            var r = map(wave[index], -1, 1, 100, 140); // Increase the upper limit to make the wave go higher
            var x = r * -sin(i);
            var y = r * cos(i);
            vertex(x, y);
            fill(circlecolor);
            stroke(circlecolor);
            strokeWeight(3); // Increase the thickness of the bars
        }
        endShape();
        pop();
    }
    if (!instruction) {
        myInput.attribute('placeholder', 'Enter your song name here');
        myInput.style('color', 'white');
        myInput.style('::placeholder', 'color: white');
    }

    // Draw the speakerImg in the middle of the screen
    fill(circlecolor);

    ellipse(width / 2, height / 2, width * 0.3, height * 0.48); // Draw a circle at the center of the canvas
    let speakerImgHeight = (speakerImg.height / speakerImg.width) * speakerImgWidth;
    let speakerX = (width - speakerImgWidth) / 2;
    let speakerY = (height - speakerImgHeight) / 2;
    image(speakerImg, speakerX, speakerY, speakerImgWidth, speakerImgHeight);
    // Check if the mouse is over the keyImg
    isHoveringKey = mouseX > imgXKey && mouseX < imgXKey + 120 && mouseY > imgYKey && mouseY < imgYKey + (keyImg.height / keyImg.width) * 120;

    // Check if the mouse is over the drumImg
    isHoveringDrum = mouseX > imgXDrum && mouseX < imgXDrum + 120 && mouseY > imgYDrum && mouseY < imgYDrum + (drumImg.height / drumImg.width) * 120;

    // Check if the mouse is over the violinImg
    isHoveringViolin = mouseX > imgXViolin && mouseX < imgXViolin + 120 && mouseY > imgYViolin && mouseY < imgYViolin + (violinImg.height / violinImg.width) * 120;

    // Check if the mouse is over the hornImg
    isHoveringHorn = mouseX > imgXHorn && mouseX < imgXHorn + 120 && mouseY > imgYHorn && mouseY < imgYHorn + (hornImg.height / hornImg.width) * 120;

    // Determine the size of the keyImg
     keyImgWidth = isHoveringKey ? width * 0.175 : width * 0.15;
     keyImgHeight = (keyImg.height / keyImg.width) * keyImgWidth;
     adjustedXKey = imgXKey - (keyImgWidth - 120) / 2;
     adjustedYKey = imgYKey - (keyImgHeight - (keyImg.height / keyImg.width) * 120) / 2;

    // Update position if dragging keyImg
    if (draggingKey) {
        imgXKey = mouseX - offsetXKey;
        imgYKey = mouseY - offsetYKey;
        adjustedXKey = imgXKey - (keyImgWidth - 120) / 2;
        adjustedYKey = imgYKey - (keyImgHeight - (keyImg.height / keyImg.width) * 120) / 2;
    }

    // Check if keyImg is in the circle behind the speaker

    if (dist(imgXKey + 60, imgYKey + 60, width / 2, height / 2) < 150) {
        if (!ismute) {
            let currentVolume = keyaudio.getVolume();
            if (currentVolume < 1) {
                keyaudio.setVolume(currentVolume + 0.1);
            }
        } else {
            keyaudio.setVolume(0);
        }
        keyImgWidth = 80;
        keyImgHeight = (keyImg.height / keyImg.width) * keyImgWidth;
        adjustedXKey = imgXKey - (keyImgWidth - 120) / 2;
        adjustedYKey = imgYKey - (keyImgHeight - (keyImg.height / keyImg.width) * 120) / 2;
    } else {
        keyaudio.setVolume(0);
    }

    // Determine the size of the drumImg
    let drumImgWidth = isHoveringDrum ? width * 0.1625 : width * 0.1375;
    let drumImgHeight = (drumImg.height / drumImg.width) * drumImgWidth;
    let adjustedXDrum = imgXDrum - (drumImgWidth - 120) / 2;
    let adjustedYDrum = imgYDrum - (drumImgHeight - (drumImg.height / drumImg.width) * 120) / 2;

    // Update position if dragging drumImg
    if (draggingDrum) {
        imgXDrum = mouseX - offsetXDrum;
        imgYDrum = mouseY - offsetYDrum;
        adjustedXDrum = imgXDrum - (drumImgWidth - 120) / 2;
        adjustedYDrum = imgYDrum - (drumImgHeight - (drumImg.height / drumImg.width) * 120) / 2;
    }

    // Check if drumImg is in the circle behind the speaker
    if (dist(imgXDrum + 60, imgYDrum + 60, width / 2, height / 2) < 150) {
        if (!ismute) {
            let currentVolume = drumaudio.getVolume();
            if (currentVolume < 1) {
                drumaudio.setVolume(currentVolume + 0.1);
            }
        } else {
            drumaudio.setVolume(0);
        }
        drumImgWidth = width * 0.1;
        drumImgHeight = (drumImg.height / drumImg.width) * drumImgWidth;
        adjustedXDrum = imgXDrum - (drumImgWidth - width * 0.15) / 2;
        adjustedYDrum = imgYDrum - (drumImgHeight - (drumImg.height / drumImg.width) * width * 0.15) / 2;
    } else {
        drumaudio.setVolume(0);
    }

    // Determine the size of the violinImg
    let violinImgWidth = isHoveringViolin ? width * 0.1125 : width * 0.0875;
    let violinImgHeight = (violinImg.height / violinImg.width) * violinImgWidth;
    let adjustedXViolin = imgXViolin - (violinImgWidth - 120) / 2;
    let adjustedYViolin = imgYViolin - (violinImgHeight - (violinImg.height / violinImg.width) * 120) / 2;

    // Update position if dragging violinImg
    if (draggingViolin) {
        imgXViolin = mouseX - offsetXViolin;
        imgYViolin = mouseY - offsetYViolin;
        adjustedXViolin = imgXViolin - (violinImgWidth - 80) / 2;
        adjustedYViolin = imgYViolin - (violinImgHeight - (violinImg.height / violinImg.width) * 80) / 2;
    }

    // Check if violinImg is in the circle behind the speaker
    if (dist(imgXViolin + 60, imgYViolin + 60, width / 2, height / 2) < 150) {
        let currentVolume = violinaudio.getVolume();
        if (currentVolume < 1.2) {
            violinaudio.setVolume(currentVolume + 0.1);
        }
        violinImgWidth = 50;
        if (ismute) {
            violinaudio.setVolume(0);
        }
        violinImgHeight = (violinImg.height / violinImg.width) * violinImgWidth;
        adjustedXViolin = imgXViolin - (violinImgWidth - 120) / 2;
        adjustedYViolin = imgYViolin - (violinImgHeight - (violinImg.height / violinImg.width) * 120) / 2;
    } else {
        violinaudio.setVolume(0);
    }

    // Determine the size of the hornImg
    let hornImgWidth = isHoveringHorn ? width * 0.15 : width * 0.125;
    let hornImgHeight = (hornImg.height / hornImg.width) * hornImgWidth;
    let adjustedXHorn = imgXHorn - (hornImgWidth - 120) / 2;
    let adjustedYHorn = imgYHorn - (hornImgHeight - (hornImg.height / hornImg.width) * 120) / 2;

    // Update position if dragging hornImg
    if (draggingHorn) {
        imgXHorn = mouseX - offsetXHorn;
        imgYHorn = mouseY - offsetYHorn;
        adjustedXHorn = imgXHorn - (hornImgWidth - 120) / 2;
        adjustedYHorn = imgYHorn - (hornImgHeight - (hornImg.height / hornImg.width) * 120) / 2;
    }

    // Check if hornImg is in the circle behind the speaker
    if (dist(imgXHorn + 60, imgYHorn + 60, width / 2, height / 2) < 150) {
        if (!ismute) {
            let currentVolume = hornaudio.getVolume();
            if (currentVolume < 1) {
                hornaudio.setVolume(currentVolume + 0.1);
            }
        } else {
            hornaudio.setVolume(0);
        }
        hornImgWidth = 60;
        hornImgHeight = (hornImg.height / hornImg.width) * hornImgWidth;
        adjustedXHorn = imgXHorn - (hornImgWidth - 120) / 2;
        adjustedYHorn = imgYHorn - (hornImgHeight - (hornImg.height / hornImg.width) * 120) / 2;
    } else {
        hornaudio.setVolume(0);
    }

    // Draw the keyImg
    if (isHoveringKey || dist(imgXKey + 60, imgYKey + 60, width / 2, height / 2) < 150) {
        image(keyImg, adjustedXKey, adjustedYKey, keyImgWidth, keyImgHeight);
        if (!popSoundKeyPlayed) {
            popsound.play();
            popSoundKeyPlayed = true;
        }
        } else {
        popSoundKeyPlayed = false;
       
        push();
        translate(adjustedXKey + keyImgWidth / 2, adjustedYKey + keyImgHeight / 2);
        rotate(-20);
        imageMode(CENTER);
        image(keyImg, 0, 0, keyImgWidth, keyImgHeight);
        pop();
    }

    // Draw the drumImg
    if (isHoveringDrum || dist(imgXDrum + 60, imgYDrum + 60, width / 2, height / 2) < 150) {
        image(drumImg, adjustedXDrum, adjustedYDrum, drumImgWidth, drumImgHeight);
        if (!popSoundDrumPlayed) {
            popsound.play();
            popSoundDrumPlayed = true;
        }
        } else {
        popSoundDrumPlayed = false;
        push();
        translate(adjustedXDrum + drumImgWidth / 2, adjustedYDrum + drumImgHeight / 2);
        rotate(20);
        imageMode(CENTER);
        image(drumImg, 0, 0, drumImgWidth, drumImgHeight);
        pop();
    }

    // Draw the violinImg
    if (isHoveringViolin || dist(imgXViolin + 60, imgYViolin + 60, width / 2, height / 2) < 150) {
        image(violinImg, adjustedXViolin, adjustedYViolin, violinImgWidth, violinImgHeight);
        if (!popSoundViolinPlayed && !popsound.isPlaying()) {
            popsound.play();
            popSoundViolinPlayed = true;
        }
    } else {
        popSoundViolinPlayed = false;
        push();
        translate(adjustedXViolin + violinImgWidth / 2, adjustedYViolin + violinImgHeight / 2);
        rotate(25);
        imageMode(CENTER);
        image(violinImg, 0, 0, violinImgWidth, violinImgHeight);
        pop();
    }

    // Draw the hornImg
    if (isHoveringHorn || dist(imgXHorn + 60, imgYHorn + 60, width / 2, height / 2) < 150) {
        image(hornImg, adjustedXHorn, adjustedYHorn, hornImgWidth, hornImgHeight);
        if (!popSoundHornPlayed) {
            popsound.play();
            popSoundHornPlayed = true;
        }
    } else {
        popSoundHornPlayed = false;
        push();
        translate(adjustedXHorn + hornImgWidth / 2, adjustedYHorn + hornImgHeight / 2);
        rotate(-15);
        imageMode(CENTER);
        image(hornImg, 0, 0, hornImgWidth, hornImgHeight);
        pop();
    }
    // Draw the muteImg if ismute is true
    if (ismute) {
        let muteImgWidth = 100;
        let muteImgHeight = (muteImg.height / muteImg.width) * muteImgWidth;
        let muteX = (width - muteImgWidth) / 2;
        let muteY = (height - muteImgHeight) / 2;
        image(muteImg, muteX, muteY, muteImgWidth, muteImgHeight);

    }
    // Draw the input box for the song name
    let inputBoxWidth = 200;
    let inputBoxHeight = 30;
    let inputBoxX = (width - inputBoxWidth) / 2;
    let inputBoxY = height - inputBoxHeight - 20;
    // Add a text after the input
    fill(255);
    noStroke()
    textSize(16);
    textAlign(LEFT, CENTER);
    text('.mp3', myInput.position().x + 165, myInput.position().y + 8);
    

    // Draw a rectangle under the input
    fill(255);
    rect(inputBoxX, inputBoxY - 18 + inputBoxHeight - 15, inputBoxWidth - 32, 1);

    if (instruction) {

        fill(0, 0, 0, 150); // Black with some transparency
        rect(0, 0, width, height); // Cover the entire canvas
        filter(BLUR, 3); // Apply a blur filter
        fill(255, 0, 0);
        fill(255, 255, 255, 120); // White with 50% transparency
        rect((width - 500) / 2, (height - 300) / 2, 500, 300);
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(14);

        textSize(40);
        textStyle(NORMAL);
        textFont(musicalfont);
        text('Welcome', width / 2, height / 2 - 120);
        textSize(14);
        textFont(contentfont)
        text('Let your imagination fly and create various unique music just for you', width / 2, height / 2 - 70 - 20);
        textSize(40);
        textFont(musicalfont);

        text('Instructions', width / 2, height / 2 - 50);
        textFont(contentfont)
        textSize(14);
        textAlign(LEFT, CENTER);
        text('1. Drag and drop the instruments into the speaker to play them.', width / 2 - 210, height / 2 - 20);
        text('2. Press "M" to mute/unmute.', width / 2 - 210, height / 2 + 10);
        text('3. Press "R" to reset.', width / 2 - 210, height / 2 + 40);
        text('4. Press "S" to switch genre.', width / 2 - 210, height / 2 + 70);
        textStyle(BOLD);
        textSize(15);
        textAlign(CENTER, CENTER);
        text('IF THE MUSIC GLITCH/DOES NOT START, PRESS R TO RESET.', width / 2, height / 2 + 100);
        textStyle(NORMAL);

        textSize(12);

        fill(255, 255, 255, 127); // Grey color with 50% opacity
        textStyle(ITALIC);
        text('Press anything to close instruction', width / 2, height / 2 + 128);
    }
    
}


function mousePressed() {

    if (mouseX > imgXKey && mouseX < imgXKey + 120 && mouseY > imgYKey && mouseY < imgYKey + (keyImg.height / keyImg.width) * 120) {
        draggingKey = true;
        offsetXKey = mouseX - imgXKey;
        offsetYKey = mouseY - imgYKey;
    } else if (mouseX > imgXDrum && mouseX < imgXDrum + 120 && mouseY > imgYDrum && mouseY < imgYDrum + (drumImg.height / drumImg.width) * 120) {
        draggingDrum = true;
        offsetXDrum = mouseX - imgXDrum;
        offsetYDrum = mouseY - imgYDrum;
    } else if (mouseX > imgXViolin && mouseX < imgXViolin + 120 && mouseY > imgYViolin && mouseY < imgYViolin + (violinImg.height / violinImg.width) * 120) {
        draggingViolin = true;
        offsetXViolin = mouseX - imgXViolin;
        offsetYViolin = mouseY - imgYViolin;
    } else if (mouseX > imgXHorn && mouseX < imgXHorn + 120 && mouseY > imgYHorn && mouseY < imgYHorn + (hornImg.height / hornImg.width) * 120) {
        draggingHorn = true;
        offsetXHorn = mouseX - imgXHorn;
        offsetYHorn = mouseY - imgYHorn;
    }

}


function mouseReleased() {

    draggingKey = false;
    draggingDrum = false;
    draggingViolin = false;
    draggingHorn = false;
}




let isPlayed = false;

function mouseClicked() {
    instruction = false
    if (!isPlayed) {
        keyaudio.loop();
        keyaudio.setVolume(0);
        drumaudio.loop();
        drumaudio.setVolume(0);
        violinaudio.loop();
        violinaudio.setVolume(0);
        hornaudio.loop();
        hornaudio.setVolume(0);
        isPlayed = true;
    }
}

function keyPressed() {
 
    instruction = false
    if (keyCode === 73) { // 'I' key
        instruction = !instruction;
    }
        if (keyCode === 77) { // 'M' key
        ismute = !ismute;
    }
    if (keyCode === 82) { // 'R' key
        imgXKey = 40;
        imgYKey = 120;
        imgXDrum = 70;
        imgYDrum = 240;
        imgXViolin = 650;
        imgYViolin = 40;
        imgXHorn = 630;
        imgYHorn = 270;


    } else if (keyCode === 83) { // 'S' key
        /*   imgXKey = 40;
      
            imgYKey = 100;
            imgXDrum = 40;
            imgYDrum = 240;
            imgXViolin = 650;
            imgYViolin = 30;
            imgXHorn = 650;
            imgYHorn = 280;*/
          
    
        if (currentKeyAudio === keyaudioJazz) {
            currentKeyAudio = keyaudioHiphop;
            currentDrumAudio = drumaudioHiphop;
            currentViolinAudio = violinaudioHiphop;
            currentHornAudio = hornaudioHiphop;

        } else {
            currentKeyAudio = keyaudioJazz;
            currentDrumAudio = drumaudioJazz;
            currentViolinAudio = violinaudioJazz;
            currentHornAudio = hornaudioJazz;

        }

        keyaudio.stop();
        drumaudio.stop();
        violinaudio.stop();
        hornaudio.stop();

        vinylscratchsound.play(); // Play vinyl scratch sound

        vinylscratchsound.onended(() => {
            keyaudio = loadSound(currentKeyAudio, () => keyaudio.loop());
            drumaudio = loadSound(currentDrumAudio, () => drumaudio.loop());
            violinaudio = loadSound(currentViolinAudio, () => violinaudio.loop());
            hornaudio = loadSound(currentHornAudio, () => hornaudio.loop());
        });
        if (speakerImg === grammy) {
            speakerImg = radio;
            speakerImgWidth = 150


        } else {
            speakerImg = grammy;
            speakerImgWidth = 120


        }
    
    if (currentKeyAudio === keyaudioHiphop) {

        circlecolor = color(255, 211, 68, 255);
        myInput.style('color', circlecolor);



    } else {
        circlecolor = color(255, 255, 255, 255);
        myInput.style('color', circlecolor);



    }
    if (currentKeyAudio === keyaudioHiphop) {
        keyImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/key%20sticker.png?v=1736834017320');
        drumImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/drum%20sticker.png?v=1736775136018');
        hornImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/horn%20sticker.png?v=1736814525995')
        violinImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/violin%20sticker.png?v=1736834015221')

    } else {
        drumImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/drum%20sticker%20jazz.png?v=1737042700171');
        hornImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/horn%20sticker%20jazz.png?v=1737042709707');
        violinImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/violin%20sticker%20jazz.png?v=1737042716756');
        keyImg = loadImage('https://cdn.glitch.global/f58f7dd0-0348-410e-b29f-d9ba7620b4a8/key%20sticker%20jazz.png?v=1737042712390');
    }

}}
