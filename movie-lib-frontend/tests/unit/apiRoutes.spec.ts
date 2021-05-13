import { buildRoute, MOVIE_ROUTES } from '../../src/utils/apiRoutes';

describe('buildRoute ', () => {
  let movieRoute: (route: string, param?: any) => string | null;

  beforeAll(() => {
    movieRoute = buildRoute();
  });

  it('basic routes work as expected', () => {
    const popular = movieRoute(MOVIE_ROUTES.POPULAR);
    const nowPlaying = movieRoute(MOVIE_ROUTES.NOW_PLAYING);

    expect(popular).toBe('/api/movie/popular');
    expect(nowPlaying).toBe('/api/movie/now-playing');
  });

  it('will replace dynamic params that use colon', () => {
    const movieParam = { name: 'id', value: 123555 };
    const movieDetail = movieRoute(MOVIE_ROUTES.MOVIE_DETAIL, [movieParam]);

    expect(movieDetail).toBe(`/api/movie/${movieParam.value}`);
  });

  it('will replace more complex dynamic params', () => {
    const movieParam = [
      { name: 'id', value: 123567 },
      { name: 'user', value: 'sam' },
    ];

    const route = '/some/:id/more/:user';
    const movieTest = movieRoute(route, movieParam);

    expect(movieTest).toBe(
      `/api/movie/some/${movieParam[0].value}/more/${movieParam[1].value}`,
    );
  });
});
