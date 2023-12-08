import {useEffect} from 'react'

export function useBALWidget() {
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_BAL_WIDGET_URL) {
            return
        }
        const script = document.createElement('script')
        script.src = `${process.env.NEXT_PUBLIC_BAL_WIDGET_URL}/bal-widget.js`
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])
}
