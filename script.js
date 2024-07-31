const cursor = document.querySelector('.cursor')
const bg = document.querySelector('.background')
const canvas = bg.querySelector('canvas')

let mouseDown = false 
let lastX = 0
let lastY = 0

const ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

let coord = {x:0, y:0}

function getPosition(e) {
  const {clientX, clientY} = e
  coord.x = clientX - canvas.offsetLeft
  coord.y = clientY - canvas.offsetTop
}

window.addEventListener('mousemove', (e) => { 
  const {clientX, clientY} = e
  let x = clientX
  let y = clientY
  bg.style.setProperty('--x', `${clientX}px`)
  bg.style.setProperty('--y', `${clientY}px`)

  cursor.style.left = `${clientX}px`
  cursor.style.top = `${clientY - 300}px`
  
  if (mouseDown && bg.classList.contains('hidden')) {
    const newX = e.offsetX
    const newY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = Math.random() * 2 + 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'cyan'
    ctx.moveTo(coord.x, coord.y)
    getPosition(e)

    ctx.lineTo(newX, newY)
    ctx.stroke()

    x = newX
    y = newY
  }
})


window.addEventListener('mousedown', (e) => {
  getPosition(e)
  mouseDown = true
})

window.addEventListener('mouseup', () => {
  mouseDown = false
})

window.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    bg.classList.toggle('hidden')
  }
  if (bg.classList.contains('hidden')) { 
    cursor.style.backgroundImage = 'url("./pen.png")'; 
  } else {
    cursor.style.backgroundImage = 'url("./flashlight.png")';
  }
})