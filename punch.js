class ball{
    constructor(y,r){
        var player_options = {
            isStatic: false
          }
          
          this.player = Bodies.circle(width/2,y,r,player_options);
          World.add(myWorld,this.player)
       //this.y = y
       this.r = r
      
    }

    display(){
        push();
        fill("blue");
        imageMode(CENTER);
        image(punch,this.player.position.x,this.player.position.y,2*this.r,2*this.r);
        pop();

    }
}