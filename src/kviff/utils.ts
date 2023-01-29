export const getMovieAndYearKviff = (): { movie: string | null; year: string | null } => {
  const movie = document.querySelector('h1[itemprop=name]')?.textContent ?? null;
  const year = document.querySelector('[itemprop=dateCreated]')?.textContent ?? null;
  return { movie, year };
}

export const getButtonRootElementsKviff = (): { root: HTMLElement, placingNode: Element | null } => {
  const placingNode = document.querySelector(".dl-inline-bullets dd");
  const root = document.createElement("dd");
  root.id = "csfd-ext";
  return { root, placingNode };
}
