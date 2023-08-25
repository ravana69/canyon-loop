console.clear()

import { spline, pointsInPath } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";

const stage = document.querySelector('.stage')
let nPts = 20,
    nPaths = 8

for (let i=0; i<nPaths; i++){
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  let d = 'M'+gsap.utils.random(-20,20,0.1)+',0 l'
  let arr = []
  stage.appendChild(path)
  for (let pt=1; pt<=nPts; pt++){
    const x = gsap.utils.random(15,30,0.1),
          y = (pt<nPts/2)?45:-45
    d += x +','+ y +' '
  }
  gsap.set(path, {attr:{d:d}})
  const splined = spline(pointsInPath(path), 2)
  gsap.set(path, {attr:{d:splined+'L500,-100 500,500 -100,500 -100,-100z'}})
  
  gsap.timeline({repeat:-1, repeatRefresh:true})
  .fromTo(path, {attr:{fill:'#223'}}, {duration:5, attr:{fill:'#eee'}, ease:'sine.inOut'}, 0)
  .fromTo(path, {
    svgOrigin:'200 99',
    scaleX:1.1,
    scaleY:0.65
  },{
    duration:10,
    scaleX:5,
    scaleY:3,
    y:()=>gsap.utils.random(200,300,1),
    ease:'power1.in',
    onComplete:(i,t)=>{ stage.insertBefore(path, stage.children[0]) }
  }, 0)
  .seek(i/nPaths*10)
}

gsap.fromTo('.noiseRect', {scale:1}, {scale:1.1, ease:'steps(10)', repeat:-1})