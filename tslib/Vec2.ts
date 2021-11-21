class Vec2 {
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

export = Vec2;