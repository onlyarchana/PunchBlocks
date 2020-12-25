class snake{
    constructor(bodyA, bodyB){
        var options = {
            bodyA: bodyA,
            bodyB: bodyB,
            stiffness: 0.1,
            length: 1
        }
        this.sling = Constraint.create(options);
        World.add(myWorld, this.sling);
    }

    display(){
        var posA = this.sling.bodyA.position
        var posB = this.sling.bodyB.position
        line(posA.x,posA.y,posB.x,posB.y)
        
 }

  remove(){

        
    }

    attach(body){

        
        
    }
}