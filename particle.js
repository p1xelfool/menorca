/*
----------------------------------------------------------------

        trāma by p1xelfool

----------------------------------------------------------------
*/


let Particle = function (x, y, tempCor, tempCor2, tempIndex, tempW, tempH, layer, mod, modMult, mod2, modMult2, GlSpeedX, GlSpeedY) {
    this.loc = createVector(0, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.killingTime = 2.0;
    this.lifespan = 700.0;
    this.index = tempIndex;

    this.w = tempW;
    this.h = tempH;

    this.layer = layer;

    this.rrr = int(red(color(tempCor)));
    this.ggg = int(green(color(tempCor)));
    this.bbb = int(blue(color(tempCor)));

    this.rrr2 = int(red(color(tempCor2)));
    this.ggg2 = int(green(color(tempCor2)));
    this.bbb2 = int(blue(color(tempCor2)));

    this.randGlitchX = floor(random(2, 4));
    this.randGlitchY = floor(random(1, 2));

    ////MODULO

    this.mod = mod;
    this.modMult = modMult;
    this.mod2 = mod2;
    this.modMult2 = modMult2;

    //////GLITCH SPEED
    this.GlSpeedX = GlSpeedX;
    this.GlSpeedY = GlSpeedY;
}


Particle.prototype.update = function () {
    //this.lifespan -= this.killingTime;
    // this.vel.add(this.acc);
    // this.loc.add(this.vel);
    
    // this.acc.mult(0);
    // this.vel.limit(10);
    // this.vel.mult(0.98);

    // this.cent = createVector(0, this.h);
    // this.p = p5.Vector.sub(this.cent, this.loc);
    
    // this.p.normalize();
    // this.p.mult(1);
    // if(this.lifespan == 500){
    //     this.applyForce(this.p);
    // }
}


Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}


Particle.prototype.applyForce = function (f) {
    this.acc.add(f);
}


Particle.prototype.display = function () {
    for (let xx = marginX; xx < finalImage.width - marginX; xx++) {
        let yy = int(this.loc.y);
        let n = noise(xx / 40, yy / 40);

        //INDEX
        let index = int((xx + yy * this.w) * 4);
        let index2 = int((xx + t * 2 * this.GlSpeedX + yy + t * 2 * this.GlSpeedY * this.w) * 4);

        

        //DEFINE ON A TEMP ARRAY
        if (this.lifespan > 0) {
            if ((xx > marginX - 1 && xx < finalImage.width && yy > marginY && yy < finalImage.height - marginY) && this.layer == 1) {
                
                ///////////FIRST IMAGE
                if (xx % (this.modMult) == 0) {
                    if (yy % this.mod == 0) {

                        tempPixels[index] = 0;
                        tempPixels[index + 1] = 0;
                        tempPixels[index + 2] = 0;
                        tempPixels[index + 3] = 255;

                    } else {
                            if (n < noiseThresh2 && hasGlitch == true) {

                                tempPixels[index2] = this.rrr;
                                tempPixels[index2 + 2] = this.ggg;
                                tempPixels[index2 + 3] = this.bbb;
                                tempPixels[index2 + 3] = 255;

                                

                            }
                    }
                } else {
                    if (yy % this.mod == 0) {
                            if (n < noiseThresh2 && this.hasGlitch == true) {

                                tempPixels[index2] = this.rrr;
                                tempPixels[index2 + 2] = this.ggg;
                                tempPixels[index2 + 3] = this.bbb;
                                tempPixels[index2 + 3] = 255;

                            }
                    }
                }

                 ///////////SECOND IMAGE
                 if (xx % (this.modMult2) == 0) {
                    if (yy % this.mod2 == 0) {

                        tempPixels2[index] = 0;
                        tempPixels2[index + 1] = 0;
                        tempPixels2[index + 2] = 0;
                        tempPixels2[index + 3] = 255;

                    } else {
                            if (n < noiseThresh2 && hasGlitch == true) {

                                tempPixels2[index2] = this.rrr2;
                                tempPixels2[index2 + 2] = this.ggg2;
                                tempPixels2[index2 + 3] = this.bbb2;
                                tempPixels2[index2 + 3] = 255;

                            }
                    }
                } else {
                    if (yy % this.mod2 == 0) {
                            if (n < noiseThresh2 && this.hasGlitch == true) {

                                tempPixels2[index2] = this.rrr2;
                                tempPixels2[index2 + 2] = this.ggg2;
                                tempPixels2[index2 + 3] = this.bbb2;
                                tempPixels2[index2 + 3] = 255;

                            }
                    }
                }


            }
        } else {

            tempPixels[index] = 0;
            tempPixels[index + 1] = 0;
            tempPixels[index + 2] = 0;
            tempPixels[index + 3] = 255;
            tempPixels[index2] = 0;
            tempPixels[index2 + 1] = 0;
            tempPixels[index2 + 2] = 0;
            tempPixels[index2 + 3] = 255;

            tempPixels2[index] = 0;
            tempPixels2[index + 1] = 0;
            tempPixels2[index + 2] = 0;
            tempPixels2[index + 3] = 255;
            tempPixels2[index2] = 0;
            tempPixels2[index2 + 1] = 0;
            tempPixels2[index2 + 2] = 0;
            tempPixels2[index2 + 3] = 255;

        }
        
    }
}
