import { useEffect, useRef } from 'react'

const Editor = () => {
  const pmEditor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('test')
  })

  return <div ref={pmEditor} />
}

export default Editor
