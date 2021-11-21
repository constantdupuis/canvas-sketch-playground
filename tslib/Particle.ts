import Vec2 = require('./Vec2');

class Particle {
    pos : Vec2;
    acc : Vec2;
    vel : Vec2;
    life : number;
    start_life: number;
    css_color : string | CanvasGradient | CanvasPattern;

    constructor( pos : Vec2)
    {
        this.pos = pos;
        this.life = this.start_life = Number.MAX_SAFE_INTEGER;
        this.acc = new Vec2( 1, 1);
    }

    update( deltaTime? : number) : void
    {
        if( this.life <= 0) return;

        let dTime : number = 1.0;
        if( deltaTime !== undefined)
        {
            dTime = deltaTime;
        }
        this.vel.add(this.acc.getMult(dTime));
        this.pos.add(this.vel);
        this.life--;
    }

    isDead() : boolean
    {
        return this.life <= 0;
    }

}

export  = Particle;