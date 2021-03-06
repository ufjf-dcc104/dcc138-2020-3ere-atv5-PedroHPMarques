import Mapa from "./Mapa.js";
import modeloMapa1 from "../js/maps/mapa1.js";
import Cena from "./Cena.js";
import Sprites from "./Sprites.js";
import modeloMapa2 from "../js/maps/mapa2.js"

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
      if(a.tags.has("pc") && b.tags.has("bau") || b.tags.has("pc") && a.tags.has("bau"))
    {
      this.preparar(modeloMapa2);
      return;
    }
      if(a.tags.has("pc") && b.tags.has("moeda") || b.tags.has("pc") && a.tags.has("moeda")){
        if (!this.aRemover.includes(a) && a.tags.has("moeda")){
          this.aRemover.push(a);
        }
        if (!this.aRemover.includes(b) && b.tags.has("moeda")){
          this.aRemover.push(b);
          this.assets.play("moeda");
          this.pontos++;
          return;
        }
      }
      if (!this.aRemover.includes(a)){
        this.aRemover.push(a);
      }
      if (!this.aRemover.includes(b)){
        this.aRemover.push(b);
      }
      if (a.tags.has("pc") && b.tags.has("enemy") || b.tags.has("pc") && a.tags.has("enemy")){
        this.assets.play("boom");
            this.game.selecionaCena("fim");
        }
      }
      preparar(modeloMapa = modeloMapa1){
        super.preparar(modeloMapa);
        this.mapaAtual = modeloMapa;
        const mapa = new Mapa(11, 15, 32);
        mapa.carregaMapa(modeloMapa)
        this.configuraMapa(mapa);

        const pc = new Sprites({ x: 50, y:150});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
          if(cena.input.comandos.get("MOVE_ESQUERDA")){
            this.vx = -55;
          } else if(cena.input.comandos.get("MOVE_DIREITA")){
            this.vx = +55;
          } else{
            this.vx = 0;
          }
          if(cena.input.comandos.get("MOVE_CIMA")){
            this.vy = -55;
          } else if(cena.input.comandos.get("MOVE_BAIXO")){
            this.vy = +55;
          } else{
            this.vy = 0;
          }
        }
        this.adicionar(pc);

        function perseguePC(dt){
          this.vx = 25*Math.sign(pc.x - this.x);
          this.vy = 25*Math.sign(pc.y - this.y);
        }

        const en1 = new Sprites({ x: 360, color: "red", controlar: perseguePC, tags:["enemy"]});
        en1.controlar = perseguePC;
      
        this.adicionar(en1);
        this.adicionar(new Sprites({ x: 115, y: 70, vy: 10, color: "red", controlar: perseguePC, tags:["enemy"]}));
        this.adicionar(new Sprites({ x: 115, y: 160, vy: -10, color: "red", controlar: perseguePC, tags:["enemy"] }));
        // this.adicionaSprites(10);
        // this.adicionaSpritesIntervalo(4000);
      this.adicionar(new Sprites({x: 50, y: 120, color: "gold", tags: ["moeda"]}));
      this.adicionar(new Sprites({x: 340, y: 50, color: "gold", tags: ["moeda"]}));
      this.adicionar(new Sprites({x: 150, y: 250, color: "gold", tags: ["moeda"]}));
      this.adicionar(new Sprites({x: 380, y: 250, color: "gold", tags: ["moeda"]}));
      this.adicionar(new Sprites({x: 380, y: 210, color: "orange", tags: ["bau"]}));
      }
}