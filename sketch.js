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
//['#1a3e92', '#c6c6d3', '#e35905'], ///////////////////////
//['#767d72', '#cde500', '#fd6d03', '#ff320b'], /////////////////
//['#ece6d6', '#f1bc00', '#191816', '#8a1616'], /////////////////
    //['#d4d4d4', '#d5ff19', '#ebf700', '#90a548', '#bcc7a7', '#ef7731'], 
    //['#bfb4ae', '#a7b0b5', '#caf501', '#bcb1ab', '#bac3c5'], 
     //['#93989e', '#acef02', '#f49ebb', '#d5d6d8'],
    // ['#000000','#93989e', '#acef02', '#0000FF', '#d5d6d8'],
     //['#d2d1cf', '#e1e421', '#d2bfd2', '#cab16e', '#449db9', '#6cc4d8', '#55bcb3', '#728897', '#dae251', '#d5d8dd'],
    
      //['#10263b', '#143626', '#134151', '#3b7566','#ff3c00'],///////////////////

     ['#a99c89', '#151112', '#c6ff00'],/////////////////////////
     //['#a99c89', '#151112', '#f5800c'],
    // ['#cbff00', '#f4f1ee', '#b084f7'],
    // ['#d7fe52', '#e3ddd1', '#1dec57'],
    // ['#d7fe52', '#e3ddd1', '#6800f6'],
    // ['#d7fe52', '#e2e6ec', '#00d8ff'],

     
     
    //  ['#000', '#bec544', '#ff1500'],
    // ['#ece9db', '#ad7722', '#0152a3'],
    
    // ['#7689ff', '#5dffa0', '#e2e6ec'],
    // ['#d7fe52', '#ed6ef7', '#eb4e4d'],
    

    // ['#EB79F1', '#CCFD7A', '#0000FF'],
    // ['#00FF00', '#00FF00', '#0000FF'],
];

let paletteName = [
    'RGB',
    'Clock Sunset',
    'Math Candy',

    'Camera Toy',
    'Purple Trail',
    'Code Breeze',
    'Vanilla Night',
    '0 Breeze',

    'Velvet Circuit',
    'Pixel Noon',
    'Soft Array',
    'Blue Key',

    'Cotton PI',
    'Boot Sunrise',
    'Light Mint'
]


let palette1, palette2;
let palettePicker, palettePicker2;

let colorPicker;
let numSystems;

let finalImage, finalImage2, tempPixels, tempPixels2;

/////RESOLUTION
let r1 = 10;
let tempR = 4;
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
let framesToSkip = 1;
let makeGif = false;
let isGifExported = false;

///////PAINT
let bornAtX = 0;
let bornAtY = 0;

//////RANDOM POSITION VS CONCENTRATED
let randomPos;

////CIRCLE PERCENTAGE
let circlePercentage;




function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);
    

    seeds = [
        [int($fx.rand()*111111), int($fx.rand()*111111), int($fx.rand()*111111)], 
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
    palettePicker = floor(random(0, palette.length));
    palettePicker2 = floor(random(0, palette.length));


        ///////MARGINS
        let marginFinal = margArray[floor(random(0, margArray.length))];
        marginX = marginFinal;
        marginY = marginFinal;


   //NOISE THRESH
   noiseThresh2 = random(0.8, 0.99);

   ///HAS GLITCH    
//   if(random()>0.1){
        hasGlitch = true;
    // }else{
    //     hasGlitch = false;
    // }

    ///NUM SYSTEMS
    numSystems = floor(random(3, 7.99));

    ////PARTICLE SYSYTEM
    maskRunner = [];
    bornMargin = random(5, 15);

    //////RANDOM POSITION VS CONCENTRATED
    randomPos = random(1);

    ////CIRCLE
    circlePercentage = random(0.5, 0.9);
    
    

    
    begin(seeds[0][0]);
    setupGif();

    $fx.features({
        'Palette': paletteName[palettePicker],
        'Margin': marginX,
        'Glitch': hasGlitch,
        'Layers': numSystems
      })

      console.log('\n\n' + '    trāma by p1xelfool' + '\n\n' + '+++++++++++++++' + '\n\n' + '     Palette: ' + paletteName[palettePicker] + '\n' + '     Margin: ' + marginX + '\n' + '     Glitch: ' + hasGlitch + '\n' + '     Layers: ' + numSystems + '\n\n' + '+++++++++++++++');
}

