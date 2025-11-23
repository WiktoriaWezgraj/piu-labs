export function uid() {
return 'id_' + Math.random().toString(36).slice(2, 9);
}

export function randomHsl() {
const h = Math.floor(Math.random() * 360);
return `hsl(${h} 70% 75%)`;
}