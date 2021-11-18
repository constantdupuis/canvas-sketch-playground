export class Vec2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    add(vec : Vec2) : void
    {
        this.x += vec.x;
        this.y += vec.y;
    }

    getAdd(vec : Vec2) : Vec2
    {
        var ret : Vec2;
        ret.add( vec );
        return ret;
    }

    mult(factor : number | Vec2) : void
    {
        if( typeof factor == "number" )
        {
            this.x *= factor;
            this.y *= factor;
        }else{
            this.x *= factor.x;
            this.y *= factor.y;
        }
    }

    getMult(factor : number | Vec2 ) : Vec2
    {
        var ret : Vec2;
        ret.mult(factor);
        return ret;
    }
}

export class Particle {
    pos : Vec2;
    acc : Vec2;
    vel : Vec2;
    life : number;
    start_life: number;

    constructor( pos : Vec2)
    {
        this.pos = pos;
        this.life = this.start_life = Number.MAX_SAFE_INTEGER;
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