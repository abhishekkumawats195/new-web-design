import React from 'react'

interface SimpleThreeJSProps {
  onActiveChange: (index: number, bgColor: string, title: string) => void
}

const SimpleThreeJS: React.FC<SimpleThreeJSProps> = ({ onActiveChange }) => {
  return <div>Simple Three JS Component</div>
}

export default SimpleThreeJS