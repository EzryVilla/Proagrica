import useAxios, { configure } from "axios-hooks"
import Axios from "axios"
import { TvShow } from "./interfaces"
import { useCallback, useEffect, useState } from "react"

const axios = Axios.create({
  baseURL: "http://api.tvmaze.com",
})

configure({ axios })

const LocalStorageKey = 'favorites';

export function getTvShows() {
  const [{ data, loading, error }, refetch] = useAxios<TvShow[]>("/shows")
  const [tvShows, setTvShows] = useState<TvShow[]>([]);

  useEffect(() => {
    if (!data) return;

    const favorites = JSON.parse(localStorage.getItem(LocalStorageKey) || "[]")
    const tvShows = [...data].map(x => ({ ...x, markedAsFavorite: favorites.includes(x.id) }))

    setTvShows(tvShows);
  }, [data])

  useEffect(() => {
    const favorites = [...tvShows]
      .filter(x => x.markedAsFavorite)
      .map(({ id }) => id)
    localStorage.setItem(LocalStorageKey, JSON.stringify(favorites))
  }, [tvShows])

  const showMarkedAsFavorite = useCallback((show: TvShow) => {
    const updatedShow = { ...show, markedAsFavorite: !show.markedAsFavorite }    
    const list = [...tvShows].map((s) => (s.id === show.id ? updatedShow : s));

    setTvShows(list)
  }, [tvShows])

  return { tvShows, showMarkedAsFavorite }
}

