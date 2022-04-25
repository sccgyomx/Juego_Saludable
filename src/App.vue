<template>
  <div class="main">
    <div id="app">
      <nav>
        <h1>Quiz</h1>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #282a36;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f8f8f2;
    margin-left: auto;
    margin-right: auto;
    max-width: 720px;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #f8f8f2;
  }

  nav a.router-link-exact-active {
    color: #bd93f9;
  }
</style>
