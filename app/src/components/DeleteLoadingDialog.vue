<template>
  <div>
    <q-dialog
      ref="dialogLoadingDelete"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card :dark="darkMode" :class="darkMode ? '' : 'bg-red-10'" class="text-white">
        <q-card-section class="text-center">
          <div class="text-h6 q-mt-md loading-dots"> Excluindo {{ object.nome }}
            <span>.</span><span>.</span><span>.</span>
          </div>
        </q-card-section>
        <q-card-section :class="darkMode ? '' : 'bg-red-10'" class="q-pt-none q-mb-md text-center">
          <q-spinner
            color="white"
            size="3em"
            :thickness="10"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import hasDarkMode from '../mixins/hasDarkMode'

export default {
  mixins: [ hasDarkMode ],
  props: {
    object: {
      default: function () {
        return {

        }
      }
    }
  },

  data () {
    return {
      dots: '.'
    }
  },

  methods: {
    show () {
      this.$refs.dialogLoadingDelete.show()
    },
    hide () {
      this.$refs.dialogLoadingDelete.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
<style>
  @keyframes blink {
    /**
     * At the start of the animation the dot
     * has an opacity of .2
     */
    0% {
      opacity: .2;
    }
    /**
     * At 20% the dot is fully visible and
     * then fades out slowly
     */
    20% {
      opacity: 1;
    }
    /**
     * Until it reaches an opacity of .2 and
     * the animation can start again
     */
    100% {
      opacity: .2;
    }
  }

  .loading-dots span {
    /**
     * Use the blink animation, which is defined above
     */
    animation-name: blink;
    /**
     * The animation should take 1.4 seconds
     */
    animation-duration: 1.4s;
    /**
     * It will repeat itself forever
     */
    animation-iteration-count: infinite;
    /**
     * This makes sure that the starting style (opacity: .2)
     * of the animation is applied before the animation starts.
     * Otherwise we would see a short flash or would have
     * to set the default styling of the dots to the same
     * as the animation. Same applies for the ending styles.
     */
    animation-fill-mode: both;
  }

  .loading-dots span:nth-child(2) {
    /**
     * Starts the animation of the third dot
     * with a delay of .2s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .2s;
  }

  .loading-dots span:nth-child(3) {
    /**
     * Starts the animation of the third dot
     * with a delay of .4s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .4s;
  }
</style>
