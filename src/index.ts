/**
 * TTT3D - Tiny Transform Transitions 3D
 */
export default class TTT3D {
    #transitions: Map<string, Transition>;
    #origins: TransformMap;

    /**
     * @param origins Transform origins for all parts
     */
    constructor(origins: TransformMap) {
        this.#transitions = new Map<string, Transition>();
        this.#origins = origins;
    }

    /**
     * Add transition
     * @param name Name of transition
     * @param f Function that will be executed each update
     */
    add(name: string, f: (c: number) => TransformMapTerm) {
        this.#transitions.set(name, new Transition(f));
    }

    /**
     * Play transition
     * @param name Name of transition
     * @param rate Rate of transition, default: 1
     * @param loop Loop the transition, default: false
     */
    play(name: string, rate = 1, loop = false) {
        this.#transitions.get(name)?.play(rate, loop);
    }

    /**
     * Stop transition
     * @param name Name of transition
     */
    stop(name: string) {
        this.#transitions.get(name)?.stop();
    }

    /**
     * Set weight of transition
     * @param name Name of transition
     * @param w Weight of transition
     */
    setWeight(name: string, w: number) {
        const a = this.#transitions.get(name);
        a && (a.weight = w);
    }

    /**
     * Set rate of transition
     * @param name Name of transition
     * @param r Rate of transition
     */
    setRate(name: string, r: number) {
        const a = this.#transitions.get(name);
        a && (a.rate = r);
    }

    /**
     * Set whether the transition loops
     * @param name Name of transition
     * @param l Whether it loops
     */
    setLoop(name: string, l: boolean) {
        const a = this.#transitions.get(name);
        a && (a.loop = l);
    }

    /**
     * Set counter value (range 0-1)
     * @param name Name of transition
     */
    setCounter(name: string, v: number) {
        const a = this.#transitions.get(name);
        a && (a.counter = v);
    }

    /**
     * Get weight of transition
     * @param name Name of transition
     * @returns Weight of transition
     */
    getWeight(name: string): number {
        return this.#transitions.get(name)?.weight || 0;
    }

    /**
     * Get rate of transition
     * @param name Name of transition
     * @returns Rate of transition
     */
    getRate(name: string): number {
        return this.#transitions.get(name)?.rate || 0;
    }

    /**
     * Get whether the transition loops
     * @param name Name of transition
     * @returns Whether it loops
     */
    getLoop(name: string): boolean {
        return this.#transitions.get(name)?.loop || false;
    }

    /**
     * Get current counter value (range 0-1)
     * @param name Name of transition
     * @returns Current counter value
     */
    getCounter(name: string): number {
        return this.#transitions.get(name)?.counter || 0;
    }

    /**
     * Update all transforms
     * @param delta Time in seconds since last update
     * @returns {TransformMap} Updated transforms
     */
    update(delta: number): TransformMap {
        const res = this.#copyOrigins();
        for (const [k, e] of this.#transitions) {
            const t = e.update(delta);
            if (t && e.weight != 0)
                this.#addTransform(res, t, e.weight);
        }
        return res;
    }

    #addTransform(sum: TransformMap, term: TransformMapTerm, weight: number) {
        for (const p in term) {
            const ps = sum[p];
            if (!ps)
                continue;
            const pt = term[p];
            for (let i = 0; i < pt.length; i++) {
                const t = pt[i] || 0;
                ps[i] += t * weight;
            }
        }
    }

    #copyOrigins(): TransformMap {
        const res: TransformMap = {};
        for (const pn in this.#origins) {
            const p = this.#origins[pn];
            res[pn] = [...p];
        }
        return res;
    }
}

class Transition {
    weight = 1;
    rate = 1;
    loop = false;
    counter = 1;
    #f: (c: number) => TransformMapTerm;

    constructor(f: (c: number) => TransformMapTerm) {
        this.#f = f;
    }

    play(rate = 1, loop = false) {
        this.rate = rate;
        this.loop = loop;
        this.counter = 0;
    }

    stop() {
        this.loop = false;
        this.counter = 1;
    }

    update(delta: number): TransformMapTerm | void {
        this.counter += delta * this.rate;
        if (this.counter >= 1)
            this.counter = this.loop ? this.counter - 1 : 1;
        if (this.counter >= 1)
            return;
        return this.#f(this.counter);
    }
}

export interface TransformMap {
    [part: string]: Transform
}

export interface TransformMapTerm {
    [part: string]: TransformTerm
}

export type TransformTerm = [number?, number?, number?, number?, number?, number?, number?, number?, number?];
export type Transform = [number, number, number, number, number, number, number, number, number];
