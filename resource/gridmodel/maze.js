const grid = document.querySelector(".gridContainer");
const reset = document.querySelector(".reset");
import { isobstacle } from '../../script.js'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    return;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randompath(min, max) {
    if (min == max)
        return min;

    let path = Math.floor(Math.random() * (max - min + 1) + min);
    if (path % 2 == 0)
        return path;
    else
        return path - 1;

}


function ishorizontal(y1, y2, x1, x2) {
    if ((y2 - y1) > (x2 - x1))
        return false;
    else if ((y2 - y1) < (x2 - x1))
        return true;
    else return randomNumber(0, 1) == 0;
}
async function drawmaze(y1, y2, x1, x2) {
    if (y2 - y1 == 0 && x2 - x1 == 0)
        return;
    let middle, index, randpath;
    if (ishorizontal(y1, y2, x1, x2)) {
        middle = (x2 - x1 + 1) / 2;
        if (Math.floor(middle) % 2 == 0)
            middle = Math.ceil(middle) + x1;
        else
            middle = Math.floor(middle) + x1;
        randpath = randompath(y1, y2);
        for (let i = y1; i <= y2; i++) {
            await sleep(10);
            if (i != randpath) {
                index = middle + i * 41;
                isobstacle[index] = true;
                var x = document.getElementsByClassName("cell" + index);
                x[0].style.backgroundColor = "black"
            }
        }
        await drawmaze(y1, y2, x1, middle - 1);
        await drawmaze(y1, y2, middle + 1, x2);
    }
    else {
        middle = (y2 - y1 + 1) / 2;
        if (Math.floor(middle) % 2 == 0)
            middle = Math.ceil(middle) + y1;
        else
            middle = Math.floor(middle) + y1
        randpath = randompath(x1, x2);
        for (let i = x1; i <= x2; i++) {
            await sleep(10);
            if (i != randpath) {
                index = middle * 41 + i;
                isobstacle[index] = true;
                var x = document.getElementsByClassName("cell" + index);
                x[0].style.backgroundColor = "black"
            }
        }
        await drawmaze(y1, middle - 1, x1, x2);
        await drawmaze(middle + 1, y2, x1, x2);
    }

}

export function createmaze(height, width) {
    drawmaze(0, height - 1, 0, width - 1);
}
