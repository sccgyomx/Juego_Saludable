<template>
  <div class="load-container">
    <h3>Cargando...</h3>
    <div class="ripple-loader">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cargando_componentes",
  };
</script>

<style>
  .load-container {
    text-align: -webkit-center;
    margin-top: 25px;
  }
  .ripple-loader {
    position: relative;
    width: 64px;
    height: 64px;
    display: block;
    margin: auto;
  }

  .ripple-loader div {
    position: absolute;
    border: 4px solid #8be9fd;
    border-radius: 50%;
    animation: ripple-loader 1s ease-out infinite;
  }

  .ripple-loader div:nth-child(2) {
    animation-delay: -0.7s;
  }

  @keyframes ripple-loader {
    0% {
      top: 32px;
      left: 32px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 64px;
      height: 64px;
      opacity: 0;
    }
  }
</style>
