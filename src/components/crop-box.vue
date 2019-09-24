<template>
  <div
    ref="box"
    class="crop-box"
    :style="boxPosition"
    @mousedown.stop="handleMoveBox"
  >
    <div class="crop-box__l" @mousedown.stop="e => handleMoveBox(e, 'l')">
      <div class="crop-box__dot"></div>
    </div>
    <div class="crop-box__t" @mousedown.stop="e => handleMoveBox(e, 't')">
      <div class="crop-box__dot"></div>
    </div>
    <div class="crop-box__r" @mousedown.stop="e => handleMoveBox(e, 'r')">
      <div class="crop-box__dot"></div>
    </div>
    <div class="crop-box__b" @mousedown.stop="e => handleMoveBox(e, 'b')">
      <div class="crop-box__dot"></div>
    </div>

    <div class="crop-box__dot--lt" @mousedown.stop="e => handleMoveBox(e, 'lt')"></div>
    <div class="crop-box__dot--tr" @mousedown.stop="e => handleMoveBox(e, 'tr')"></div>
    <div class="crop-box__dot--rb" @mousedown.stop="e => handleMoveBox(e, 'rb')"></div>
    <div class="crop-box__dot--bl" @mousedown.stop="e => handleMoveBox(e, 'bl')"></div>

    <template v-if="isMoving">
      <div class="crop-box__moving-text">
        <span>{{ boxPosition.width }}*{{ boxPosition.height }}</span>
      </div>

      <div class="crop-box__moving-text--b">
        {{ text.bottom }}
      </div>
      <div class="crop-box__moving-text--r">
        {{ text.right }}
      </div>
      <div class="crop-box__moving-text--l">
        {{ boxPosition.left }}
      </div>
      <div class="crop-box__moving-text--t">
        {{ boxPosition.top }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { useMove, px2Number } from '../assets/dom'

export default createComponent({
  setup (props, context) {
    const { mouseDown, boxPosition, isMoving } = useMove(context)
    const text = computed(() => ({
      bottom: 667 - px2Number(boxPosition.height) - px2Number(boxPosition.top),
      right: 375 - px2Number(boxPosition.width) - px2Number(boxPosition.left)
    }))

    return {
      handleMoveBox: mouseDown,
      boxPosition,
      isMoving,
      text
    }
  }
})
</script>

<style lang="less">
.crop-box {
  position: absolute;

  &__moving-text {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    &--l,
    &--t,
    &--r,
    &--b {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 20px;
      font-size: 10px;
      position: absolute;
      background-color: rgba(0, 0, 0, .5);
      color: #fff;
    }
    &--l {
      left: -35px;
      top: 50%;
      transform: translateY(-50%);
    }
    &--t {
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
    }
    &--b {
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
    }
    &--r {
      right: -35px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__t,
  &__b {
    position: absolute;
    width: 100%;
    height: 5px;
    cursor: ns-resize;
  }

  &__l,
  &__r {
    position: absolute;
    width: 5px;
    height: 100%;
    cursor: ew-resize;
  }

  &__dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #fff;
    border: 1px #4DAEFF solid;

    &--lt,
    &--tr,
    &--rb,
    &--bl {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: #fff;
      border: 1px #4DAEFF solid;
    }

    &--lt {
      left: -4px;
      top: -4px;
      cursor: nwse-resize;
    }
    &--tr {
      right: -4px;
      top: -4px;
      cursor: nesw-resize;
    }
    &--rb {
      right: -4px;
      bottom: -4px;
      cursor: nwse-resize;
    }
    &--bl {
      left: -4px;
      bottom: -4px;
      cursor: nesw-resize;
    }
  }

  &__l {
    left: 0;
    border-left: 1px #4DAEFF solid;
    .crop-box__dot {
      top: 50%;
      margin-top: -5px;
      left: -6px;
    }
  }

  &__t {
    top: 0;
    border-top: 1px #4DAEFF solid;
    .crop-box__dot {
      left: 50%;
      margin-left: -5px;
      top: -6px;
    }
  }

  &__r {
    right: 0;
    border-right: 1px #4DAEFF solid;
    .crop-box__dot {
      top: 50%;
      margin-top: -5px;
      right: -6px;
    }
  }

  &__b {
    bottom: 0;
    border-bottom: 1px #4DAEFF solid;
    .crop-box__dot {
      left: 50%;
      margin-left: -5px;
      bottom: -6px;
    }
  }
}
</style>
