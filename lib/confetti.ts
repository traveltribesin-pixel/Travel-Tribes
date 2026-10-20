/**
 * Zero-dependency HTML5 Canvas Confetti & Celebration Burst
 * High performance, React 19 compatible, runs on pure requestAnimationFrame
 */

export interface ConfettiOptions {
  particleCount?: number
  originY?: number
}

export function fireCelebrationConfetti(options?: ConfettiOptions) {
  if (typeof window === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const rawCtx = canvas.getContext('2d')
  if (!rawCtx) {
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    return
  }
  const ctx: CanvasRenderingContext2D = rawCtx

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  // Vibrant travel celebratory palette (Tribe cyan, emerald, gold, purple, coral)
  const colors = [
    '#00b4d8',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#8b5cf6',
    '#3b82f6',
    '#ffd700',
    '#06d6a0',
    '#ef476f',
    '#14b8a6'
  ]

  interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    rotation: number
    rotationSpeed: number
    wobble: number
    wobbleSpeed: number
    opacity: number
    shape: 'rect' | 'circle' | 'star'
  }

  const particles: Particle[] = []
  const count = options?.particleCount || 130
  const originY = (options?.originY ?? 0.65) * canvas.height

  // 3 Launch Cannons: Left burst, Right burst, and Center rocket
  const origins = [
    { x: canvas.width * 0.15, y: originY, angleMin: -80, angleMax: -25 },
    { x: canvas.width * 0.85, y: originY, angleMin: -155, angleMax: -100 },
    { x: canvas.width * 0.5, y: originY * 0.85, angleMin: -130, angleMax: -50 }
  ]

  origins.forEach((origin) => {
    const subCount = Math.floor(count / origins.length)
    for (let i = 0; i < subCount; i++) {
      const angle =
        (Math.random() * (origin.angleMax - origin.angleMin) + origin.angleMin) *
        (Math.PI / 180)
      const speed = (Math.random() * 20 + 14) * dpr
      const shapeType: 'rect' | 'circle' | 'star' =
        Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star'

      particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (Math.random() * 8 + 6) * dpr,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
        opacity: 1,
        shape: shapeType
      })
    }
  })

  let animationFrameId: number
  const gravity = 0.42 * dpr
  const drag = 0.985
  const startTime = Date.now()
  const duration = 3400 // 3.4 seconds total animation

  function drawStar(
    c: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ) {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    c.beginPath()
    c.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      c.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      c.lineTo(x, y)
      rot += step
    }
    c.lineTo(cx, cy - outerRadius)
    c.closePath()
    c.fill()
  }

  function frame() {
    const elapsed = Date.now() - startTime
    if (elapsed > duration || particles.length === 0) {
      cancelAnimationFrame(animationFrameId)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Smooth fade out in the last 30% of time
    const fadeFactor =
      elapsed > duration * 0.7
        ? 1 - (elapsed - duration * 0.7) / (duration * 0.3)
        : 1

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.vx *= drag
      p.vy = p.vy * drag + gravity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.wobble += p.wobbleSpeed

      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity * fadeFactor)
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color

      const scaleX = Math.cos(p.wobble)
      ctx.scale(scaleX, 1)

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      } else if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        drawStar(ctx, 0, 0, 5, p.size, p.size / 2)
      }

      ctx.restore()
    }

    animationFrameId = requestAnimationFrame(frame)
  }

  animationFrameId = requestAnimationFrame(frame)
}
