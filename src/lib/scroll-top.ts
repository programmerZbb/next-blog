export const scrollTop = (params?: {
    target?: HTMLElement,
}) => {
    const { target } = params || {}

    const sTop = target ? target.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop)
    if (sTop > 0) {
        requestAnimationFrame(() => scrollTop({target}))
        let node = target ?? window
        node.scrollTo(0, sTop - sTop / 8)
    }
}
