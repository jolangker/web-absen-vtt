<template>
  <div
    class="
      px-6
      py-4
      bg-white
      flex
      justify-between
      items-center
      shadow
      border-l-8 border-blue-700
      rounded
    "
  >
    <h2 class="text-2xl font-medium">
      <slot name="title"></slot>
    </h2>
    <p class="font-orbitron font-medium text-6xl text-blue-400">
      <slot name="value"></slot>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