function draw() {
   
    ////IF NOT PAUSED
    if (running == true) {

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
            bornAtX = random(bornMargin, pgMask.width-bornMargin);
            bornAtY = random(bornMargin, pgMask.height-bornMargin);
        }
 


        pgMask.background(color(palette[palettePicker][0]));
        console.log(frameRate());

        //////BACKGROUND
        if(frameCount==1){
            for (let x = 0; x < pgMask.width; x++) {
                for (let y = 0; y < pgMask.height; y++) {
                    let index = (x + y * pgMask.width) * 4;

                    let bgColor = color(palette[palettePicker][0]);

                    pgMaskArray[index] = int(red(bgColor));
                    pgMaskArray[index+1] = int(green(bgColor));;
                    pgMaskArray[index+2] = int(blue(bgColor));;
                    pgMaskArray[index+3] = 255;
                }
            }
        }

        
        ////////////////////////
        ////////////// PARTICLE SYSTEM MASK
                    if(frameCount%10==0){
                        for(let i=0; i<1; i++){
                            maskRunner.push(new particleSystemMask);
                        }
                        
                    }
                
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
        /////////////////////////
        ////////////////PARTICLE SYSTEM MASK
        

        pgMask.loadPixels();

        
        
        // for(let x = pgMask.width/2-recW/2; x<pgMask.width/2+recW/2; x++){
        //     for(let y = pgMask.height/2-recH/2; y<pgMask.height/2+recH/2; y++){
        for (let x = 0; x < pgMask.width; x++) {
            for (let y = 0; y < pgMask.height; y++) {
                let index = (x + y * pgMask.width) * 4;

                // pgMask.pixels[index] = 120;
                // pgMask.pixels[index + 1] = 120;
                // pgMask.pixels[index + 2] = 120;
                // pgMask.pixels[index + 3] = 255;//pgMaskArray[index + 3];

                
                pgMask.pixels[index] = pgMaskArray[index];
                pgMask.pixels[index + 1] = pgMaskArray[index + 1];
                pgMask.pixels[index + 2] = pgMaskArray[index + 2];
                pgMask.pixels[index + 3] = pgMaskArray[index + 3];;//pgMaskArray[index + 3];



                // pgMask.pixels[index] = 0;
                // pgMask.pixels[index + 1] = 0;
                // pgMask.pixels[index + 2] = 0;
                // pgMask.pixels[index + 3] = 0;

            
            }
        }

        

        

        pgShow();


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
            t>519
        ) {
            print('Exporting GIF...');
            gif.render();
            isGifExported = true;
        }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // if(windowWidth >= windowHeight){
    //     r1=tempR;
    // }else{
    //     r1=tempR;
    // }
    // begin(seeds[seedIndex][0]);
}



function pgShow() {
    t++;




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
    bornAtX = random(bornMargin, pgMask.width-bornMargin);
    bornAtY = random(bornMargin, pgMask.height-bornMargin);

    canvas.imageSmoothingEnabled = false;
    p5.disableFriendlyErrors = true;
    noSmooth();

    let fIx = int(ww / r1 + 1);
    let fIy = int(hh / r1 + 1);

    //FINALIMAGE AND TEMP ARRAY OF PIXELS
    finalImage = createImage(fIx, fIy);
    finalImage2 = createImage(fIx, fIy);

    tempPixels = [];
    tempPixels2 = [];
    pixelDensity(1);

    ////SEED FOR COLORS AND SYSTEMS
    ///PALETTES 
    palette1 = [];
    palette2 = [];

    colorPicker = floor(random(0, palette[palettePicker].length));
    finalCol1 = color(palette[palettePicker][colorPicker]);
    colorPicker = floor(random(0, palette[palettePicker].length));
    finalCol2 = color(palette[palettePicker][colorPicker]);

    for (let i = 0; i < numSystems; i++) {
        colorPicker = floor(random(0, palette[palettePicker].length));
        finalCol = color(palette[palettePicker][colorPicker]);
        
        palette1[i] = finalCol;

        colorPicker = floor(random(0, palette[palettePicker2].length));
        finalCol = color(palette[palettePicker2][colorPicker]);
        palette2[i] = finalCol;
    }


}




////////DRAW RECTANGLE
function drawRect(W, H, X, Y, xArray, yArray, tempIndex){

    if((xArray>pgMask.width/2+X-W/2 && xArray<pgMask.width/2+X+W/2) && (yArray>pgMask.height/2+Y-H/2 && yArray<pgMask.height/2+Y+H/2)){
        pgMask.pixels[tempIndex] = 255;
        pgMask.pixels[tempIndex + 1] = 255;
        pgMask.pixels[tempIndex + 2] = 255;
        pgMask.pixels[tempIndex + 3] = 255;

        pgMaskArray[tempIndex] = 255;
        pgMaskArray[tempIndex + 1] = 255;
        pgMaskArray[tempIndex + 2] = 255;
        pgMaskArray[tempIndex + 3] = 255;

        //return true;
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
        quality: 40,
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



