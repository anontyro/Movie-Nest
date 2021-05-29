<template>
  <div class="movie-detail-container">
    <div class="movie-header">
      <div class="movie-banner" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdropPath})`}">

        <div class="movie-item" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.posterPath})` }">

        </div>
      </div>
      <div class="movie-name">
        <div class="movie-title">
          {{movieDetails.title}}
        </div>
        </div>
    </div>
    <div class="movie-body">
      <div class="movie-details">{{movieDetails.details}}</div>
    </div>
  </div>    
</template>

  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { MovieDetails } from '../@types';
  import { useStore } from '../store';
  import * as MovieActionTypes from '../store/movies/action-types';
  
  @Options({
    components: {}
  })

  export default class MovieDetail extends Vue {
    store = useStore();
    movieId: any = null;

    mounted(){
      this.movieId = this.$route.params.id;
      this.fetchCurrentMovieDetails(this.movieId);
    }

    fetchCurrentMovieDetails = async(id: string) => {
      await this.store.dispatch(MovieActionTypes.FETCH_SELECTED_MOVIE_DETAILS, id)
    }

    get isLoading(): boolean {
      return this.store.getters.getMovieLoadState;
    }

    get movieDetails(): Partial<MovieDetails> {
      return this.store.getters.getMovieDetailOrPartial(+this.$route.params.id) ?? {};
    }

  }
  </script>
  
  <style lang="scss" scoped>
    .movie-header{
      display: flex;
      flex-direction: column;
      height: 400px;
      .movie-banner{
        position: relative;
        width: 100%;
        height: 300px;
        background-size: cover;
        background-repeat: no-repeat;
        .movie-item{
          width: 100px;
          height: 150px;
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          bottom: -40px;
          left: 20px;
          border-radius: 10px;
          box-shadow: 1px 1px 11px 5px #b60302;
        }
      }
      .movie-name{
        display: flex;
        height: 50px;
        background-color: #b50101;
        .movie-title{
          font-family: sans-serif;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
          margin: auto;
        }
      }

    }
  </style>