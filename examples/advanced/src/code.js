import { outElastic } from '@jgtools/easings';
import TTT3D from '@jgtools/ttt3d';
import * as THREE from 'three';

// setup three js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 1, 5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(512, 512);
document.body.appendChild(renderer.domElement);
const aLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(aLight);
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// create player mesh and store parts in a map
const player = new THREE.Group();
scene.add(player);

const matHead = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const matFoot = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const geo = new THREE.BoxGeometry();

const head = new THREE.Mesh(geo, matHead);
const rightFoot = new THREE.Mesh(geo, matFoot);
const leftFoot = new THREE.Mesh(geo, matFoot);
player.add(head);
player.add(rightFoot);
player.add(leftFoot);

const playerParts = new Map();
playerParts.set("head", head);
playerParts.set("rightFoot", rightFoot);
playerParts.set("leftFoot", leftFoot);

// setup ttt3d with default transforms
const origins = {
    head: [0, 0.8, 0, 0, 0, 0, 1, 1, 1],
    rightFoot: [-0.3, -0.5, 0, 0, 0, 0, 0.4, 0.3, 0.6],
    leftFoot: [0.3, -0.5, 0, 0, 0, 0, 0.4, 0.3, 0.6]
};
const ttt = new TTT3D(origins);

// create animations
ttt.add("idle", c => {
    const t = Math.sin(c * Math.PI);
    return {
        head: [0, t * 0.1]
    };
});
ttt.add("walk", c => {
    const t = Math.sin(c * Math.PI * 2);
    return {
        head: [0, 0, 0.2 * t],
        rightFoot: [0, 0, t * 0.3, -0.2 * t],
        leftFoot: [0, 0, -t * 0.3, 0.2 * t]
    };
});
ttt.add("jump", c => {
    const t = Math.sin(c * Math.PI);
    const hs = outElastic(t);
    return {
        head: [0, t, 0, -t * 0.4, 0, 0, -hs * 0.4, hs * 0.5, -hs * 0.4],
        rightFoot: [0, t, 0, t],
        leftFoot: [0, t * 1.3, 0, t * 1.5]
    };
});

ttt.play("idle", 1, true);
ttt.play("walk", 0.6, true);
setInterval(() => ttt.play("jump", 0.6), 3000);

let isWalking = true;
setInterval(() => isWalking = !isWalking, 5000);

const clock = new THREE.Clock();
const update = () => {
    const delta = clock.getDelta();

    player.rotation.y += delta * 0.3;

    // blend smoothly between the walk and idle
    const BLEND_SPEED = 3;
    let w = ttt.getWeight("idle") || 0;
    w += delta * (isWalking ? -BLEND_SPEED : BLEND_SPEED);
    w = Math.min(Math.max(0, w), 1);
    ttt.setWeight("idle", w);
    ttt.setWeight("walk", 1 - w);

    // update ttt and apply transforms to meshes
    const res = ttt.update(delta);
    for (const [k, e] of playerParts) {
        e.position.set(res[k][0], res[k][1], res[k][2]);
        e.rotation.set(res[k][3], res[k][4], res[k][5]);
        e.scale.set(res[k][6], res[k][7], res[k][8]);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
update();