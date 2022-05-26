const TextToSVG = require('text-to-svg');
const regFont = TextToSVG.loadSync('res/Inconsolata-Regular.ttf');
const semiboldFont = TextToSVG.loadSync('res/Inconsolata-SemiBold.ttf');

// Left bracket
const leftBracket = regFont.getPath('{',{x: 15, y: 52, fontSize: 130, anchor: 'left middle', attributes: {fill: 'red', stroke: 'none', id: 'logo-left-bracket'}});
const rightBracket = regFont.getPath('}', {x: 315, y: 52, fontSize: 130, anchor: 'left middle', attributes: {fill: 'white', stroke: 'none', id: 'logo-right-bracket'}});
const chris = semiboldFont.getPath('Chris', {x: 90, y: 28, fontSize: 60, anchor: 'left middle', attributes: {fill: 'white', stroke: 'none', id: 'logo-chris'}});
const vroegop = regFont.getPath('Vroegop', {x: 90, y: 82, fontSize: 60, anchor: 'left middle', attributes: {fill: 'red', stroke: 'none', id: 'logo-vroegop'}});

//     <rect width="100%" height="100%" fill="black" />
const svg = `<svg version="1.1" id="logo" viewBox="0 0 385 115" preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="logo-clip-path">
            <rect id="logo-clip-rect" x="0" y="0" width="55" height="115"/>
        </clipPath>
    </defs>
    <g id="logo-name">
        ${chris}
        ${vroegop}
    </g>
    ${leftBracket}
    ${rightBracket}
</svg>
`

const fs = require('fs');
fs.writeFile('../res/logo.svg', svg, 'utf8', () => {});
