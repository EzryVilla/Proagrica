import "./App.css"
import "bootstrap/dist/css/bootstrap.css"
import { useCallback, useMemo, useState } from "react"
import { Container, Image, Button, Modal } from "react-bootstrap"

import { getTvShows } from "./api"
import Filter from "./features/filter/Filter"
import List from "./features/list/List"
import { TvShow } from "./interfaces"

function App() {
  // Hooks
  const { tvShows, showMarkedAsFavorite } = getTvShows()
  const [showFavorites, setShowFavorites] = useState(false)
  const [modalTvShow, setModalTvShow] = useState<TvShow>()
  const [filter, setFilter] = useState<string>("")
  const filteredTvShows = useMemo(() => {
    let shows = [...tvShows]
    if (showFavorites) {
      shows = shows.filter((x) => x.markedAsFavorite)
    }
    if (filter) {
      shows = shows.filter((x) =>
        x.name.toLowerCase().includes(filter.toLowerCase()),
      )
    }
    return shows
  }, [showFavorites, tvShows, filter])

  // Callbacks
  const handleClose = useCallback(() => setModalTvShow(undefined), [])
  const onShowMarkedAsFavorite = useCallback(
    (show: TvShow) => {
      if (show.markedAsFavorite) {
        const accepted = confirm(
          "Are you sure you want to remove this show from favorites?",
        )
        if (!accepted) return
      }

      showMarkedAsFavorite(show)
    },
    [showMarkedAsFavorite],
  )
  const onShowFavorites = useCallback(
    (showFavorites: boolean) => setShowFavorites(showFavorites),
    [],
  )
  const onFilter = useCallback((filter: string) => setFilter(filter), [])
  const onTvShowClick = useCallback((show: TvShow) => setModalTvShow(show), [])

  const handleModalToggleFavorite = useCallback((show: TvShow) => {
    onShowMarkedAsFavorite(show)
    setModalTvShow({ ...show, markedAsFavorite: !show.markedAsFavorite })
  }, [])

  return (
    <Container className="py-5">
      <Modal show={Boolean(modalTvShow)} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {modalTvShow?.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid mx-auto">
            {modalTvShow?.markedAsFavorite ? (
              <Button
                className="mb-3"
                variant="danger"
                onClick={() => handleModalToggleFavorite(modalTvShow!)}
              >
                Remove from favorites
              </Button>
            ) : (
              <Button
                className="mb-3"
                variant="success"
                onClick={() => handleModalToggleFavorite(modalTvShow!)}
              >
                Add to favorites
              </Button>
            )}

            <Image
              src={modalTvShow?.image.original}
              rounded
              fluid
              className="mb-3"
            />

            {modalTvShow?.externals.imdb && (
              <a
                href={`https://www.imdb.com/title/${modalTvShow?.externals.imdb}`}
              >
                Got to IMDB
              </a>
            )}

            {/* TODO: Sanitize summary :) */}
            <div
              dangerouslySetInnerHTML={{ __html: modalTvShow?.summary || "" }}
            ></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h3>My TV Shows</h3>

      <Filter onFilter={onFilter} onShowFavorites={onShowFavorites}></Filter>
      <List
        tvShows={filteredTvShows}
        onMarkedAsFavorite={onShowMarkedAsFavorite}
        onTvShowClick={onTvShowClick}
      ></List>
    </Container>
  )
}

export default App
