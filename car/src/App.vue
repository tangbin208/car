<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <keep-alive include="car,quotation">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
// @import "./scss/global";
#app {
  width: 100%;
  height: 100%;
  display: flex;
}

button {
  outline: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0.6;
}
.leave-to {
  transform: translateX(-100%);
  opacity: 0.6;
}
</style>
