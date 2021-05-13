<template>
  <div>
    <span>
      Movie Id :{{$route.params.id}}
    </span>
  </div>  
</template>
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    components: {}
  })

  export default class MovieDetail extends Vue {

  }
  </script>
  