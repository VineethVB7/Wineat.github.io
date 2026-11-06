import React from 'react'

const FADE_DURATION = 450

export default function ThemeTransition({ type, onComplete }) {
  React.useEffect(() => {
    const timer = window.setTimeout(onComplete, FADE_DURATION)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`theme-transition theme-transition-${type}`} aria-hidden="true" />
  )
}
