<template>
  <div class="home">
    <FullWidthCarousel v-bind:movies="nowPlaying" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from '../store';
import * as MovieActionTypes from '../store/movies/action-types';
import FullWidthCarousel from '../components/carousel/FullWidthCarousel.vue';

import 'vue3-carousel/dist/carousel.css';
import { MovieItem } from '../@types';

@Options({
  components: {
    FullWidthCarousel,
  },
})

export default class Home extends Vue {
  store = useStore();
  
  mounted(){
    this.fetchNowPlayingMovies();
    this.fetchPopularMovies();
  }

  fetchNowPlayingMovies = async() => {
      try {
        await this.store.dispatch(MovieActionTypes.FETCH_CURRENTLY_PLAYING, 1);
      } catch(err){
        console.error('fetch now playing', err);
      }
  };

  fetchPopularMovies = async() => {
    await this.store.dispatch(MovieActionTypes.FETCH_POPULAR_MOVIES, 1);
  };

  get nowPlaying(): MovieItem[] {
    return this.store.getters.getCurrentlyPlayingMovies ?? [];
  }

  get popularMovies(): MovieItem[]{
    return this.store.getters.getPopularMovies ?? [];
  }

  
}
</script>
<style lang="scss" scoped>
  .slide-item-container{
    width: 100%;
    height: 30rem;
    position: relative;
    .slide-item-img{
      height: 100%;
      width: 100%;
      background-size: cover;
      .slide-title{
        position: absolute;
        bottom: 0;
        color: white;
        left: 0;
        right: 0;
        font-size: 2rem;
        padding: 1rem;
        font-family: sans-serif;
        background-color: rgba(0, 0, 0, 0.57);
      }
    }
  }
</style>