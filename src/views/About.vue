<template lang="pug">
  .container#about.pb-4
    h1.title.is-1.has-text-white About
    p Hey guys, I am
      a(href="https://ll931217.github.io", @mouseover="hoverSound()", @click="selectSound()")  ll931217
      | I am a full stack web developer currently based in Taiwan.
</template>
