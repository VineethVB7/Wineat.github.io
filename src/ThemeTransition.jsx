import React from 'react'

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function drawLightning(ctx, width, height, seed) {
  const points = []
  const startX = width * 0.08 + Math.sin(seed) * width * 0.04
  const endX = width * 0.92 + Math.cos(seed) * width * 0.04
  const y = height * (0.46 + Math.sin(seed * 0.7) * 0.08)
  const segments = Math.max(10, Math.floor(width / 90))

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments
    const x = startX + (endX - startX) * t
    const jitter = i === 0 || i === segments ? 0 : (Math.random() - 0.5) * height * 0.34
    points.push({ x, y: y + jitter })
  }

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (let pass = 0; pass < 3; pass += 1) {
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.slice(1).forEach(point => ctx.lineTo(point.x, point.y))
    ctx.strokeStyle = pass === 0 ? 'rgba(255,255,255,.98)' : 'rgba(72,186,255,.8)'
    ctx.lineWidth = pass === 0 ? 2.5 : 12 - pass * 3
    ctx.shadowBlur = pass === 0 ? 18 : 30
    ctx.shadowColor = 'rgba(72,186,255,.95)'
    ctx.stroke()
  }

  const branchCount = Math.min(8, Math.floor(width / 170))
  for (let i = 0; i < branchCount; i += 1) {
    const index = 1 + Math.floor(((points.length - 3) * (i + 1)) / (branchCount + 1))
    const origin = points[index]
    const length = 50 + Math.random() * 100
    const direction = i % 2 === 0 ? -1 : 1
    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(origin.x + length * 0.45, origin.y + direction * length * 0.3)
    ctx.lineTo(origin.x + length, origin.y + direction * length * 0.7)
    ctx.strokeStyle = 'rgba(190,235,255,.8)'
    ctx.lineWidth = 1.3
    ctx.shadowBlur = 14
    ctx.shadowColor = 'rgba(72,186,255,.9)'
    ctx.stroke()
  }

  ctx.restore()
}

function drawTesseract(ctx, width, height, progress, seed) {
  const cx = width / 2
  const cy = height / 2
  const scale = Math.min(width, height) * (0.08 + Math.sin(progress * Math.PI) * 0.09)
  const rotation = seed + progress * Math.PI * 1.7
  const c = Math.cos(rotation)
  const s = Math.sin(rotation)
  const perspective = 0.62 + Math.sin(progress * Math.PI) * 0.18

  const cube = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ]

  const project = ([x, y, z]) => {
    const rx = x * c - z * s
    const rz = x * s + z * c
    return {
      x: cx + rx * scale,
      y: cy + y * scale + rz * scale * perspective * 0.45,
    }
  }

  const outer = cube.map(project)
  const innerScale = 0.48
  const inner = cube.map(([x, y, z]) => project([x * innerScale, y * innerScale, z * innerScale]))
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 2.6)
  glow.addColorStop(0, 'rgba(255,255,255,.45)')
  glow.addColorStop(0.2, 'rgba(215,255,79,.18)')
  glow.addColorStop(1, 'rgba(215,255,79,0)')
  ctx.fillStyle = glow
  ctx.fillRect(cx - scale * 2.6, cy - scale * 2.6, scale * 5.2, scale * 5.2)

  edges.forEach(([a, b]) => {
    ctx.beginPath()
    ctx.moveTo(outer[a].x, outer[a].y)
    ctx.lineTo(outer[b].x, outer[b].y)
    ctx.strokeStyle = 'rgba(215,255,79,.78)'
    ctx.lineWidth = 2
    ctx.shadowBlur = 18
    ctx.shadowColor = 'rgba(215,255,79,.95)'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(inner[a].x, inner[a].y)
    ctx.lineTo(inner[b].x, inner[b].y)
    ctx.strokeStyle = 'rgba(255,255,255,.85)'
    ctx.lineWidth = 1.2
    ctx.shadowBlur = 12
    ctx.shadowColor = 'rgba(255,255,255,.9)'
    ctx.stroke()
  })

  outer.forEach((point, index) => {
    const pulse = 2 + Math.sin(progress * Math.PI * 4 + index) * 1.3
    ctx.beginPath()
    ctx.arc(point.x, point.y, Math.max(1, pulse), 0, Math.PI * 2)
    ctx.fillStyle = index % 2 ? 'rgba(255,218,100,.95)' : 'rgba(255,255,255,.98)'
    ctx.shadowBlur = 20
    ctx.shadowColor = 'rgba(215,255,79,1)'
    ctx.fill()
  })

  ctx.restore()
}

function drawParticles(ctx, width, height, progress, seed) {
  const count = Math.floor(Math.min(180, Math.max(90, width * height / 9000)))
  const cx = width / 2
  const cy = height / 2
  const spread = Math.max(width, height) * 0.62

  ctx.save()
  ctx.globalCompositeOperation = 'screen'

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 12 + seed + Math.sin(i * 12.37) * 0.5
    const radius = spread * (0.22 + ((i * 37) % 100) / 100 * 0.78)
    const startX = cx + Math.cos(angle) * radius
    const startY = cy + Math.sin(angle) * radius * 0.7
    const ease = progress < 0.58 ? progress / 0.58 : 1 - (progress - 0.58) / 0.42
    const pull = Math.min(1, Math.max(0, ease))
    const x = startX + (cx - startX) * pull * 0.94
    const y = startY + (cy - startY) * pull * 0.94
    const size = 0.7 + ((i * 19) % 8) / 5
    const alpha = Math.max(0, Math.sin(Math.min(1, progress) * Math.PI)) * (0.25 + ((i * 13) % 10) / 14)

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = i % 5 === 0 ? `rgba(255,215,92,${alpha})` : `rgba(215,255,79,${alpha})`
    ctx.shadowBlur = 8
    ctx.shadowColor = i % 5 === 0 ? 'rgba(255,215,92,.8)' : 'rgba(215,255,79,.8)'
    ctx.fill()
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
    const duration = type === 'dark' ? 760 : 680
    const seed = Math.random() * Math.PI * 2

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
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      if (type === 'dark') {
        ctx.fillStyle = `rgba(5,6,7,${0.08 + eased * 0.9})`
        ctx.fillRect(0, 0, width, height)
        drawParticles(ctx, width, height, progress, seed)
        drawTesseract(ctx, width, height, progress, seed)
      } else {
        ctx.fillStyle = `rgba(220,240,255,${Math.max(0, eased * 0.18)})`
        ctx.fillRect(0, 0, width, height)
        drawLightning(ctx, width, height, seed + progress * 4)
        const flash = Math.max(0, Math.sin(progress * Math.PI))
        if (flash > 0.65) {
          ctx.fillStyle = `rgba(255,255,255,${(flash - 0.65) * 1.9})`
          ctx.fillRect(0, 0, width, height)
        }
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
