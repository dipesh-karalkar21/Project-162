AFRAME.registerComponent("throw",{
    init:function(){
        this.createBowl();
    },

    createBowl:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key == "z"){
                var bowl = document.createElement("a-entity");

                bowl.setAttribute("geometry",{
                    primitive : "sphere",
                    radius : "0.75"
                })

                bowl.setAttribute("material",{
                    color : "#000",
                })

                bowl.setAttribute("dynamic-body",{
                    mass : "100",
                    shape : "sphere",
                  })


                var cam = document.querySelector("#camera");
                var pos = cam.getAttribute("position");
                
                bowl.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})

                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();

                camera.getWorldDirection(direction);
                
                bowl.setAttribute("rotation",direction)
                bowl.setAttribute("velocity",direction.multiplyScalar(-10))

                bowl.addEventListener("collide",this.removeBowl);

                var scene = document.querySelector("#scene");

                scene.appendChild(bowl);


            }
        })
    },

    removeBowl: function (e) {
        console.log(e.detail.target.el);
    
        console.log(e.detail.body.el);
    
        var targ = e.detail.target.el;
    
    
        var bdy = e.detail.body.el;
    
     
    
        if (bdy.id.includes("box")) 
          {
            bdy.setAttribute("material",{
              opacity : 0.4,
            })
    
            var impulse = new CANNON.Vec3(-2,2,1);
            var pos = new CANNON.Vec3().copy(bdy.getAttribute("position"));
            bdy.body.applyImpulse(impulse,pos);
    
            targ.removeEventListener("collide",this.shoot);        
            
            var scene = document.querySelector("#scene");
    
            scene.removeChild(targ);        
          
        }
      },

}) 