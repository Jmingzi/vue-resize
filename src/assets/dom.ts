import { ref, onMounted, onUnmounted, reactive } from '@vue/composition-api'

let times = 1

export const useZoom = (e: any) => {
  e.preventDefault()
  times += e.wheelDelta / 1200

  if (times < 0.2) {
    times = 0.2
  }

  return Number(times.toFixed(2))
}

let resizeHandle: any = null
export const resizeThrottle = (cb: any) => () => {
  if (resizeHandle === null) {
    resizeHandle = setTimeout(() => {
      cb()
      resizeHandle = null
    }, 66)
  }
}

export const px2Number = (str: string) => Number(str.replace('px', ''))

export const useMove = (context: any) => {
  let startX = ref(0)
  let startY = ref(0)
  const boxPosition = reactive({
    left: '10px',
    top: '10px',
    width: '100px',
    height: '100px'
  })
  const isMoving = ref(false)
  let direction = ''

  let previousTop = 0
  let previousLeft = 0
  let previousWidth = 0
  let previousHeight = 0

  const mouseDown = (e: any, dir?: 'l' | 't' | 'r' | 'b' | 'rb' | 'bl' | 'lt' | 'tr') => {
    previousWidth = px2Number(boxPosition.width)
    previousHeight = px2Number(boxPosition.height)
    previousTop = px2Number(boxPosition.top)
    previousLeft = px2Number(boxPosition.left)

    startX.value = e.pageX
    startY.value = e.pageY
    isMoving.value = true
    if (dir) {
      const { top, left } = context.refs.box.getBoundingClientRect()
      direction = dir
      // 减去4条边的多余部分
      if (direction === 'b') {
        startX.value += top + previousHeight - e.pageY
      } else if (direction === 't') {
        startX.value -= e.pageY - top
      } else if (direction === 'r') {
        startY.value += left + previousWidth - e.pageX
      } else if (direction === 'l') {
        startY.value -= e.pageX - left
      }
    }
  }
  const mouseMove = (e: any) => {
    if (isMoving.value) {
      const diffX = e.pageX - startX.value
      const diffY = e.pageY - startY.value
      if (direction === 'b') {
        boxPosition.height = `${diffY + previousHeight}px`
      } else if (direction === 't') {
        boxPosition.height = `${previousHeight - diffY}px`
        boxPosition.top = `${previousTop + diffY}px`
      } else if (direction === 'r') {
        boxPosition.width = `${diffX + previousWidth}px`
      } else if (direction === 'l') {
        boxPosition.width = `${previousWidth - diffX}px`
        boxPosition.left = `${previousLeft + diffX}px`
      } else if (direction === 'rb') {
        boxPosition.width = `${diffX + previousWidth}px`
        boxPosition.height = `${diffY + previousHeight}px`
      } else if (direction === 'bl') {
        boxPosition.height = `${diffY + previousHeight}px`
        boxPosition.width = `${previousWidth - diffX}px`
        boxPosition.left = `${previousLeft + diffX}px`
      } else if (direction === 'lt') {
        boxPosition.width = `${previousWidth - diffX}px`
        boxPosition.left = `${previousLeft + diffX}px`
        boxPosition.height = `${previousHeight - diffY}px`
        boxPosition.top = `${previousTop + diffY}px`
      } else if (direction === 'tr') {
        boxPosition.width = `${diffX + previousWidth}px`
        boxPosition.height = `${previousHeight - diffY}px`
        boxPosition.top = `${previousTop + diffY}px`
      } else {
        boxPosition.left = `${diffX + previousLeft}px`
        boxPosition.top = `${diffY + previousTop}px`
      }
    }
  }
  const mouseUp = (e: any) => {
    isMoving.value = false
    direction = ''
  }

  onMounted(() => {
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
  })

  return {
    mouseDown,
    boxPosition,
    isMoving
  }
}
