import Sprites from "./Sprites.js";
export default class Cena {
    /* É responsavel por desenhar elementos na tela
    */
    constructor(canvas = null, assets = null) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext("2d");
        this.assets = assets;
        this.sprites = [];
        this.game = null;
        this.pontos = 0;
        this.mapaAtual = null;
        this.preparar();
    }
    desenhar(){
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0 ,0 , this.canvas.width, this.canvas.height);

        this.mapa?.desenhar(this.ctx);

        if(this.assets.acabou()){

            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        }
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Pontuação:" + this.pontos*1,100,20);
        // this.ctx.fillText(this.assets?.progresso(), 10,20);
    }
    adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);
    }
    passo(dt){
        if(this.assets.acabou()){
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }

        }
    }
    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo(this.dt);
        this.desenhar();
        this.checaColisao();
        this.removerSprites();
        if(this.rodando){
            this.iniciar();
          }
        
        this.t0 = t;
    }
    iniciar(){
        this.rodando = true;
this.idAnim = requestAnimationFrame(
    (t) => {this.quadro(t);}
    );
    }
    parar(){
        this.rodando = false;
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }
    checaColisao(){
        for (let a = 0; a < this.sprites.length - 1; a++) {
            const spriteA = this.sprites[a];
            for (let b = a + 1; b < this.sprites.length; b++) {
                const spriteB = this.sprites[b];
                if(spriteA.colidiuCom(spriteB)){
                    this.quandoColidir(spriteA,spriteB);
                }
            }

            
        }
    }
    removerSprites(){
        for (const alvo of this.aRemover) {
            const idx = this.sprites.indexOf(alvo);
            if(idx >=0){
                this.sprites.splice(idx,1);
            }
        }
        this.aRemover = [];
    }
    configuraMapa(mapa){
        this.mapa = mapa;
        this.mapa.cena = this;
    }
    criaSpritesAleatorio(num = 1){
        let sprites = [];
        for(let i=0; i<num; i++){
            let sprite = new Sprites({
                x: this.getRandomInt(40,400),
                y: this.getRandomInt(50,275),
                vx: this.getRandomInt(-10,10),
                vy: this.getRandomInt(-10,10),
                color: this.getRandomColor()
            });
            sprites.push(sprite);
        }
        return sprites;
    }
    adicionaSprites(num){
        let sprites = this.criaSpritesAleatorio(num);
        for(let i=0; i<sprites.length; i++){
            this.adicionar(sprites[i]);
        }
    }
    
    getRandomInt(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    getRandomColor(){
        let letters = "0123456789ABCDEF";
       let color = "#";
       for (let i = 0; i < 6; i++) {
           color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    adicionaSpritesIntervalo(interval){
        setInterval(()=>{
            this.adicionaSprites(1);
        },interval);
    }
    preparar(mapa){
        this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.mapa = null;
    this.rodando = true;
    this.mapaAtual = mapa;
}
}