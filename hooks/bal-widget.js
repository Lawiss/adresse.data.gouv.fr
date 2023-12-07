import {useEffect, useRef} from 'react'

const BAL_WIDGET_URL = process.env.NEXT_PUBLIC_BAL_WIDGET_URL

export function useBALWidget(config) {
    const router = useRouter()
    const balWidgetRootElement = useRef(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `${BAL_WIDGET_URL}/bal-widget.js`
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
            balWidgetRootElement.current = document.getElementById('bal-widget')
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [config])
}
