@jgtools/ttt3d / [Exports](modules.md)

# TTT3D

[![npm](https://img.shields.io/npm/v/@jgtools/ttt3d)](https://www.npmjs.com/package/@jgtools/ttt3d)
[![npm](https://img.shields.io/npm/dm/@jgtools/ttt3d)](https://www.npmjs.com/package/@jgtools/ttt3d)
[![GitHub](https://img.shields.io/github/license/jgtools/ttt3d)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

TTT3D - Tiny Transform Transitions 3D

## Features

- :heavy_check_mark: Lightweight and simple way to animate 3D objects
- :heavy_check_mark: Can be used with any 3D library
- :blue_square: Written in TypeScript

## Installation

### Using npm

```bash
npm i @jgtools/ttt3d
```

### Using cdn

```html
<script type="module">
    import TTT3D from "https://cdn.jsdelivr.net/npm/@jgtools/ttt3d@1.0.5/dist/index.min.js";
    // ...
</script>
```

## Usage

### Simple example

Animating a jumping cube.

- Full code [here](examples/simple/index.html)
- Codepen demo [here](https://codepen.io/erik1001/pen/wvxvKwo)

Create cube and define animations:

```javascript
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

// create ttt3d instance
// [pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, scale.x, scale.y, scale.z]
const origins = {
  cube: [0, 0, 0, 0, 0, 0, 1, 1, 1],
};
const ttt = new TTT3D(origins);

// setup jump transition
ttt.add("jump", (c) => {
  const t = Math.sin(c * Math.PI);
  return {
    cube: [0, t * 2, 0, 0, t * 4, 0, 0, t, 0],
  };
});

// play jump transition every 3 seconds
setInterval(() => ttt.play("jump"), 3000);
```

Update each frame and apply result to mesh:

```javascript
// update transition system
const res = ttt.update(delta);

// update mesh transform
const part = res["cube"];
cube.position.set(part[0], part[1], part[2]);
cube.rotation.set(part[3], part[4], part[5]);
cube.scale.set(part[6], part[7], part[8]);
```

### Advanced example

Animating a idling, walking and jumping cube with legs.

- Full code [here](examples/advanced)
- Codepen demo [here](https://codepen.io/erik1001/pen/jOpOwPL)

Create player parts and define animations:

```javascript
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
  leftFoot: [0.3, -0.5, 0, 0, 0, 0, 0.4, 0.3, 0.6],
};
const ttt = new TTT3D(origins);

// create animations
ttt.add("idle", (c) => {
  const t = Math.sin(c * Math.PI);
  return {
    head: [0, t * 0.1],
  };
});
ttt.add("walk", (c) => {
  const t = Math.sin(c * Math.PI * 2);
  return {
    head: [0, 0, 0.2 * t],
    rightFoot: [0, 0, t * 0.3, -0.2 * t],
    leftFoot: [0, 0, -t * 0.3, 0.2 * t],
  };
});
ttt.add("jump", (c) => {
  const t = Math.sin(c * Math.PI);
  const hs = outElastic(t);
  return {
    head: [0, t, 0, -t * 0.4, 0, 0, -hs * 0.4, hs * 0.5, -hs * 0.4],
    rightFoot: [0, t, 0, t],
    leftFoot: [0, t * 1.3, 0, t * 1.5],
  };
});

ttt.play("idle", 1, true);
ttt.play("walk", 0.6, true);
setInterval(() => ttt.play("jump", 0.6), 3000);

let isWalking = true;
setInterval(() => isWalking = !isWalking, 5000);
```

Update each frame and apply result to meshes:

```javascript
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
```

## Docs

[Complete docs here](docs/classes/default.md)

## License

MIT
