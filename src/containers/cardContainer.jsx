import PropTypes from 'prop-types';
import Card from '../components/card'

const CardContainer = (props) => {
    return (
        <div className="card-container">
            {props.data.map((item) => {
                return <Card key={item.id} {...item} />
            })}
        </div>
    )
}

CardContainer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CardContainer