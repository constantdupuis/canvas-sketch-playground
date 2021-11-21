class Vide
{
    value : number;
    constructor( nimporte : number)
    {
        this.value = nimporte;
    }

    log()
    {
        console.log(`Vide::log - ${this.value}`);
    }
}

export = Vide;