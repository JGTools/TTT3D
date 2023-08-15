[@jgtools/ttt3d](../README.md) / [Exports](../modules.md) / default

# Class: default

TTT3D - Tiny Transform Transitions 3D

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [#origins](default.md##origins)
- [#transitions](default.md##transitions)

### Methods

- [#addTransform](default.md##addtransform)
- [#copyOrigins](default.md##copyorigins)
- [add](default.md#add)
- [getCounter](default.md#getcounter)
- [getLoop](default.md#getloop)
- [getRate](default.md#getrate)
- [getWeight](default.md#getweight)
- [play](default.md#play)
- [setCounter](default.md#setcounter)
- [setLoop](default.md#setloop)
- [setRate](default.md#setrate)
- [setWeight](default.md#setweight)
- [stop](default.md#stop)
- [update](default.md#update)

## Constructors

### constructor

• **new default**(`origins`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origins` | [`TransformMap`](../interfaces/TransformMap.md) | Transform origins for all parts |

#### Defined in

[index.ts:11](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L11)

## Properties

### #origins

• `Private` **#origins**: [`TransformMap`](../interfaces/TransformMap.md)

#### Defined in

[index.ts:6](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L6)

___

### #transitions

• `Private` **#transitions**: `Map`<`string`, `Transition`\>

#### Defined in

[index.ts:5](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L5)

## Methods

### #addTransform

▸ `Private` **#addTransform**(`sum`, `term`, `weight`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sum` | [`TransformMap`](../interfaces/TransformMap.md) |
| `term` | [`TransformMapTerm`](../interfaces/TransformMapTerm.md) |
| `weight` | `number` |

#### Returns

`void`

#### Defined in

[index.ts:133](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L133)

___

### #copyOrigins

▸ `Private` **#copyOrigins**(): [`TransformMap`](../interfaces/TransformMap.md)

#### Returns

[`TransformMap`](../interfaces/TransformMap.md)

#### Defined in

[index.ts:146](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L146)

___

### add

▸ **add**(`name`, `f`): `void`

Add transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |
| `f` | (`c`: `number`) => [`TransformMapTerm`](../interfaces/TransformMapTerm.md) | Function that will be executed each update |

#### Returns

`void`

#### Defined in

[index.ts:21](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L21)

___

### getCounter

▸ **getCounter**(`name`): `number`

Get current counter value (range 0-1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |

#### Returns

`number`

Current counter value

#### Defined in

[index.ts:114](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L114)

___

### getLoop

▸ **getLoop**(`name`): `boolean`

Get whether the transition loops

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |

#### Returns

`boolean`

Whether it loops

#### Defined in

[index.ts:105](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L105)

___

### getRate

▸ **getRate**(`name`): `number`

Get rate of transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |

#### Returns

`number`

Rate of transition

#### Defined in

[index.ts:96](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L96)

___

### getWeight

▸ **getWeight**(`name`): `number`

Get weight of transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |

#### Returns

`number`

Weight of transition

#### Defined in

[index.ts:87](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L87)

___

### play

▸ **play**(`name`, `rate?`, `loop?`): `void`

Play transition

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | Name of transition |
| `rate` | `number` | `1` | Rate of transition, default: 1 |
| `loop` | `boolean` | `false` | Loop the transition, default: false |

#### Returns

`void`

#### Defined in

[index.ts:31](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L31)

___

### setCounter

▸ **setCounter**(`name`, `v`): `void`

Set counter value (range 0-1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |
| `v` | `number` | - |

#### Returns

`void`

#### Defined in

[index.ts:77](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L77)

___

### setLoop

▸ **setLoop**(`name`, `l`): `void`

Set whether the transition loops

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |
| `l` | `boolean` | Whether it loops |

#### Returns

`void`

#### Defined in

[index.ts:68](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L68)

___

### setRate

▸ **setRate**(`name`, `r`): `void`

Set rate of transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |
| `r` | `number` | Rate of transition |

#### Returns

`void`

#### Defined in

[index.ts:58](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L58)

___

### setWeight

▸ **setWeight**(`name`, `w`): `void`

Set weight of transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |
| `w` | `number` | Weight of transition |

#### Returns

`void`

#### Defined in

[index.ts:48](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L48)

___

### stop

▸ **stop**(`name`): `void`

Stop transition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of transition |

#### Returns

`void`

#### Defined in

[index.ts:39](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L39)

___

### update

▸ **update**(`delta`): [`TransformMap`](../interfaces/TransformMap.md)

Update all transforms

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delta` | `number` | Time in seconds since last update |

#### Returns

[`TransformMap`](../interfaces/TransformMap.md)

Updated transforms

#### Defined in

[index.ts:123](https://github.com/JGTools/TTT3D/blob/f7dad99/src/index.ts#L123)
