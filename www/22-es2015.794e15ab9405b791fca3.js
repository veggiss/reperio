(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{i8nU:function(t,e,s){"use strict";s.r(e);var n=s("8Y7J"),i=s("mrSG"),a=s("ZZ/e"),h=s("Z22J"),o=s("ZLgM");class l extends o.GameObjects.Sprite{constructor(t){super(t.scene,t.x,t.y,"polaroid"),this.round=t.scene.round,this.getImage=t.scene.getImage,this.x=this.scene.cameras.main.centerX,this.y=Math.round(this.displayHeight/2+.05*this.scene.game.canvas.height),this.displayHeight=.5*this.scene.game.canvas.height,this.scaleX=this.scaleY,this.setOrigin(.495,.449),this.tweenIn=()=>this.scene.tweens.add({paused:!0,targets:this,x:{from:()=>o.Math.Between(0,this.scene.game.canvas.width),to:this.scene.cameras.main.centerX},y:{from:this.scene.game.canvas.height+this.displayHeight,to:Math.round(this.displayHeight/2+.05*this.scene.game.canvas.height)},angle:{from:()=>o.Math.Between(100,250),to:()=>o.Math.Between(0,10)},ease:"Cubic.InOut",duration:1e3}),this.tweenOut=()=>this.scene.tweens.add({paused:!0,targets:this,x:{start:this.scene.cameras.main.centerX,from:this.scene.cameras.main.centerX,to:-this.scene.game.canvas.width},ease:"Cubic.InOut",duration:500,onUpdate:()=>{this.getImage().x=this.x,this.getImage().y=this.y}}),t.scene.add.existing(this)}}class r extends o.GameObjects.Sprite{constructor(t){super(t.scene,t.x,t.y,null),this.setActive(!1),this.getPolaroid=t.scene.getPolaroid,this.getButtons=t.scene.getButtons,this.getRound=t.scene.getRound,this.displayHeight=.4*this.scene.game.canvas.height,this.scaleX=this.scaleY,this.setOrigin(.5),this.alpha=0,this.tweenIn=()=>this.scene.tweens.add({paused:!0,targets:this,alpha:{from:0,to:1},ease:"Cubic.InOut",duration:500,onStart:()=>{this.setTexture("image_"+this.getRound()),this.displayHeight=.4*this.scene.game.canvas.height,this.scaleX=this.scaleY},onUpdate:()=>{this.angle=this.getPolaroid().angle,this.x=this.getPolaroid().x,this.y=this.getPolaroid().y}}),t.scene.add.existing(this)}}var c=s("+TmL");class u extends o.GameObjects.Sprite{constructor(t){super(t.scene,t.x,t.y,"alternative"),t.scene.add.existing(this),this.getButtons=t.scene.getButtons,this.roundData=t.scene.roundData,this.getMainState=t.scene.getMainState,this.getBtnText=t.scene.getBtnText,this.round=t.scene.round,this.index=t.index,this.setMainState=t.scene.setMainState,this.isAnswer=()=>t.scene.btnIsAnswer(this.index),this.scaleText=()=>{this.text.displayWidth>=this.displayWidth?(this.text.displayWidth=this.displayWidth-.1*this.displayWidth,this.text.scaleY=this.text.scaleX):this.text.scale=this.scale},this.setVisible(!1),this.setScale(0),this.setInteractive(),this.setOrigin(.5),this.text=this.scene.make.text({add:!0,x:this.x,y:this.y,origin:.5,scale:0,text:"",style:{fontSize:"48px",fontFamily:"Source Sans Pro",color:"#000000",align:"center"}}),this.tweenIn=()=>this.scene.tweens.add({paused:!0,targets:this,displayWidth:{from:0,to:Math.round(.45*this.scene.game.canvas.width)},displayHeight:{from:0,to:Math.round(.1*this.scene.game.canvas.height)},ease:"Back.Out",delay:100,duration:500,onStart:()=>{this.setVisible(!0),this.clearTint(),this.scale=0,this.alpha=1,this.text.scale=0,this.text.alpha=1,this.text.text=this.getBtnText(this.index)},onUpdate:()=>this.scaleText()}),this.tweenOut=t=>this.scene.tweens.add({targets:[this,this.text],paused:!0,alpha:{from:1,to:0},ease:"Cubic.Out",delay:t,duration:500,onComplete:()=>this.emit("complete")}),this.tweenCorrect=()=>this.scene.tweens.add({targets:this,paused:!0,scaleX:{from:this.scaleX,to:1.1*this.scaleX},scaleY:{from:this.scaleY,to:1.1*this.scaleY},ease:"Cubic.Out",delay:this.delay,duration:200,yoyo:!0,onUpdate:()=>this.scaleText()}),this.on("pointerdown",()=>{"guessing"==this.getMainState()&&(this.setMainState(1),this.emit("answer",this.isAnswer(),this))})}}class d extends o.Scene{constructor(){super(...arguments),this.category="mat",this.state=1,this.round=0,this.correctAnswers=0,this.rounds=5,this.states={1:"loading",2:"guessing"},this.roundData=Object(c.j)(this.category,[],c.e,this.rounds),this.setMainState=t=>this.state=t,this.getMainState=()=>this.states[this.state],this.getPolaroid=()=>this.polaroid,this.getImage=()=>this.image,this.getRound=()=>this.round,this.getButtons=()=>this.buttons,this.getBtnText=t=>this.roundData[this.round].alternatives[t],this.btnIsAnswer=t=>this.roundData[this.round].alternatives[t]===this.roundData[this.round].answer}preload(){this.load.image("alternative","assets/img/alternative.png"),this.load.image("background","assets/img/games/match/bg.png"),this.load.image("polaroid","assets/img/games/match/polaroid.png"),this.roundData.forEach((t,e)=>this.load.image(`image_${e}`,`assets/img/games/images/${this.category}/${t.src}`))}init(){this.cameras.main.setBackgroundColor("#24252A")}create(){this.rounds=this.roundData.length,this.bgSprite=this.add.tileSprite(0,0,this.game.canvas.width*window.devicePixelRatio,this.game.canvas.height*window.devicePixelRatio,"background"),this.buttons=this.loadButtons(),this.polaroid=new l({scene:this,x:0,y:0}),this.image=new r({scene:this,x:0,y:0}),this.startRound(),console.log("starting round with complexity: "+c.e),window.restartScene=()=>{this.round=0,this.correctAnswers=0,this.roundData.forEach((t,e)=>this.textures.remove(`image_${e}`)),this.roundData=Object(c.j)(this.category,[],c.e,this.rounds),this.roundData.forEach((t,e)=>this.load.image(`image_${e}`,`assets/img/games/images/${this.category}/${t.src}`)),this.scene.restart()}}update(){}startRound(){this.round<this.roundData.length?this.loadTweenChain():(Object(c.d)(this.correctAnswers,this.rounds,"lese"),console.log(`Round ended with: ${this.correctAnswers} of ${this.rounds} correct answers.`),document.getElementById("goBackBtn").click())}loadTweenChain(){let t=this.polaroid.tweenIn(),e=this.image.tweenIn(),s=this.buttons.map(t=>t.tweenIn()),n=this.buttons.filter(t=>t.isAnswer())[0],i=this.polaroid.tweenOut();console.log(this.buttons,n,this.buttons.filter(t=>t.isAnswer())),t.once("complete",()=>e.play()),e.once("complete",()=>s.forEach(t=>t.play())),s.forEach(t=>t.once("complete",()=>this.state=2)),n.once("complete",()=>i.play()),i.once("complete",()=>{this.round++,this.startRound()}),t.play()}loadButtons(){let t=[];for(let e=0;e<4;e++){let s=Math.round(this.cameras.main.centerY+this.cameras.main.centerY/2);e>1&&(s+=Math.round(.12*this.game.canvas.height));let n=e%2?Math.round(this.cameras.main.centerX+this.cameras.main.centerX/2):Math.round(this.cameras.main.centerX-this.cameras.main.centerX/2),i=new u({scene:this,x:n,y:s,index:e});i.on("answer",(t,e)=>{t?(this.correctAnswers++,e.tweenCorrect().play(),e.setTint(4713267)):(e.setTint(15419187),this.buttons.forEach(t=>{t.isAnswer()&&(t.setTint(4713267),t.tweenCorrect().play())})),this.buttons.forEach((t,s)=>{e===t||t.isAnswer()?t.tweenOut(3e3).play():t.tweenOut(200).play()})}),t.push(i)}return t}}class g extends o.Scene{preload(){}init(){}create(){console.log("loaded highscore")}update(){}}class m extends o.Scene{create(){this.scene.add("highscore",g,!1),this.scene.add("main",d,!0)}pause(){this.scene.pause()}}class p{constructor(t,e){this.popoverController=t,this.navCtrl=e,this.initialize=!0,this.game={width:"100%",height:"100%",type:o.WEBGL,scene:m,instance:null,fps:{target:60,min:60,forceSetTimeOut:!0}}}presentPopover(){return i.b(this,void 0,void 0,(function*(){const t=yield this.popoverController.create({component:h.a});return yield t.present()}))}getInstance(){return this.game.instance}goBack(){this.navCtrl.back()}pauseGame(){this.getInstance().scene.pause("FirstScene")}changeAngle(){this.getInstance().scene.scenes.forEach(t=>{t.sys.isActive()&&t.setAngle(0)})}}class b{}var w=s("pMnS"),x=s("oBZk"),y=n.ob({encapsulation:0,styles:[[""]],data:{}});function v(t){return n.Gb(0,[(t()(),n.qb(0,0,null,null,0,"div",[["hidden",""],["id","goBackBtn"],["style",""]],null,[[null,"click"]],(function(t,e,s){var n=!0;return"click"===e&&(n=!1!==t.component.goBack()&&n),n}),null,null)),(t()(),n.qb(1,0,null,null,0,"ion-phaser",[],[[8,"game",0],[8,"initialize",0],[8,"goBack",0]],null,null,null,null)),(t()(),n.qb(2,0,null,null,3,"ion-fab",[["horizontal","end"],["vertical","top"]],null,null,null,x.D,x.i)),n.pb(3,49152,null,0,a.u,[n.h,n.k,n.x],{horizontal:[0,"horizontal"],vertical:[1,"vertical"]},null),(t()(),n.qb(4,0,null,0,1,"ion-icon",[["color","light"],["name","pause"],["style","font-size: 25px;"]],null,[[null,"click"]],(function(t,e,s){var n=!0;return"click"===e&&(n=!1!==t.component.presentPopover()&&n),n}),x.G,x.l)),n.pb(5,49152,null,0,a.A,[n.h,n.k,n.x],{color:[0,"color"],name:[1,"name"]},null)],(function(t,e){t(e,3,0,"end","top"),t(e,5,0,"light","pause")}),(function(t,e){var s=e.component;t(e,1,0,s.game,s.initialize,s.goBack)}))}function f(t){return n.Gb(0,[(t()(),n.qb(0,0,null,null,1,"app-match",[],null,null,null,v,y)),n.pb(1,49152,null,0,p,[a.Hb,a.Fb],null,null)],null,null)}var A=n.mb("app-match",p,f,{},{},[]),S=n.ob({encapsulation:0,styles:[[""]],data:{}});function B(t){return n.Gb(0,[(t()(),n.qb(0,0,null,null,3,"ion-text",[],null,null,null,x.O,x.t)),n.pb(1,49152,null,0,a.vb,[n.h,n.k,n.x],null,null),(t()(),n.qb(2,0,null,0,1,"h4",[],null,null,null,null,null)),(t()(),n.Fb(-1,null,["This is a test"]))],null,null)}function k(t){return n.Gb(0,[(t()(),n.qb(0,0,null,null,1,"app-game-menu",[],null,null,null,B,S)),n.pb(1,114688,null,0,h.a,[a.Hb],null,null)],(function(t,e){t(e,1,0)}),null)}var M=n.mb("app-game-menu",h.a,k,{},{},[]),I=s("SVse"),O=s("s7LF"),C=s("iInd");s.d(e,"MatchPageModuleNgFactory",(function(){return T}));var T=n.nb(b,[],(function(t){return n.zb([n.Ab(512,n.j,n.Y,[[8,[w.a,A,M]],[3,n.j],n.v]),n.Ab(4608,I.k,I.j,[n.s,[2,I.r]]),n.Ab(4608,O.c,O.c,[]),n.Ab(4608,a.a,a.a,[n.x,n.g]),n.Ab(4608,a.Eb,a.Eb,[a.a,n.j,n.p]),n.Ab(4608,a.Hb,a.Hb,[a.a,n.j,n.p]),n.Ab(1073742336,I.b,I.b,[]),n.Ab(1073742336,O.b,O.b,[]),n.Ab(1073742336,O.a,O.a,[]),n.Ab(1073742336,a.Cb,a.Cb,[]),n.Ab(1073742336,C.n,C.n,[[2,C.s],[2,C.m]]),n.Ab(1073742336,b,b,[]),n.Ab(1024,C.k,(function(){return[[{path:"",component:p}]]}),[])])}))}}]);