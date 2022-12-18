# TTT3D

[![npm](https://img.shields.io/npm/v/@jgtools/ttt3d)](https://www.npmjs.com/package/@jgtools/ttt3d)
[![npm](https://img.shields.io/npm/dm/@jgtools/ttt3d)](https://www.npmjs.com/package/@jgtools/ttt3d)
[![GitHub](https://img.shields.io/github/license/jgtools/ttt3d)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

TTT3D - Tiny Transform Transitions 3D

## Features

:heavy_check_mark: Lightweight library for managing transform transitions\
:heavy_check_mark: Simple and flexible way to animate 3D objects\
:heavy_check_mark: Can be used with any 3D library\
:blue_square: Written in TypeScript

## Installation

### Using npm

```bash
npm i @jgtools/ttt3d
```

### Using cdn

```html
<script type="module">
    import TTT3D from "https://cdn.jsdelivr.net/npm/@jgtools/ttt3d@1.0.3/dist/index.min.js";
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

```javascript
```

## Docs

[Complete docs here](docs/classes/default.md)

## License

MIT
