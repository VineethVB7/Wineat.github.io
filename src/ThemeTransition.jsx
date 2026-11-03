import React from 'react'

export default function ThemeTransition({ type, onComplete }) {
  React.useEffect(() => {
    const timer = window.setTimeout(onComplete, 1900)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`theme-transition theme-transition-${type}`} aria-hidden="true">
      <div className="transition-atmosphere" />
      <div className="transition-glow transition-glow-one" />
      <div className="transition-glow transition-glow-two" />
      <div className="transition-sweep" />
      <div className="transition-grain" />
    </div>
  )
}
