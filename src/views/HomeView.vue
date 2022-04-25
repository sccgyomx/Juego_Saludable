<template>
  <div class="home">
    <div v-if="visible">
      <div class="puntuacion">
        <label>Puntuacion: {{ score }} </label>
        <label>Puntuacion Maxima: {{ maxScore }} </label>
      </div>
      <div class="tiempo">
        <label>Tiempo restante: {{ timer }}</label>
      </div>
      <div class="pregunta">
        <label for="">{{ itemQuiz[item].pregunta }}</label>
        <button
          class="button-respuesta"
          @click="validarRespuesta(item, itemQuiz[item].respuesta1)"
        >
          {{ itemQuiz[item].respuesta1 }}
        </button>
        <button
          class="button-respuesta"
          @click="validarRespuesta(item, itemQuiz[item].respuesta2)"
        >
          {{ itemQuiz[item].respuesta2 }}
        </button>
        <button
          class="button-respuesta"
          @click="validarRespuesta(item, itemQuiz[item].respuesta3)"
        >
          {{ itemQuiz[item].respuesta3 }}
        </button>
        <button
          class="button-respuesta"
          @click="validarRespuesta(item, itemQuiz[item].respuesta4)"
        >
          {{ itemQuiz[item].respuesta4 }}
        </button>
      </div>
      <button class="button-stop" @click="Parar">Parar</button>
    </div>
    <div v-else>
      <button class="button-start" @click="Iniciar">Iniciar</button>
      <component v-bind:is="componente"></component>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  import cargando_componentes from "@/components/Cargando.vue";

  import { db } from "../database";

  export default {
    name: "HomeView",
    components: {
      //HelloWorld
      cargando_componentes,
    },
    data() {
      return {
        componente: "cargando_componentes",
        preguntas: [],
        itemQuiz: [],
        score: 0,
        maxScore: "",
        visible: false,
        timer: 0,
        item: 0,
      };
    },
    watch: {
      timer: {
        handler(value) {
          if (value > 0) {
            setTimeout(() => {
              this.timer--;
            }, 1000);
          }
          if (value === 0) {
            this.Parar();
          }
        },
        immediate: true, // This ensures the watcher is triggered upon creation
      },
    },
    methods: {
      Iniciar() {
        this.visible = true;
        this.timer = 15;
      },
      Parar() {
        this.visible = false;
        this.item = 0;
        this.score = 0;
        this.persist();
      },
      validarRespuesta(index, respuesta) {
        if (this.preguntas[index].correcta === respuesta) {
          this.score += 1;
        }
        this.item += 1;
        this.timer = 15;
        this.comprobarScore();
      },
      comprobarScore() {
        if (this.maxScore < this.score) {
          this.maxScore = this.score;
        }
      },
      cargarPreguntas() {
        db.collection("preguntas").onSnapshot((snapshotChange) => {
          this.preguntas = [];
          this.itemQuiz = [];
          snapshotChange.forEach((doc) => {
            this.preguntas.push({
              key: doc.id,
              pregunta: doc.data().pregunta,
              correcta: doc.data().correcta,
            });
            const random = Math.floor(Math.random() * 4);
            if (random === 0) {
              this.itemQuiz.push({
                key: doc.id,
                pregunta: doc.data().pregunta,
                respuesta1: doc.data().correcta,
                respuesta2: doc.data().incorrecta1,
                respuesta3: doc.data().incorrecta2,
                respuesta4: doc.data().incorrecta3,
              });
            }
            if (random === 1) {
              this.itemQuiz.push({
                key: doc.id,
                pregunta: doc.data().pregunta,
                respuesta1: doc.data().incorrecta1,
                respuesta2: doc.data().correcta,
                respuesta3: doc.data().incorrecta2,
                respuesta4: doc.data().incorrecta3,
              });
            }
            if (random === 2) {
              this.itemQuiz.push({
                key: doc.id,
                pregunta: doc.data().pregunta,
                respuesta1: doc.data().incorrecta1,
                respuesta2: doc.data().incorrecta2,
                respuesta3: doc.data().correcta,
                respuesta4: doc.data().incorrecta3,
              });
            }
            if (random === 3) {
              this.itemQuiz.push({
                key: doc.id,
                pregunta: doc.data().pregunta,
                respuesta1: doc.data().incorrecta1,
                respuesta2: doc.data().incorrecta2,
                respuesta3: doc.data().incorrecta3,
                respuesta4: doc.data().correcta,
              });
            }
          });
        });
      },
      persist() {
        if (this.maxScore > localStorage.maxScore) {
          localStorage.maxScore = this.maxScore;
        }
      },
    },
    created() {
      this.cargarPreguntas();
    },
    mounted() {
      if (localStorage.maxScore) {
        this.maxScore = localStorage.maxScore;
      }
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
  .puntuacion {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .tiempo {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  /* From uiverse.io by @nikk7007 */
  .button-start {
    --color: #50fa7b;
    padding: 0.8em 1.7em;
    background-color: transparent;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    font-weight: 400;
    font-size: 17px;
    border: 1px solid;
    font-family: inherit;
    text-transform: uppercase;
    color: var(--color);
    z-index: 1;
  }

  .button-start::before,
  .button-start::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    background-color: var(--color);
    transition: 1s ease;
  }

  .button-start::before {
    top: -1em;
    left: -1em;
  }

  .button-start::after {
    left: calc(100% + 1em);
    top: calc(100% + 1em);
  }

  .button-start:hover::before,
  .button-start:hover::after {
    height: 410px;
    width: 410px;
  }

  .button-start:hover {
    color: #44475a;
  }

  .button-start:active {
    filter: brightness(0.8);
  }

  .button-stop {
    --color: #ff5555;
    padding: 0.8em 1.7em;
    background-color: transparent;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    font-weight: 400;
    font-size: 17px;
    border: 1px solid;
    font-family: inherit;
    text-transform: uppercase;
    color: var(--color);
    z-index: 1;
  }

  .button-stop::before,
  .button-stop::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    background-color: var(--color);
    transition: 1s ease;
  }

  .button-stop::before {
    top: -1em;
    left: -1em;
  }

  .button-stop::after {
    left: calc(100% + 1em);
    top: calc(100% + 1em);
  }

  .button-stop:hover::before,
  .button-stop:hover::after {
    height: 410px;
    width: 410px;
  }

  .button-stop:hover {
    color: #44475a;
  }

  .button-stop:active {
    filter: brightness(0.8);
  }
  .pregunta {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 17px;
    font-family: inherit;
    text-transform: uppercase;
  }

  .button-respuesta {
    --color: #ff79c6;
    padding: 0.8em 1.7em;
    background-color: transparent;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    font-weight: 400;
    font-size: 17px;
    border: 1px solid;
    font-family: inherit;
    text-transform: uppercase;
    color: var(--color);
    z-index: 1;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .button-respuesta::before,
  .button-respuesta::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    background-color: var(--color);
    transition: 1s ease;
  }

  .button-respuesta::before {
    top: -1em;
    left: -1em;
  }

  .button-respuesta::after {
    left: calc(100% + 1em);
    top: calc(100% + 1em);
  }

  .button-respuesta:hover::before,
  .button-respuesta:hover::after {
    height: 410px;
    width: 810px;
  }

  .button-respuesta:hover {
    color: #f8f8f2;
  }

  .button-respuesta:active {
    filter: brightness(0.8);
  }
</style>
