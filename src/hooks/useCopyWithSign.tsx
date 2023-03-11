import { useEffect, useCallback } from 'react'

export const useCopyWithSign = () => {
  const copyAction = useCallback((ev: ClipboardEvent) => {
    const { clipboardData } = ev
    if (clipboardData != null) {
      const text = window.getSelection()?.toString();
      if (text != null && /\n/.test(text)) {
        ev.preventDefault()
        ev.clipboardData?.setData('text/plain', text + '\n\n作者: programmerzbb\n链接: ' + window.location.href)
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('copy', copyAction)

    return () => {
      document.removeEventListener('copy', copyAction)
    }
  }, [])
}
