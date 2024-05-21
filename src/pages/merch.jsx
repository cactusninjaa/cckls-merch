import CardContainer from '../containers/cardContainer'
import shopItems from '../data/shopItems'

function Merch() {

  return (
    <>
      <CardContainer data={shopItems} />
    </>
  )
}

export default Merch