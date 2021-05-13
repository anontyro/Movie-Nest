const API_BASE = '/api';
const MOVIE_BASE = '/movie';
export const MOVIE_ROUTES = {
  NOW_PLAYING: '/now-playing',
  POPULAR: '/popular',
  MOVIE_DETAIL: '/:id',
};

interface UrlParam {
  name: string;
  value: any;
}

export const buildRoute = (routeBase: string = MOVIE_BASE) => (
  route: string,
  params: UrlParam[] = [],
): string | null => {
  switch (routeBase) {
    case MOVIE_BASE:
      return getMovieRoute(route, params);
    default:
      return null;
  }
};

const getMovieRoute = (route: string, params: UrlParam[]): string | null => {
  const routeSplit = route.split(':');
  let output = route;
  if (routeSplit.length > 1) {
    output = '';
    routeSplit.forEach((r) => {
      const param = params.find((p) => r.includes(p.name));
      if (param) {
        r = r.replace(param.name, param.value);
      }
      output += r;
    });
  }
  let uri = `${API_BASE}${MOVIE_BASE}${output}`;
  return uri;
};
