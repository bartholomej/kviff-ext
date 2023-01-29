import { render } from "solid-js/web";
import { getCsfdId, getCsfdLink, getPageArtefacts, insertAfter } from "./utils";
import { CSFDMovie } from "node-csfd-api/types/interfaces/movie.interface";
import Button from "./Button";
import { CATALOG_URLS } from "./vars";
import {
  getButtonRootElementsKviff,
  getMovieAndYearKviff,
} from "./kviff/utils";

const renderButton = (movie: CSFDMovie): void => {
  const { root, placingNode } = getButtonRootElementsKviff();
  if (root && placingNode) {
    insertAfter(placingNode, root);
    render(() => <Button {...movie} />, root);
  }
};

const getMovieAndRender = (csfdId: string): void => {
  chrome.runtime.sendMessage(
    { contentScriptQuery: "getMovie", csfdId },
    (movie: CSFDMovie) => renderButton(movie)
  );
};

const searchMovieAndRender = (
  movieName: string | null,
  year: string | null
): void => {
  const searchQuery = `${movieName} ${year}`;
  console.log("CSFD search", searchQuery);
  chrome.runtime.sendMessage(
    { contentScriptQuery: "getSearchMovie", searchQuery },
    (movie: CSFDMovie) => renderButton(movie)
  );
};

// Check if we are on the right page
const { domain, page } = getPageArtefacts();

if (
  domain.includes(CATALOG_URLS.kviff.domain) &&
  page === CATALOG_URLS.kviff.page
) {
  const csfdLink = getCsfdLink();

  if (csfdLink) {
    const csfdId = getCsfdId(csfdLink);
    getMovieAndRender(csfdId);
  } else {
    const { movie, year } = getMovieAndYearKviff();
    searchMovieAndRender(movie, year);
  }
}
