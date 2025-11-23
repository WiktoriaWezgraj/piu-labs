import { uid } from './helpers.js';
const STORAGE_KEY = 'lab5_shapes_state_v1';

export default class Store {
constructor() {
    this.subscribers = [];
    this.state = {
        shapes: [] 
        };

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.shapes)) this.state.shapes = parsed.shapes;
                }
            } catch (e) {
                console.error('Nie można wczytać stanu z localStorage', e);
            }
        }

        subscribe(cb) {
        this.subscribers.push(cb);
        cb({ type: 'init', state: this.getStateCopy() });
        return () => {
        this.subscribers = this.subscribers.filter(s => s !== cb);
        };
    }


    notify(payload) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Nie udało się zapisać stanu', e);
            }
            for (const s of this.subscribers) s(payload);
            }


            getStateCopy() {
            return {
                shapes: this.state.shapes.map(s => ({...s}))
                };
            }


            addShape(type, color=null) {
                const shape = { id: uid(), type, color: color || this._randomColor() };
                this.state.shapes.push(shape);
                this.notify({ type: 'add', shape: {...shape} });
                return shape;
                }


            removeShape(id) {
                const idx = this.state.shapes.findIndex(s => s.id === id);
                if (idx === -1) return;
                const [removed] = this.state.shapes.splice(idx, 1);
                this.notify({ type: 'remove', id, shape: removed });
                }


            recolor(type) {
            const changed = [];
            for (const s of this.state.shapes) {
                if (s.type === type) {
                    s.color = this._randomColor();
                    changed.push({ ...s });
                    }
                }
                this.notify({ type: 'recolor', shapeType: type, shapes: changed });
                }


                counts() {
                const counts = { square: 0, circle: 0 };
                for (const s of this.state.shapes) counts[s.type] = (counts[s.type] || 0) + 1;
                return counts;
                }
                _randomColor() {
                const h = Math.floor(Math.random() * 360);
                return `hsl(${h} 70% 75%)`;
                }
            }