<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click.prevent="fetchNowPlayingMovies()" >Get Now Playing</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { useStore } from '../store';
import * as MovieActionTypes from '../store/movies/action-types';


@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // fetchNowPlayingMovies = setup(() => fetchSetup());
  store = useStore();

  fetchNowPlayingMovies = async() => {
      try {
        await this.store.dispatch(MovieActionTypes.FETCH_CURRENTLY_PLAYING, 1);
      } catch(err){
        console.error('fetch now playing', err);
      }
  };
}
</script>
