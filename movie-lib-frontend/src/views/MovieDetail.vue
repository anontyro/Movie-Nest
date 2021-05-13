<template>
  <div>
    <span>
      Movie Id :{{$route.params.id}}
    </span>
    <span>
      Movie Name: {{movieDetails.title}}
    </span>
    <span>
      IMDB ID: {{movieDetails.imdbId}}
    </span>
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
  