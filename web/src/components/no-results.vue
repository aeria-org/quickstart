<template>
  <div
    class="
      self-center
      flex
      flex-col
      items-center
    "
  >
    <img
      src="/empty.svg"
      class="
        h-[30vw]
        lg:h-[14rem]
      "
    >
    <div
      class="
        flex
        flex-col
        items-center
        gap-8
        font-[300]
        text-gray-500
        dark:text-gray-200
      "
    >
      {{ t('no_results', { capitalize: true }) }}

      <slot />
    </div>
  </div>
</template>

