import React from 'react'

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function random(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

function drawEnergyVortex(ctx, width, height, progress, seed) {
  const cx = width / 2
  const cy = height / 2
  const maxRadius = Math.hypot(width, height) * 0.72
  const convergence = Math.min(1, Math.max(0, (progress - 0.06) / 0.82))
  const pulse = Math.sin(progress * Math.PI)

  ctx.save()
  ctx.globalCompositeOperation = 'screen'

  // Cosmic/Kirby-style energy field. No cube or recognizable geometric object.
  const fieldRadius = maxRadius * (0.18 + convergence * 0.86)
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, fieldRadius)
  gradient.addColorStop(0, `rgba(255,255,255,${0.16 * pulse})`)
  gradient.addColorStop(0.08, `rgba(215,255,79,${0.10 * pulse})`)
  gradient.addColorStop(0.42, `rgba(215,255,79,${0.035 * pulse})`)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const count = Math.min(900, Math.max(260, Math.floor(width * height / 2200)))

  for (let i = 0; i < count; i += 1) {
    const a = random(i * 1.73 + seed)
    const b = random(i * 7.91 + seed * 2.3)
    const c = random(i * 13.17 + seed * 4.1)
    const angle = a * Math.PI * 2 + progress * (0.8 + b * 2.2)
    const startRadius = maxRadius * (0.22 + b * 0.78)
    const pull = Math.pow(convergence, 1.35) * (0.82 + c * 0.18)
    const radius = startRadius * (1 - pull * 0.96)
    const swirl = angle + pull * (1.4 + b * 2.6)
    const x = cx + Math.cos(swirl) * radius
    const y = cy + Math.sin(swirl) * radius * (0.68 + c * 0.28)

    const previousRadius = startRadius * (1 - Math.max(0, pull - 0.035) * 0.96)
    const previousAngle = angle + Math.max(0, pull - 0.035) * (1.4 + b * 2.6)
    const px = cx + Math.cos(previousAngle) * previousRadius
    const py = cy + Math.sin(previousAngle) * previousRadius * (0.68 + c * 0.28)

    const alpha = Math.max(0, pulse * (0.12 + c * 0.65) * (0.35 + convergence * 0.8))
    const size = 0.45 + c * 1.65

    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(x, y)
    ctx.strokeStyle = i % 11 === 0 ? `rgba(255,216,102,${alpha})` : `rgba(215,255,79,${alpha})`
    ctx.lineWidth = size
    ctx.shadowBlur = 5 + c * 10
    ctx.shadowColor = i % 11 === 0 ? 'rgba(255,216,102,.7)' : 'rgba(215,255,79,.7)'
    ctx.stroke()
  }

  const bloom = Math.pow(Math.max(0, Math.sin(progress * Math.PI * 1.35)), 5)
  if (bloom > 0.01) {
    const r = Math.max(width, height) * (0.015 + bloom * 0.085)
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    core.addColorStop(0, `rgba(255,255,255,${0.9 * bloom})`)
    core.addColorStop(0.16, `rgba(215,255,79,${0.48 * bloom})`)
    core.addColorStop(0.55, `rgba(215,255,79,${0.10 * bloom})`)
    core.addColorStop(1, 'rgba(215,255,79,0)')
    ctx.fillStyle = core
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  }

  ctx.restore()
}

function drawLightning(ctx, width, height, progress, seed) {
  const flash = Math.sin(progress * Math.PI)
  const paths = Math.min(9, Math.max(5, Math.floor(width / 240)))
  const originX = width * (0.42 + Math.sin(seed) * 0.12)
  const originY = height * (0.18 + Math.cos(seed) * 0.08)

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (let p = 0; p < paths; p += 1) {
    const points = []
    let x = originX + (p - paths / 2) * width * 0.018
    let y = originY + p * height * 0.015
    const targetY = height * (0.72 + random(p + seed) * 0.22)
    const segments = 8 + Math.floor(random(p * 4.7 + seed) * 5)
    points.push({ x, y })

    for (let i = 1; i <= segments; i += 1) {
      const t = i / segments
      x += (random(i * 8.1 + p * 17.3 + seed) - 0.5) * width * 0.15
      y = originY + (targetY - originY) * t
      points.push({ x, y })
    }

    for (let pass = 0; pass < 3; pass += 1) {
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      points.slice(1).forEach(point => ctx.lineTo(point.x, point.y))
      ctx.strokeStyle = pass === 0 ? `rgba(255,255,255,${0.9 * flash})` : `rgba(64,184,255,${(0.34 + p * 0.025) * flash})`
      ctx.lineWidth = pass === 0 ? 1.8 : 10 - pass * 3
      ctx.shadowBlur = pass === 0 ? 20 : 34
      ctx.shadowColor = `rgba(55,178,255,${0.9 * flash})`
      ctx.stroke()
    }
  }

  const screenFlash = Math.pow(Math.max(0, Math.sin(progress * Math.PI * 1.4)), 9)
  if (screenFlash > 0.01) {
    ctx.fillStyle = `rgba(255,255,255,${screenFlash * 0.72})`
    ctx.fillRect(0, 0, width, height)
  }

  ctx.restore()
}

export default function ThemeTransition({ type, onComplete }) {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete?.()
      return undefined
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frame = 0
    const start = performance.now()
    const duration = type === 'dark' ? 900 : 760
    const seed = Math.random() * 1000

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const animate = now => {
      const progress = Math.min(1, (now - start) / duration)
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      if (type === 'dark') {
        const field = Math.min(1, progress * 1.18)
        ctx.fillStyle = `rgba(5,6,7,${field * 0.96})`
        ctx.fillRect(0, 0, width, height)
        drawEnergyVortex(ctx, width, height, progress, seed)
      } else {
        ctx.fillStyle = `rgba(190,225,255,${Math.max(0, progress * 0.16)})`
        ctx.fillRect(0, 0, width, height)
        drawLightning(ctx, width, height, progress, seed)
      }

      if (progress < 1) frame = requestAnimationFrame(animate)
      else onComplete?.()
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [type, onComplete])

  return <canvas ref={canvasRef} className={`theme-effect theme-effect-${type}`} aria-hidden="true" />
}
