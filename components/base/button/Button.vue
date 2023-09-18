<template>
  <button
    class="inline-flex button"
    :type="type"
    :class="computedClass"
    :disabled="isDisabled || isLoading"
    @click="onButtonClick"
  >
    <!-- @slot Custom loading content, otherwise a spinner. Loading replaces prefix -->
    <slot v-if="isLoading" name="loading">
      <Icon name="svg-spinners:180-ring-with-bg" class="mr-1" />
    </slot>

    <span v-else-if="hasPrefix" class="icon-prefix">
      <slot name="prefix">
        <template v-if="prefixText">{{ prefixText }}</template>

        <Icon v-else-if="prefixIcon" :name="prefixIcon" />
      </slot>
    </span>

    <!-- @slot Used for the button label -->
    <span class="capitalize-first-letter">
      <slot>click me</slot>
    </span>

    <span v-if="hasSuffix" class="icon-suffix">
      <slot name="suffix">
        <template v-if="suffixText">{{ suffixText }}</template>

        <Icon v-else-if="suffixIcon" :name="suffixIcon" class="suffix-icon" />
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
const slots = useSlots()
const router = useRouter()

const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  type?: 'button' | 'submit' | 'reset'
  priority?: 'default' | 'important' | 'purple' | 'caution' | 'transparent'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  to?: string
  isLoading?: boolean
  isDisabled?: boolean
  prefixIcon?: string
  // prefixText overrides prefixIcon
  prefixText?: string
  suffixIcon?: string
  // suffixText overrides suffixIcon
  suffixText?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  priority: 'default',
  size: 'md',
  to: undefined,
  isLoading: false,
  isDisabled: false,
})

const hasPrefix = computed(() => !!props.prefixIcon || !!props.prefixText || !!slots.prefix)
const hasSuffix = computed(() => !!props.suffixIcon || !!props.suffixText || !!slots.suffix)

const computedClass = computed(() => {
  return [
    {
      [props.priority]: true,
      [props.size]: true,
      loading: props.isLoading,
      disabled: props.isDisabled || props.isLoading,
    },
    'text-white',
  ]
})

function onButtonClick() {
  emit('click')

  if (props.to) {
    if (props.to.includes('http')) {
      window.open(props.to, '_blank')
    } else {
      router.push(props.to)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  @apply select-none items-center justify-center border border-transparent font-medium shadow-sm;
  transition:
    filter 0.2s linear,
    background-color 0.2s linear;
  &:not(.xs) {
    @apply rounded;
  }
}

.button.xs {
  @apply rounded-md px-2 py-1 text-xs leading-3;

  & .icon-prefix {
    @apply -ml-0.5 mr-1;
  }

  & .icon-suffix {
    @apply ml-1 -mr-0.5;
  }
}

.button.sm {
  @apply px-2.5 py-1.5 text-sm leading-4;

  & .icon-prefix {
    @apply -ml-0.5 mr-2;
  }

  & .icon-suffix {
    @apply ml-2 -mr-0.5;
  }
}

.button.md {
  @apply px-4 py-2 text-sm;

  & .icon-prefix {
    @apply mr-2 -ml-1;
  }

  & .icon-suffix {
    @apply ml-2 -mr-1;
  }
}

.button.lg {
  @apply px-4 py-2;

  & .icon-prefix {
    @apply mr-3 -ml-1;
  }

  & .icon-suffix {
    @apply ml-3 -mr-1;
  }
}

.button.xl {
  @apply px-6 py-3;

  & .icon-prefix {
    @apply mr-3 -ml-1;
  }

  & .icon-suffix {
    @apply ml-3 -mr-1;
  }
}

.button.purple:not(.disabled):hover {
  filter: brightness(95%);
}

.button.disabled:not(:focus) {
  cursor: not-allowed;
}

.button.default {
  @apply bg-gray-600 text-white hover:bg-gray-700 hover:text-yellow-100;
}

.button.default .suffix-icon {
  @apply text-gray-600;
}

.button.important {
  @apply bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-900;
}

.button.important .suffix-icon {
  @apply text-white;
}

.button.caution {
  @apply bg-none text-red-600 shadow-none hover:bg-red-100 focus:ring-red-200;
}

.button.caution .suffix-icon {
  @apply text-red-500;
}

.button.caution-solid {
  @apply bg-red-600 text-white hover:bg-red-100 focus:ring-red-200;
}

.button.caution-solid .suffix-icon {
  @apply text-white;
}

.button.selected {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-700;
}

.button.selected .suffix-icon {
  @apply text-white;
}

.button.disabled {
  @apply cursor-default border-gray-400 text-gray-400 #{!important};
  background-color: #f8fafc !important;
}

.button.disabled .suffix-icon {
  @apply text-gray-400;
}

.button.caution.disabled,
.button.transparent.disabled {
  @apply border-transparent;
  background-color: transparent !important;
}

.button.transparent {
  @apply border-transparent bg-none shadow-none;
}
</style>
