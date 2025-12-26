import { useState, useCallback } from 'react'

const bgColors = ['#e0c08d', '#8ea35d', '#d16a5e', '#5d8ea3', '#a38d5d', '#c08de0', '#8d5da3', '#5de08d']
const titles = ['Asolo Prosecco', 'Serprino', 'Taverna Kus', 'Podcast Co', 'Modern Studio', 'Creative Lab', 'Digital Art', 'Brand Design']

export function useSnapScroll() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(bgColors[0])
  const [title, setTitle] = useState(titles[0])

  const handleActiveChange = useCallback((index: number, bgColor: string, titleText: string) => {
    setActiveIndex(index)
    setBackgroundColor(bgColor)
    setTitle(titleText)
  }, [])

  return {
    activeIndex,
    backgroundColor,
    title,
    handleActiveChange
  }
}