import React from 'react'

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function random(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

function drawKirbyParticles(ctx, width, height, progress, seed) {
  const count = Math.min(900, Math.max(280, Math.floor((width * height) / 4200)))
  const travel = Math.min(1, progress / 0.82)
  const fade = Math.sin(Math.min(1, progress / 0.94) * Math.PI)

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.lineCap = 'round'

  for (let i = 0; i < count; i += 1) {
    const a = random(i * 1.71 + seed)
    const b = random(i * 5.93 + seed * 1.7)
    const c = random(i * 11.37 + seed * 3.1)
    const d = random(i * 17.81 + seed * 4.8)

    const startX = a * width
    const startY = b * height
    const direction = (c - 0.5) * Math.PI * 2
    const speed = width * (0.08 + d * 0.34)
    const drift = Math.sin(progress * Math.PI * 2 + a * 9) * height * 0.035

    const x = startX + Math.cos(direction) * speed * travel
    const y = startY + Math.sin(direction) * speed * travel + drift
    const trail = speed * (0.035 + d * 0.08) * travel
    const px = x - Math.cos(direction) * trail
    const py = y - Math.sin(direction) * trail

    const size = 0.7 + c * 3.2
    const alpha = Math.max(0, fade * (0.25 + d * 0.7))
    const gold = i % 9 === 0

    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(x, y)
    ctx.strokeStyle = gold
      ? `rgba(255,216,102,${alpha * 0.8})`
      : `rgba(215,255,79,${alpha})`
    ctx.lineWidth = size * 0.7
    ctx.shadowBlur = 5 + size * 5
    ctx.shadowColor = gold ? 'rgba(255,216,102,.8)' : 'rgba(215,255,79,.8)'
    ctx.stroke()

    if (c > 0.72) {
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = gold
        ? `rgba(255,239,176,${alpha})`
        : `rgba(235,255,180,${alpha})`
      ctx.fill()
    }
  }

  // Irregular energy bursts — deliberately no center, spiral, ring, or vortex.
  const bursts = 18
  for (let i = 0; i < bursts; i += 1) {
    const bx = random(i * 31.7 + seed) * width
    const by = random(i * 47.3 + seed * 2) * height
    const pulse = Math.pow(Math.max(0, Math.sin(progress * Math.PI * (1.4 + random(i + seed) * 1.2))), 8)
    const radius = 2 + random(i * 3.2 + seed) * 10

    if (pulse > 0.015) {
      const glow = ctx.createRadialGradient(bx, by, 0, bx, by, radius * 5)
      glow.addColorStop(0, `rgba(255,255,255,${pulse * 0.9})`)
      glow.addColorStop(0.18, `rgba(215,255,79,${pulse * 0.5})`)
      glow.addColorStop(1, 'rgba(215,255,79,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(bx, by, radius * 5, 0, Math.PI * 2)
      ctx.fill()
    }
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
    const targetY = height * (0.72 + random(p + seed) * 0.22)
    const segments = 8 + Math.floor(random(p * 4.7 + seed) * 5)
    points.push({ x, y: originY + p * height * 0.015 })

    for (let i = 1; i <= segments; i += 1) {
      const t = i / segments
      x += (random(i * 8.1 + p * 17.3 + seed) - 0.5) * width * 0.15
      points.push({ x, y: originY + (targetY - originY) * t })
    }

    for (let pass = 0; pass < 3; pass += 1) {
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      points.slice(1).forEach(point => ctx.lineTo(point.x, point.y))
      ctx.strokeStyle = pass === 0 ? `rgba(255,255,255,${0.95 * flash})` : `rgba(64,184,255,${(0.36 + p * 0.025) * flash})`
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
    let cancelled = false
    const start = performance.now()
    const duration = type === 'dark' ? 1050 : 760
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
      if (cancelled) return
      const progress = Math.min(1, (now - start) / duration)
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      if (type === 'dark') {
        // Keep the existing light page visible while the particles build up.
        // The theme itself is still changed only after the animation completes.
        const veil = Math.min(1, progress * 0.72)
        ctx.fillStyle = `rgba(5,6,7,${veil * 0.82})`
        ctx.fillRect(0, 0, width, height)
        drawKirbyParticles(ctx, width, height, progress, seed)
      } else {
        ctx.fillStyle = `rgba(190,225,255,${Math.max(0, progress * 0.16)})`
        ctx.fillRect(0, 0, width, height)
        drawLightning(ctx, width, height, progress, seed)
      }

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [type, onComplete])

  return <canvas ref={canvasRef} className={`theme-effect theme-effect-${type}`} aria-hidden="true" />
}
