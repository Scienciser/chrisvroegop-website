
export const utils = {
    range: (min, max) => Array.from({ length: max - min }, (_, i) => min + i),
    random: (min, max) => Math.floor(Math.random() * (max - min) + min)
}
