const handleTakeScreenshot = () => {
    if (!image) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const imageElement = new Image()
    imageElement.src = image
    imageElement.crossOrigin = 'anonymous'
    imageElement.onload = () => {
        canvas.width = imageElement.width
        canvas.height = imageElement.height
        ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height)
        const data = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = 'screenshot.png'
        link.href = data
        link.click()
    }
}