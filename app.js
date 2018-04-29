const $canvas = document.querySelector('canvas')

const ctx = $canvas.getContext('2d')

$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

// base styles
ctx.lineWidth = 10 
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
// ctx.globalCompositeOperation = 'multiply'


let isDrawing = false  // flag to know when mouse is down
let lastX = 0
let lastY = 0
let hue = 0
let direction = true


// set background color
ctx.fillStyle = '#111'
ctx.fillRect(0, 0, $canvas.width, $canvas.height)


function draw(e) {
    if (!isDrawing) return

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

    ctx.beginPath()  
    ctx.moveTo(lastX, lastY)  // start from point
    ctx.lineTo(e.offsetX, e.offsetY)  // go to point
    ctx.stroke() // actually draw the line;

    ;[lastX, lastY] = [e.offsetX, e.offsetY]  // semicolon needed !!
    // lastX = e.offsetX
    // lastY = e.offsetY
    hue += 1

    if (ctx.lineWidth >= 150 || ctx.lineWidth <=1) {
        direction = !direction
    }

    if (direction) {
        console.log('up')
        ctx.lineWidth += 1
    } else {
        console.log('down')
        ctx.lineWidth -= 1
    }

}

$canvas.addEventListener('mousemove', draw)


$canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
    ;[lastX, lastY] = [e.offsetX, e.offsetY]  // semicolon necessary (edge case!)
})



$canvas.addEventListener('mouseup', () => isDrawing = false)
$canvas.addEventListener('mouseout', () => isDrawing = false)
