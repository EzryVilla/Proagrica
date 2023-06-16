export interface TvShow {
  id: string
  name: string
  markedAsFavorite: boolean
  image: Image
  externals: Externals
  summary: string
}

export interface Image {
  medium: string
  original: string
}

export interface Externals {
  imdb: string
}
