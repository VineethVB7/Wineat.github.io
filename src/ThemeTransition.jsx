import React from 'react'

const SWITCH_AT = 720
const COMPLETE_AT = 1900

export default function ThemeTransition({ type, onSwitch, onComplete }) {
  React.useEffect(() => {
    const switchTimer = window.setTimeout(onSwitch, SWITCH_AT)
    const completeTimer = window.setTimeout(onComplete, COMPLETE_AT)

    return () => {
      window.clearTimeout(switchTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onSwitch, onComplete])

  return (
    <div className={`theme-transition theme-transition-${type}`} aria-hidden="true">
      <div className="zipper-panel zipper-panel-a" />
      <div className="zipper-panel zipper-panel-b" />
      <div className="zipper-edge zipper-edge-a" />
      <div className="zipper-edge zipper-edge-b" />
      <div className="zipper-teeth" />
    </div>
  )
}
