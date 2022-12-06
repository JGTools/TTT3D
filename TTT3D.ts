export type Transform = [number, number, number, number, number, number, number, number, number];

export interface TransformMap {
    [part: string]: Transform
}

class Transition {
    weight = 1;
    rate = 1;
    loop = false;
    #counter = 1;
    #f: (c: number) => TransformMap;

    constructor(f: (c: number) => TransformMap) {
        this.#f = f;
    }

    play(rate = 1, loop = false) {
        this.rate = rate;
        this.loop = loop;
        this.#counter = 0;
    }

    stop() {
        this.loop = false;
        this.#counter = 1;
    }

    update(delta: number): TransformMap | void {
        this.#counter += delta * this.rate;
        if (this.#counter >= 1)
            this.#counter = this.loop ? this.#counter - 1 : 1;
        if (this.#counter >= 1)
            return;
        return this.#f(this.#counter);
    }
}

/**
 * TTT3D - Tiny Transform Transitions 3D
 */
export default class TTT3D {
    #transitions: Map<string, Transition>;
    #origin: TransformMap;

    /**
     * @param origin - Transforms origin for all parts
     */
    constructor(origin: TransformMap) {
        this.#transitions = new Map<string, Transition>();
        this.#origin = origin;
    }

    /**
     * Add transition
     * @param name - Name of transition
     * @param f - Function that will be executed each update
     */
    add(name: string, f: (c: number) => TransformMap) {
        this.#transitions.set(name, new Transition(f));
    }

    /**
     * Play transition
     * @param name - Name of transition
     * @param rate - Rate of transition, default: 1
     * @param loop - Loop the transition, default: false
     */
    play(name: string, rate = 1, loop = false) {
        this.#transitions.get(name)?.play(rate, loop);
    }

    /**
     * Stop transition
     * @param name - Name of transition
     */
    stop(name: string) {
        this.#transitions.get(name)?.stop();
    }

    /**
     * Set weight of transition
     * @param name - Name of transition
     * @param w - Weight of transition
     */
    setWeight(name: string, w: number) {
        const a = this.#transitions.get(name);
        a && (a.weight = w);
    }

    /**
     * Set rate of transition
     * @param name - Name of transition
     * @param r - Rate of transition
     */
    setRate(name: string, r: number) {
        const a = this.#transitions.get(name);
        a && (a.rate = r);
    }

    /**
     * Set whether the transition loops
     * @param name - Name of transition
     * @param l - Whether it loops
     */
    setLoop(name: string, l: boolean) {
        const a = this.#transitions.get(name);
        a && (a.loop = l);
    }

    /**
     * Update all transforms
     * @param delta - time in seconds since last update
     * @returns {TransformMap} Updated transforms
     */
    update(delta: number): TransformMap {
        const res = this.#copyOrigin();
        for (const [k, e] of this.#transitions) {
            const t = e.update(delta);
            if (t && e.weight > 0)
                this.#addTransform(res, t, e.weight);
        }
        return res;
    }

    #addTransform(sum: TransformMap, term: TransformMap, weight: number) {
        for (const p in term) {
            const ps = sum[p];
            if (!ps)
                continue;
            const pt = term[p];
            for (let i = 0; i < 9; i++) {
                ps[i] += pt[i] * weight;
            }
        }
    }

    #copyOrigin(): TransformMap {
        const res: TransformMap = {};
        for (const pn in this.#origin) {
            const p = this.#origin[pn];
            res[pn] = [...p];
        }
        return res;
    }
}
