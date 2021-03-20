import Cena from "./Cena.js";
import Sprites from "./Sprites.js";
import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../js/maps/mapa1.js";
import InputManager from "./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("brick","assets/brick.png");
assets.carregaImagem("floor","assets/floor.png");

assets.carregaImagem("fireball","assets/fireball.png");
assets.carregaImagem("missil","assets/missil.png");
assets.carregaImagem("scimitar","assets/scimitar.png");
assets.carregaImagem("sword","assets/sword.png");


assets.carregaImagem("garota","assets/garota.png");
assets.carregaImagem("esqueleto","assets/skelly.png");
assets.carregaImagem("orc","assets/orc.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");

const canvas = document.querySelector ("canvas");
canvas.width = 14*32;
canvas.height = 10*32;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
    });
    

const ctx = canvas.getContext("2d");
const cena1 = new Cena(canvas,assets);

const mapa1 = new Mapa(10 ,14 , 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprites({ x: 50, y:150});
pc.controlar = function(dt){
    if(input.comandos.get("MOVE_ESQUERDA")){
      this.vx = -50;
    } else if(input.comandos.get("MOVE_DIREITA")){
      this.vx = +50;
    } else{
      this.vx = 0;
    }
    if(input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
      } else if(input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
      } else{
        this.vy = 0;
      }
  }

const en1 = new Sprites({x:160,vx: -10,color:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprites({x: 115,y:70,vy:10,color:"red"}));
cena1.adicionar(new Sprites({x: 115,y:160,vy:-10,color:"red"}));
cena1.adicionaSprites(7);
cena1.adicionaSpritesIntervalo(4000);


cena1.iniciar();

document.addEventListener("keydown",(e)=>{
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S" :
        cena1.parar();
        break;
        case "c" :
        assets.play("moeda");
        break;
        case "b" :
        assets.play("boom");
        break;
    }
})

