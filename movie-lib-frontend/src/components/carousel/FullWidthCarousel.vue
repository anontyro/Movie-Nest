<template>
    <Carousel :autoplay="4000" :wrap-around="true">
    <slide v-for="movie in movies" :key="movie.id">
      <router-link class="slider-link" :to="{name: 'MovieDetails', params: {id: movie.id}}">
      <div class="slide-item-container">
        <div class="slide-item-img" :style="{ backgroundImage: `url(${createBgImg(movie)})`}">
          <div class="slide-title">
            {{ movie.title }} ({{movie.averageRating}})
          </div> 
        </div>
      </div>
      </router-link>
    </slide>
    <template #addons>
      <pagination />
    </template>
  </Carousel>
</template>

<script lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { Options, Vue, prop } from 'vue-class-component';
import { MovieItem } from '../../@types';

class Props {
  movies = prop<MovieItem[]>({default: []})
}

@Options({
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
})
export default class FullWidthCarousel extends Vue.with(Props) {
  mounted(){
    this.movies;
  }
  
  createBgImg = (movie: MovieItem): string => {
    const baseUrl = `https://image.tmdb.org/t/p/original${movie.backdropPath ?? movie.posterPath}`;
    return baseUrl;
  }

}

</script>
<style lang="scss" scoped>
  .slider-link{
    width: 100%;
    height: 100%;
  }
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