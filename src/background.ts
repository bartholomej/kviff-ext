import { csfd } from 'node-csfd-api';
import { CSFDMovie } from 'node-csfd-api/types/interfaces/movie.interface';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.contentScriptQuery) {
    case 'getSearchMovie':
      csfd
        .search(request.searchQuery)
        .then((response) => {
          const movie = response.movies[0] || null;
          if (movie) {
            fetchMovie(movie.id, sendResponse);
          } else {
            sendResponse(null);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
      return true;
    case 'getMovie':
      fetchMovie(request.csfdId, sendResponse);
      return true;
    default:
      return false;
  }
});

const fetchMovie = async (id: number, sendResponse: any): Promise<CSFDMovie> => {
  try {
    const res = await csfd.movie(id);
    return sendResponse(res);
  } catch (error: any) {
    throw new Error(error);
  }
};
