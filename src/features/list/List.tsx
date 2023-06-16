import { ListGroup, Button, Image } from "react-bootstrap"
import { TvShow } from "../../interfaces/interfaces"

interface Props {
  tvShows: TvShow[]
  onMarkedAsFavorite: (show: TvShow) => void,
  onTvShowClick: (show: TvShow) => void,
}

const List = ({ tvShows, onMarkedAsFavorite, onTvShowClick }: Props) => {
  return (
    <ListGroup>
      {tvShows.map((tvshow) => (
        <ListGroup.Item className="d-flex flex-row justify-content-between" key={tvshow.id}>
          <div className="d-flex flex-row align-items-center" onClick={() => onTvShowClick(tvshow)}>
            <Image src={tvshow.image.medium} rounded width="70px"/>
            <h5 className="ms-2">{tvshow.name}</h5>
          </div>
          <Button
            variant="outline-primary"
            onClick={(ev) => onMarkedAsFavorite(tvshow)}
          >
            { tvshow.markedAsFavorite ? <>❤️</> : <>🖤</> }
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default List
