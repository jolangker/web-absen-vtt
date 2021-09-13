<template>
  <router-view />
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  /* height: 16px; */
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #93c5fd;
  border-radius: 100vh;
  /* border: 3px solid #edf2f7; */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}
</style>
