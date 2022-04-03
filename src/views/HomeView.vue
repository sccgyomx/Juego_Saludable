<template>
  <div class="home">
    <div class="form-list-container">
      <ul class="form-list">
        <li class="form-list-item">
          <p>Para cargar el componente 1</p>
          <a v-on:click="componente = 'componente1'" class="hover-botton">
            Precione aquí.
          </a>
        </li>
        <li class="form-list-item">
          <p>Para cargar el componente 2</p>
          <a v-on:click="componente = 'componente2'" class="hover-botton">
            Precione aquí.
          </a>
        </li>
        <li class="form-list-item">
          <p>Para limpiar</p>
          <a
            v-on:click="componente = 'cargando_componentes'"
            class="hover-botton"
          >
            Precione aquí.
          </a>
        </li>
      </ul>
    </div>
    <component v-bind:is="componente"></component>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  import componente1 from "@/components/componenteUno.vue";
  import componente2 from "@/components/componenteDos.vue";
  import cargando_componentes from "@/components/Cargando.vue";

  export default {
    name: "HomeView",
    components: {
      //HelloWorld
      cargando_componentes,
      componente1,
      componente2,
    },
    data() {
      return {
        componente: "cargando_componentes",
      };
    },
  };
</script>
<style>
  .home {
    margin: auto;
    max-width: 720px;
    background-color: #44475a;
    color: #f8f8f2;
    border-radius: 0.5rem;
    margin: 1.75rem 0.875rem 1rem;
    padding: 2rem 1.5rem;
  }
  .form-list-container {
    display: flex;
    justify-content: space-around;
  }
  .form-list {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
  }
  .form-list-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0.4em;
  }
  .form-list-item p {
    text-align: left;
    margin: 0.4em;
    justify-content: space-between;
  }
  .form-list li a {
    width: 200px;
    position: relative;
    display: block;
    border: 2px solid #6272a4;
    text-align: center;
    border-radius: 1rem;
    padding: 2px 2px;
    z-index: 0;
  }

  li a:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    border-radius: 1rem;
    background-color: #6272a4;
    z-index: -1;
    transform: scale(0);
    transition: transform 0.5s ease-in-out;
  }
  li a:hover:before,
  li a:focus:before {
    transform: scale(1);
  }

  @media only screen and (max-width: 700px) {
    .form-list-item {
      position: relative;
      display: flow-root;
      margin: 0.4em;
    }
  }
</style>
