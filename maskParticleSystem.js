
//////////RANDOMLY ADD DARKER PIXELS

///////////////PARTICLE CLASS
//START
let ParticleMask = function (x, y, r, cor, alpha) {


    this.loc = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.color;
    //TIME
    this.lifespan = 1;//random(30, 60);
    this.totalLife = this.lifespan;
    this.killingTime = 2.0;

    this.r = r;//floor(random(0, 3));
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
    //VARIABLE COLOR
    this.c = map(this.vel.x, -0.2, 0, 0, 360);
    this.ca = map(this.vel.x, -0.2, 0, 0, 230);
    // this.alpha = map(this.lifespan, this.totalLife, 0, 360, 0);
    //  pgMask.colorMode(HSB, 360, 255, 255);

    //  this.color = color(this.alpha, 255, 255);

    // this.rrr = int(red(color(this.color)));
    // this.ggg = int(green(color(this.color)));
    // this.bbb = int(blue(color(this.color)));

    ////ARRAY MANIPULATION
    this.index = int( this.loc.x + int(this.loc.y) * pgMask.width)*4;
    ////GLITCH ARRAY
    this.index2 = int(int(this.loc.x+1) + int(this.loc.y+1) * pgMask.width)*4;
    this.index3 = int(int(this.loc.x+2) + int(this.loc.y+1) * pgMask.width)*4;

    ///DEFINE PIXEL COLOR
    this.margin = 0;
    if(this.loc.x>this.margin && this.loc.x<pgMask.width-this.margin && this.loc.y>this.margin && this.loc.y<pgMask.height-this.margin){
      

      ///ARRAY
      if(this.rDarker<0.8){
        /////DRAW TO ARRAY FIRST
        // pgMaskArray[this.index] = this.rrr;//this.rrr;
        // pgMaskArray[this.index+1] = this.ggg;
        // pgMaskArray[this.index+2] = this.bbb;
        // pgMaskArray[this.index+3] = this.alpha;

        pgMask.pixels[this.index] = this.rrr;
        pgMask.pixels[this.index+1] = this.ggg;
        pgMask.pixels[this.index+2] = this.bbb;
        pgMask.pixels[this.index+3] = this.alpha;

      }else{
        // pgMaskArray[this.index] = this.rrr;//this.rrr;
        // pgMaskArray[this.index+1] = this.ggg;
        // pgMaskArray[this.index+2] = this.bbb;
        // pgMaskArray[this.index+3] = 1;

        pgMask.pixels[this.index] = this.rrr;
        pgMask.pixels[this.index+1] = this.ggg;
        pgMask.pixels[this.index+2] = this.bbb;
        pgMask.pixels[this.index+3] = 1;

      }
      

    }


    // // ///GLITCH
    // tempPixels[this.index2] = 255;
    // tempPixels[this.index2+1] = 0;
    // tempPixels[this.index2+2] = 0;
    // // //2
    // tempPixels[this.index3] = 0;
    // tempPixels[this.index3+1] = 0;
    // tempPixels[this.index3+2] = 255;


  }
  
  
  
  
  
  
  //////SYSTEM
  let particleSystemMask = function() {
    this.lifespan = 150;//floor(random(10, 300));
    this.totalLife = this.lifespan;
    this.particlesMask = [];

    this.applyForceTime = floor(random(5, 50));
      
    //COPY ORIGINAL VECTOR
    //this.origin = v.copy();
    if(random(1)<randomPos){
      this.loc = createVector(random(bornAtX-10, bornAtX+10), random(bornAtY-10, bornAtY+10));
    }else{
      this.loc = createVector(random(bornMargin, pgMask.width-bornMargin), random(bornMargin, pgMask.height-bornMargin));
    }
    
    this.vel = createVector();
    this.acc = createVector();

    this.r = floor(random(0, 2));

    /////NUM TRAILS
    this.numTrails = floor(random(40, 60)); //MAX 50
    

    ////RADIUS BRUSH
    if(random(1)<0.9){
      this.radiusInitial = map(this.numTrails, 40, 60, 19, 50);//10;//floor(random(5,20)); MAX 40
    }else{
      this.radiusInitial = 2;
    }
    

    /////DUMPING
    this.dumping = 0.99;//random(0.7, 0.9);

    ////noise SUM
    this.noiseSumXArray = [-0.1];//[0, 0.1, 0.3, 0.5];//[-0.1, -0.05, 0, 0.05, 0.1, 0.15];
    this.nSXPicker = floor(random(0, this.noiseSumXArray.length));
    this.noiseSumX = this.noiseSumXArray[this.nSXPicker];

    this.noiseSumYArray = [-0.1, 0, 0.1];//[-0.05, 0, 0.05];
    this.nSYPicker = floor(random(0, this.noiseSumYArray.length));
    this.noiseSumY = this.noiseSumYArray[this.nSYPicker];

    this.noiseFreq = 10;

    // ///COLOR
    this.colorPicker = floor(random(0, palette[palettePicker].length));
    this.color = color(palette[palettePicker][this.colorPicker]);

    //////ALPHA
    this.alpha = 10;//floor(random(5, 10));

    ///////CIRCLE?
    this.isCircle = random(1);

    /////////DIRECTION
    // this.noiseSumXArray = [-0.1, -0.05, 0, 0.05, 0.1, 0.15];
    // this.nSXPicker = floor(random(0, this.noiseSumXArray.length));
    // this.noiseSumX = this.noiseSumXArray[this.nSXPicker];

    // this.noiseSumYArray = [-0.05, 0, 0.05];
    // this.nSYPicker = floor(random(0, this.noiseSumYArray.length));
    // this.noiseSumY = this.noiseSumYArray[this.nSYPicker];
      
  //  for(let i = 0; i < num; ++i){
  //    this.particles.push(new Particle(this.origin, this.img));
  //  }
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
                ////COUNT PARTICLES
                numParticles--;
                if(this.r == 0){
                  rParticles--;
                }else if(this.r == 1){
                  gParticles--;
                }else{
                  bParticles--;
                }
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
    // let len = this.particles.length;
    // for(let i = 0; i < len; ++i){
    //   this.particles[i].applyForce(dir);
    // }


      this.acc.add(dir);
    
  }
  
  
  //ADD AND UPDATE
  particleSystemMask.prototype.add = function() {
  
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    
    this.vel.limit(10);

    this.acc.mult(0);

            ///DUMP
            this.vel.mult(0.95);//(this.dumping);

    //////NUM TRAILS
    //this.numTrails = floor(map(this.lifespan, this.totalLife, 0, this.numTrailsInicial, this.numTrailsInicial/2));

    this.radius = map(this.lifespan, this.totalLife, 0, this.radiusInitial, this.radiusInitial/2);

    ///FORCE TO ADD
    let noiseDist = 0.5;  
    //NOISE
    
    this.sx = noise(this.loc.y/this.noiseFreq, this.loc.x/this.noiseFreq);
    this.sx2 = map(this.sx, 0, 1, -noiseDist, noiseDist+this.noiseSumX);
      
    this.sy = noise(this.loc.x/this.noiseFreq+10, frameCount*100);
    this.sy2 = map(this.sy, 0, 1, -noiseDist, noiseDist+this.noiseSumY);

    this.radiusCircle = 0.4;

    this.circleX = (sin(radians(t*10)) * this.radiusCircle);
    this.circleY = (cos(radians(t*10)) * this.radiusCircle);

    if(this.isCircle < circlePercentage){
      this.forceToAdd = createVector(this.sx2, this.sy2);
    }else{
      this.forceToAdd = createVector(this.circleX, this.circleY);
    }
    


    if(this.lifespan>this.totalLife-this.applyForceTime){
        this.applyForce(this.forceToAdd);
    }
    
      
    //X MOVEMENT
    //this.dist = map(sin(frameCount*0.01), -1, 1, 2.0, finalPG.height/2);

    if(frameCount%400<200){
        this.dist = pgMask.width*0.4;
        this.y = int(this.loc.y);
    }else{
        this.dist = pgMask.height*0.4;
        this.y = int(this.loc.y + (cos(frameCount*0.05) * this.dist));
    }

    this.x++;// = int(this.loc.x + (sin(frameCount*0.05) * this.dist));
    //this.y = int(this.loc.y + (cos(frameCount*0.05) * this.dist));
      
    //ADD 4 PARTICLES PER CYCLE
    // for(let i = 0; i < 2; ++i){
    //   this.particles.push(new Particle(int(this.x+(i*1)), this.y));
    // }

    ///////X Y
    this.xx = pgMask.width/2 + sin(radians(frameCount)) * 20;
    this.yy = pgMask.height/2 + cos(radians(frameCount)) * 20;

    let mix = map(this.lifespan, this.totalLife, 0, 1, 0);
    this.black = color("#000000");
    this.finalColor = lerpColor(this.color, this.black, mix);



    for(let i = 0; i < this.numTrails; ++i){
      //if(this.loc.x<pgMask.width && this.loc.x>=0 && this.loc.y<pgMask.height && this.loc.y>=0){
        if(this.lifespan>0){
            this.particlesMask.push(new ParticleMask(int(this.loc.x+(noise(i)*this.radius-this.radius/2)), int(this.loc.y)+(noise(i+90)*this.radius-this.radius/2), this.r, this.color, this.alpha));
        }
        

      //}
    }


      
  }
  
  