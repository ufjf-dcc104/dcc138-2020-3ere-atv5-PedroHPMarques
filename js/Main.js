import Cena from "./Cena.js";
import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";

const assets = new AssetManager();

assets.carregaImagem("garota","assets/garota.png");
assets.carregaImagem("esqueleto","assets/skelly.png");
assets.carregaImagem("orc","assets/orc.png");

const canvas = document.querySelector ("canvas");
const cena1 = new Cena(canvas,assets);
const pc = new Sprite({vx:10});
const en1 = new Sprite({x:140,w:30,color:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({y:40,w:30,color:"red"}););

cena1.iniciar(0);

document.addEventListener("keydown",(e)=>{
    switch (e.key) {
        case "s":
            cena1.iniciar();
            break;
        case "S" :
        cena1.parar();
        break;
    }
}

)

