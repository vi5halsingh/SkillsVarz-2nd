var tl = gsap.timeline({scrollTrigger:{
    trigger:"#first",
    start:"1%",
    end:"0%",
    scrub:1,
    pin:true
    
}});
tl
.to(".left",{
    x:"-100%", 
    // duration: 7,
    // ease: "power2.inOut"
},"a")
.to(".right",{
    x:"100%",
    // duration: 7,
    // ease: "power2.inOut"
 },"a")
  



 