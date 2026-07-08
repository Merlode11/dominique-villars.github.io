const leftButton = document.querySelector('#hautes-alpes .body .slideshow .select.left')
const rightButton = document.querySelector('#hautes-alpes .body .slideshow .select.right')
const slideshow = document.querySelector('#hautes-alpes .body .slideshow')
const videosContainer = document.querySelector('#hautes-alpes .body .slideshow .videos')

const videos = document.querySelectorAll('#hautes-alpes .body .slideshow .videos .video-container')
let index = 0

const pagination = document.createElement('div')
pagination.className = 'pagination'

const dots = Array.from(videos, (_, dotIndex) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'pagination-dot'
    dot.setAttribute('aria-label', `Aller à la vidéo ${dotIndex + 1}`)
    dot.addEventListener('click', () => setActiveVideo(dotIndex))
    pagination.appendChild(dot)
    return dot
})

slideshow.appendChild(pagination)

let touchStartX = 0
let touchEndX = 0

function updateControls() {
    leftButton.disabled = index === 0
    rightButton.disabled = index === videos.length - 1

    leftButton.setAttribute('aria-disabled', String(leftButton.disabled))
    rightButton.setAttribute('aria-disabled', String(rightButton.disabled))

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index)
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false')
    })
}

function next() {
    return index < videos.length - 1 ? index + 1 : index
}

function previous() {
    return index > 0 ? index - 1 : index
}

function setActiveVideo(newIndex) {
    const oldVideo = videos[index]
    const newVideo = videos[newIndex]

    switch (newIndex - index) {
        case 1:
            oldVideo.style.transform = 'translateX(-100px)'
            break
        case -1:
            oldVideo.style.transform = 'translateX(100px)'
            break
    }

    oldVideo.style.opacity = '0'
    oldVideo.style.zIndex = '-1'
    newVideo.style.opacity = '100%'
    newVideo.style.zIndex = '1'
    newVideo.style.transform = 'translateX(0)'

    index = newIndex
    updateControls()
}

leftButton.onclick = () => setActiveVideo(previous())
rightButton.onclick = () => setActiveVideo(next())

videosContainer.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX
}, { passive: true })

videosContainer.addEventListener('touchend', event => {
    touchEndX = event.changedTouches[0].screenX
    const deltaX = touchEndX - touchStartX

    if (Math.abs(deltaX) < 40) return

    if (deltaX < 0) {
        setActiveVideo(next())
    } else {
        setActiveVideo(previous())
    }
}, { passive: true })

updateControls()
