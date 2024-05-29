/*
----------------------------------------------------------------

        trāma by p1xelfool

----------------------------------------------------------------
*/

let ParticleSystem = function(tempInitialVel, tempCor, tempCor2, tempIndex, tempW, tempH, layer) {
    this.particles = [];

    this.loc = createVector(0.0, -30);
    this.vel = createVector(0.0, 0.0);
    this.acc = createVector(0.0, 0.0);
    
    this.lifespan = 240.0;
    
    this.initialVel = tempInitialVel;
    this.cor = tempCor;
    this.cor2 = tempCor2;
    
    this.stepToMiss = 1;
    this.index = tempIndex;

    this.w = tempW;
    this.h = tempH;

    this.layer = layer;

    this.pickArray = floor(random(0, modArray.length));
    this.mod = modArray[this.pickArray][0];
    this.modMult = modArray[this.pickArray][1];

    this.pickArray2 = floor(random(0, modArray.length));
    this.mod2 = modArray[this.pickArray2][0];
    this.modMult2 = modArray[this.pickArray2][1];

    ////Glitch speed
    this.GlSpeedX = 0.1 * random(0, 2);
    this.GlSpeedY = 0.1 * floor(random(2, 8.5));

    ///WHERE TO STOP
    this.stopper = random(0, this.h-marginX);

};


ParticleSystem.prototype.update = function() {
    //this.lifespan -= 2.0; 
    let len = this.particles.length;

    for (let i = len - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.update();
        particle.display();

        if (particle.isDead()) {
            this.particles.splice(i, 1);
        }
        
    }
}

ParticleSystem.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}


ParticleSystem.prototype.force = function () {
    this.cent = createVector(0, this.h);
    this.p = p5.Vector.sub(this.cent, this.loc);
    
    this.p.normalize();
    this.p.mult(this.initialVel);
    if((t==1) && this.lifespan > 0){
        this.applyForce(this.p);
    }
}

ParticleSystem.prototype.applyForce = function(f) {
    this.acc.add(f);
}


ParticleSystem.prototype.nu = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    
    this.acc.mult(0);
    this.vel.limit(10);
    //this.vel.mult(0.99);
    

    if(this.index == numSystems-1){
        if(t%this.stepToMiss == 0 && this.loc.y<this.h-this.stopper){
            this.particles.push(new Particle(0, this.loc.y, this.cor, this.cor2, this.index, this.w, this.h, this.layer, this.mod, this.modMult, this.mod2, this.modMult2, this.GlSpeedX, this.GlSpeedY));
        }
    }else{
        if(t%this.stepToMiss == 0 && this.loc.y<this.h){
            this.particles.push(new Particle(0, this.loc.y, this.cor, this.cor2, this.index, this.w, this.h, this.layer, this.mod, this.modMult, this.mod2, this.modMult2, this.GlSpeedX, this.GlSpeedY));
        }
    }

    

    
}
