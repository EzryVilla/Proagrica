import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  onFilter: (value: string) => void
  onShowFavorites?: (value: boolean) => void
}

const Filter = ({ onFilter, onShowFavorites }: Props) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const showFavoritesHandler = useCallback(() => {
    setShowFavorites(!showFavorites)
    onShowFavorites?.(!showFavorites)
  }, [showFavorites, onShowFavorites]);

  return (
    <>
      <div className="mb-3">
        <input onChange={(ev) => onFilter(ev.target.value)} className="form-control"></input>
      </div>
      <div className="mb-3">
        <Button variant="primary" type="button" onClick={showFavoritesHandler}>
          Show { showFavorites ? <>all</> : <>favorites</>}
        </Button>
      </div>
    </>
  )
}

export default Filter
