/*
----------------------------------------------------------------

     by p1xelfool

----------------------------------------------------------------
*/

let t = 0.0;
let pgMask;
let pgMaskArray;
let recording = true;
let pgW, pgH;


//PALETTE
let finalCol;
let palette = [
                ['#9d9e96', '#fe361f', '#00ff6c'],

                ['#9d9e96', '#fe361f', '#00ff6c', '#0000ff'],
                ['#9f9a93', '#7f776b', '#151112', '#c6ff00'],
                ['#767d72', '#fe0000', '#fd6d03', '#ff320b'],
                ['#575757', '#0f0f0f', '#fe5d05', '#005bda'],
                ['#767676', '#0000ff', '#e2e6ec', '#00FF00'],
                ['#b3b3b3', '#d7ff00', '#ff320b', '#aa0050'],                
                ['#000000', '#d1fe39', '#e3ddd1', '#1dec57'],
                ['#000000', '#bec544', '#2b2d00', '#ff1500'], 
                ['#000000', '#d1ff00', '#e2e6ec', '#00d8ff'], 
                ['#000000', '#002d97', '#e2e6ec', '#d1ff00'], 

                ['#767676', '#aa0050', '#01867b', '#c6ff00', '#1b2548'],
                ['#bebebe', '#d1ff00', '#b3f700', '#00c522', '#13181b'],

                ['#575757', '#0f0f0f', '#ff77f3', '#c6ff00', '#fe5d05', '#005bda'],
                
];

let paletteName = [
    ':3 x00',
    
    ':4 x0:',
    ':4 x0;',
    ':4 x0[',
    ':4 x0*',
    ':4 x0#',
    ':4 x0+',
    ':4 x0!',
    ':4 x0~',
    ':4 x0>',
    ':4 x0/',
    
    ':5 xx',
    ':5 xx-',

    ':6 xx%',
];


let palette1;
let palettePicker;

let colorPicker;
let numSystems;


/////RESOLUTION
let r1 = 10;
let tempR = 5;
let canvas;

////PAUSE PLAY
let running = true;

//////PARTICLE SYSTEM
var maskRunner;
let bornMargin;

///GIF
let saveGif = false;

let gif;
let framesToSkip = 2;
let makeGif = false;
let isGifExported = false;

///////PAINT
let bornAtX = 0;
let bornAtY = 0;

//////RANDOM POSITION VS CONCENTRATED
let randomPos;

////CIRCLE PERCENTAGE
let circlePercentage;

//////MAX TIME
let maxTime;
let maxTimeArray = [800, 1200, 1600];




function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);
    

    ///RES
    if(windowWidth > windowHeight){
        r1=tempR;
    }else{
        r1=tempR;
    }

    ////PALETTE
    palettePicker = floor(hl.random(0, palette.length));

    ///NUM SYSTEMS
    numSystems = floor(hl.random(3, 7.99));

    ////PARTICLE SYSYTEM
    maskRunner = [];
    bornMargin = -50;//random(5, 15);

    //////RANDOM POSITION VS CONCENTRATED /// IF HIGHER MORE CONCENTRATED
    randomPos = hl.random(0.4, 0.7);

    ////CIRCLE
    circlePercentage = hl.random(0.7, 0.9);

    ////maxTime
    let maxTimePicker = floor(hl.random(0, maxTimeArray.length));
    maxTime = maxTimeArray[maxTimePicker];
    
    
    hl.token.setTraits({
        Palette: paletteName[palettePicker],
        Colors: palette[palettePicker].length,
        TimeGen: maxTime,
      });

      console.log(hl.token.getTraits());

    
    begin();
    setupGif();

   }

function draw() {
   
    ////IF NOT PAUSED
    if (running == true) {
        t++;

        if(frameCount%100==0){
            bornAtX = hl.random(bornMargin, pgMask.width-bornMargin);
            bornAtY = hl.random(bornMargin, pgMask.height-bornMargin);
        }
 

        if(frameCount==1){
            pgMask.background(color(palette[palettePicker][0]));
        }
        // console.log(frameRate());

        
        ////////////////////////
        ////////////// PARTICLE SYSTEM MASK
            //////1000, 1500
                    if(frameCount%10==0 && frameCount<maxTime){
                        for(let i=0; i<1; i++){
                            maskRunner.push(new particleSystemMask);
                        }
                        
                    }
                
                       
        /////////////////////////
        ////////////////PARTICLE SYSTEM MASK
        

        pgMask.loadPixels();

         //RUN SYSTEM
         let len = maskRunner.length;
                    
         for (let i = len - 1; i >= 0; i--) {
         let p = this.maskRunner[i];
     
         p.add();
         p.run();
     
         //CHECK IF DEAD
         if (p.isDead()) {
             this.maskRunner.splice(i, 1);
         }
         }
        


        pgMask.updatePixels();


        imageMode(CENTER);
        image(pgMask, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
        

    } /////IF RUNNING

        // GIF: Add frame
        if (makeGif &&
            !isGifExported &&
            ((frameCount - 1) % framesToSkip == 0 || frameCount == 1)
        ) {
            console.log(`Added frame.`)
            gif.addFrame(canvas.elt, {
                delay: 30,
                copy: true
            });
        }
     
        // GIF: Render when done
        if (makeGif &&
            !isGifExported &&
            t>900
        ) {
            print('Exporting GIF...');
            gif.render();
            isGifExported = true;
        }
}

function windowResized() {
    //resizeCanvas(windowWidth, windowHeight);
    // if(windowWidth >= windowHeight){
    //     r1=tempR;
    // }else{
    //     r1=tempR;
    // }
    // begin();
}




function begin() {

    t = 0.0;
    frameCount = 0;

    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);
    

    //DEFINE PROPORTIONS
    let ww, hh;
        ww = 2560;
        hh = 2560 / (innerWidth / innerHeight);
    let pgX = int(ww / r1 + 1);
    let pgY = int(hh / r1 + 1);


    ///PGMASK
    pgMask = createGraphics(pgX, pgY);
    pgMask.pixelDensity(1);
    pgMask.noSmooth();
    pgMask.colorMode(HSB, 360, 100, 100, 100);
    pgMaskArray = [];



    /////RANDOM POSITION
    bornAtX = hl.random(bornMargin, pgMask.width-bornMargin);
    bornAtY = hl.random(bornMargin, pgMask.height-bornMargin);

    canvas.imageSmoothingEnabled = false;
    p5.disableFriendlyErrors = true;
    noSmooth();

    pixelDensity(1);

}





/////COMMANDS


function keyTyped() {

    ////PAUSE
    if (key === 'p') {
        running = !running;
    } else if (key === 's') {
        saveCanvas('image' + '.png');
    } else if (key === 'g') {
        makeGif = true;
        begin();
    }
}


function setupGif() {
    recordedFrames = 0;

    gif = new GIF({
        workers: 2,
        quality: 10,
        framerate: 30,
        workerScript: './gif.worker.js'
    });

    gif.on('finished', function(blob) {
        print('your GIF is ready ///')
        rendering = false;
        window.open(URL.createObjectURL(blob));
        setupGif();
        recordedFrames = 0;
    });

}



