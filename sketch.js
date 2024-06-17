/*
----------------------------------------------------------------

        trāma by p1xelfool

----------------------------------------------------------------
*/

let t = 0.0;
let pg, pgMask;
let pgMaskArray;
let recording = true;
let pgW, pgH;

//SYSTEM
let runners = null;

//PALETTE
let finalCol, finalCol1, finalCol2;
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

let finalImage, finalImage2, tempPixels, tempPixels2;

/////RESOLUTION
let r1 = 10;
let tempR = 5;
let canvas;

/////SEEDS
let seeds;

//////MARGINS
let marginX;
let marginY;

let seedCount = 0;
let seedIndex = 0;


////PAUSE PLAY
let running = true;

////MODULO
let mod, modMult;
let modArray = [[2,2],[2,3],[2,4],[4,2]];//[[2, 2],[2,3],[3, 5],[2,7],[5, 3], [5, 32]];//[[16, 16],[8, 8], [4,4]];//[[4,2],[6,2],[8,2],[16,2],[2,3],[2,4],[2,8],[2,16],[3,8],[3,16]];
let margArray = [10, 20];

////PARTICLE NOISE MASK THRESHOLD
let noiseThresh2;

////GLITCHNESS
let hasGlitch;

//////PARTICLE SYSTEM
var maskRunner;
let numParticles = 0;
let rParticles = 0;
let gParticles = 0;
let bParticles = 0;
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
    

    seeds = [
        [int(hl.random()*111111), int(hl.random()*111111), int(hl.random()*111111)], 
    ]
    
    seeds[0,0];
    randomSeed(seeds[0][0]);

    ///RES
    if(windowWidth > windowHeight){
        r1=tempR;
    }else{
        r1=tempR;
    }

    ////PALETTE
    palettePicker = floor(hl.random(0, palette.length));


        ///////MARGINS
        let marginFinal = margArray[floor(hl.random(0, margArray.length))];
        marginX = marginFinal;
        marginY = marginFinal;


   //NOISE THRESH
   noiseThresh2 = hl.random(0.8, 0.99);

   ///HAS GLITCH    
//   if(random()>0.1){
        hasGlitch = true;
    // }else{
    //     hasGlitch = false;
    // }

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

    
    begin(seeds[0][0]);
    setupGif();

   }

function draw() {
   
    ////IF NOT PAUSED
    if (running == true) {
        t++;

        // // /////ROTATE THE SEED
        // if (t > 1 && t % 520 == 0) {
        //     ///ADDS TO SEED COUNT
        //     if (seedCount < 2) {
        //         seedCount++;
        //     } else {
        //         seedCount = 0;
        //     }

        //     begin(seeds[seedIndex][int(seedCount)]);
        // }


        if(frameCount%100==0){
            bornAtX = hl.random(bornMargin, pgMask.width-bornMargin);
            bornAtY = hl.random(bornMargin, pgMask.height-bornMargin);
        }
 

        if(frameCount==1){
            pgMask.background(color(palette[palettePicker][0]));
        }
        // console.log(frameRate());

        //////BACKGROUND
        // if(frameCount==1){
        //     for (let x = 0; x < pgMask.width; x++) {
        //         for (let y = 0; y < pgMask.height; y++) {
        //             let index = (x + y * pgMask.width) * 4;

        //             let bgColor = color(palette[palettePicker][0]);

        //             pgMaskArray[index] = int(red(bgColor));
        //             pgMaskArray[index+1] = int(green(bgColor));;
        //             pgMaskArray[index+2] = int(blue(bgColor));;
        //             pgMaskArray[index+3] = 255;
        //         }
        //     }
        // }

        
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
        
        // for (let x = 0; x < pgMask.width; x++) {
        //     for (let y = 0; y < pgMask.height; y++) {
        //         let index = (x + y * pgMask.width) * 4;

        //         // pgMask.pixels[index] = 120;
        //         // pgMask.pixels[index + 1] = 120;
        //         // pgMask.pixels[index + 2] = 120;
        //         // pgMask.pixels[index + 3] = 255;//pgMaskArray[index + 3];

                
        //         pgMask.pixels[index] = pgMaskArray[index];
        //         pgMask.pixels[index + 1] = pgMaskArray[index + 1];
        //         pgMask.pixels[index + 2] = pgMaskArray[index + 2];
        //         pgMask.pixels[index + 3] = pgMaskArray[index + 3];;//pgMaskArray[index + 3];



        //         // pgMask.pixels[index] = 0;
        //         // pgMask.pixels[index + 1] = 0;
        //         // pgMask.pixels[index + 2] = 0;
        //         // pgMask.pixels[index + 3] = 0;

            
        //     }
        // }


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
    // begin(seeds[seedIndex][0]);
}




function begin(finalSeed) {

    t = 0.0;
    frameCount = 0;

    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);
    
    randomSeed(finalSeed);

    //DEFINE PROPORTIONS
    let ww, hh;
        ww = 2560;
        hh = 2560 / (innerWidth / innerHeight);
    let pgX = int(ww / r1 + 1);
    let pgY = int(hh / r1 + 1);
    // pg = createGraphics(pgX, pgY);
    // pg.pixelDensity(1);
    // pg.colorMode(HSB);


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


    tempPixels = [];
    tempPixels2 = [];
    pixelDensity(1);

    ////SEED FOR COLORS AND SYSTEMS
    ///PALETTES 
    palette1 = [];

    colorPicker = floor(hl.random(0, palette[palettePicker].length));
    finalCol1 = color(palette[palettePicker][colorPicker]);
    colorPicker = floor(hl.random(0, palette[palettePicker].length));
    finalCol2 = color(palette[palettePicker][colorPicker]);

    for (let i = 0; i < numSystems; i++) {
        colorPicker = floor(hl.random(0, palette[palettePicker].length));
        finalCol = color(palette[palettePicker][colorPicker]);
        
        palette1[i] = finalCol;
    }


}





/////COMMANDS


function keyTyped() {

    ////PAUSE
    if (key === 'p') {
        running = !running;
    } else if (key === 's') {
        saveCanvas(int(seedCount) + '_trama' + '.png');
    } else if (key === 'g') {
        makeGif = true;
        begin(seeds[seedIndex][int(seedCount)]);
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



