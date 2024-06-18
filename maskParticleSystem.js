
//////////RANDOMLY ADD DARKER PIXELS

///////////////PARTICLE CLASS
//START
let ParticleMask = function (x, y, cor, alpha) {


    this.loc = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.color;
    //TIME
    this.lifespan = 1;//random(30, 60);
    this.totalLife = this.lifespan;
    this.killingTime = 2.0;

    ///RANDOM DARKER
    this.rDarker = random(1);
    
    ////COLOR DIVISION
    this.rrr = int(red(color(cor)));
    this.ggg = int(green(color(cor)));
    this.bbb = int(blue(color(cor)));

    this.alpha = alpha;
  }
  
  //UPDATE
  ParticleMask.prototype.run = function() {
      
    let noiseDist = 0.01;    
    //NOISE
    this.sx = noise(this.loc.y/100, this.loc.x/100);
    this.sx2 = map(this.sx, 0, 1, -noiseDist, noiseDist+0.0025);
      
    this.sy = noise(this.loc.x/100+10, this.loc.y/100+10);
    this.sy2 = map(this.sy, 0, 1, -noiseDist, noiseDist+0.0025);
    
    this.acc = createVector(this.sx2,this.sy2);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    
    this.vel.limit(0.4);
    this.acc.mult(0);
    this.vel.mult(0.80);
      
    //DYING
    this.lifespan -= this.killingTime;
  }
  
  
  
  //IF DEAD
  ParticleMask.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  }
  
  
  //APPLY FORCE
  ParticleMask.prototype.applyForce = function(f) {
    this.acc.add(f);
  }
  
  
  //DISPLAY
  ParticleMask.prototype.display = function() {

    ////ARRAY MANIPULATION
    this.index = int( this.loc.x + int(this.loc.y) * pgMask.width)*4;
   
    ///DEFINE PIXEL COLOR
    if(this.loc.x>0 && this.loc.x<pgMask.width && this.loc.y>0 && this.loc.y<pgMask.height){

      ///ARRAY
      if(this.rDarker<0.6){

        pgMask.pixels[this.index] = this.rrr;
        pgMask.pixels[this.index+1] = this.ggg;
        pgMask.pixels[this.index+2] = this.bbb;
        pgMask.pixels[this.index+3] = this.alpha;

      }else{

        pgMask.pixels[this.index] = this.rrr;
        pgMask.pixels[this.index+1] = this.ggg;
        pgMask.pixels[this.index+2] = this.bbb;
        pgMask.pixels[this.index+3] = 0;

      }

    }
  }
  
  
  
  
  
  
  //////SYSTEM
  let particleSystemMask = function() {
    this.lifespan = 300;//floor(random(10, 300));
    this.totalLife = this.lifespan;
    this.particlesMask = [];

    this.timeOfCreation = t;

      
    ///////random pos diference
    this.rPosDif = floor(random(20, 50));
    if(random()<randomPos){
      this.loc = createVector(random(bornAtX-this.rPosDif, bornAtX+this.rPosDif), random(bornAtY-this.rPosDif, bornAtY+this.rPosDif));
    }else{
      this.loc = createVector(random(bornMargin, pgMask.width-bornMargin), random(bornMargin, pgMask.height-bornMargin));
    }

    
    this.vel = createVector();
    this.acc = createVector();

    this.r = floor(random(0, 2));

    /////NUM TRAILS
    this.maxTraits = floor(200, 400);
    this.numTrails = floor(random(60, this.maxTraits)); //MAX 50
    
    //////VARY THE AMOUNT OF THIN THINGS
    this.isThing = random(0.85, 0.9);

    ////RADIUS BRUSH
    if(random(1)<this.isThing){
      this.radiusInitial = map(this.numTrails, 60, this.maxTraits, 30, 100);//10;//floor(random(5,20)); MAX 40
      this.applyForceTime = floor(random(20, 50));
    }else{
      this.radiusInitial = 2;
      this.applyForceTime = floor(random(20, 50));
    }
    

    /////DUMPING
    this.dumping = 0.99;//random(0.7, 0.9);

    ////noise SUM
    this.noiseSumXArray = [-0.1];//[0, 0.1, 0.3, 0.5];//[-0.1, -0.05, 0, 0.05, 0.1, 0.15];
    this.nSXPicker = floor(random(0, this.noiseSumXArray.length));
    this.noiseSumX = this.noiseSumXArray[this.nSXPicker];
    this.seedNoiseX = random(-1, 1);

    this.noiseSumYArray = [-0.1, 0, 0.1];//[-0.05, 0, 0.05];
    this.nSYPicker = floor(random(0, this.noiseSumYArray.length));
    this.noiseSumY = this.noiseSumYArray[this.nSYPicker];
    this.seedNoiseY = random(-1, 1);

    this.noiseFreq = 10;

    // ///COLOR
    this.colorPicker = floor(random(0, palette[palettePicker].length));
    this.color = color(palette[palettePicker][this.colorPicker]);

    //////ALPHA
    this.alpha = 255;

    ///////CIRCLE?
    this.isCircle = random();
    this.circleSpeed = 10;

  };
  
  //RUN
  particleSystemMask.prototype.run = function() {
    this.lifespan--;
    let len = this.particlesMask.length;
  
    //UPDATE & DISPlAY
    for (let i = len - 1; i >= 0; i--) {
      let particle = this.particlesMask[i];
      particle.run();
      particle.display();
  
      //CHECK IF DEAD
      if (particle.isDead()) {
        this.particlesMask.splice(i, 1);
      }
    }
  }


  ////IS DEAD
  particleSystemMask.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  }
  
  
  //APPLYFORCE
  particleSystemMask.prototype.applyForce = function(dir) {
      this.acc.add(dir);
  }
  
  
  //ADD AND UPDATE
  particleSystemMask.prototype.add = function() {
  
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.limit(10);
    this.acc.mult(0);

    ///DUMP
    this.vel.mult(0.95);

    //RADIUS
    this.radius = map(this.lifespan, this.totalLife, 0, this.radiusInitial, this.radiusInitial/2);

    ///FORCE TO ADD
    let noiseDist = 0.5;  

    //NOISE
    this.sx = noise(this.seedNoiseX*60/this.noiseFreq, this.seedNoiseY*60/this.noiseFreq+100);
    this.sx2 = map(this.sx, 0, 1, -noiseDist, noiseDist+this.noiseSumX);
      
    this.sy = noise(this.seedNoiseY*60/this.noiseFreq+10, t*100);
    this.sy2 = map(this.sy, 0, 1, -noiseDist, noiseDist+this.noiseSumY);



    this.radiusCircle = 0.4;

    this.circleX = (sin(radians(t*this.circleSpeed)) * this.radiusCircle);
    this.circleY = (cos(radians(t*this.circleSpeed)) * this.radiusCircle);

    /////IF CIRCLE
    if(this.isCircle < circlePercentage){
      this.forceToAdd = createVector(this.sx2, this.sy2);
    }else{
      this.forceToAdd = createVector(this.circleX, this.circleY);
    }
    
    /////APPLY FORCE
    if(this.lifespan>this.totalLife-this.applyForceTime){
        this.applyForce(this.forceToAdd);
    }
    

    if(frameCount%400<200){
        this.dist = pgMask.width*0.4;
        this.y = int(this.loc.y);
    }else{
        this.dist = pgMask.height*0.4;
        this.y = int(this.loc.y + (cos(frameCount*0.05) * this.dist));
    }

    this.x++;

    ///////X Y
    this.xx = pgMask.width/2 + sin(radians(frameCount)) * 20;
    this.yy = pgMask.height/2 + cos(radians(frameCount)) * 20;

    let mix = map(this.lifespan, this.totalLife, 0, 1, 0);
    this.black = color("#000000");
    this.finalColor = lerpColor(this.color, this.black, mix);



    for(let i = 0; i < this.numTrails; ++i){
        if(this.lifespan>0){
            this.particlesMask.push(new ParticleMask(int(this.loc.x+(noise(i/10)*this.radius-this.radius/2)), int(this.loc.y)+(noise(i/10+90)*this.radius-this.radius/2), this.color, this.alpha));
        }
    }

  }
  
  