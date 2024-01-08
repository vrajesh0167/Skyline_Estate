import React, { useEffect } from 'react'

export default function About(props) {
  const setProgress = props.setProgress
  
  useEffect(() => {
    setProgress(10)
    setTimeout(() => {
      setProgress(100)
    }, 500)
  }, [])

  return (
    <div>About</div>
  )
}
