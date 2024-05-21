import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <Link to={`/product/${props.id}`}>
            <div className="card">
                <img src={'/assets/img/shopItems/' + props.img} alt={props.name} /> 
                <div>
                    <h2>{props.name}</h2>
                    <p>{props.price}€</p>
                </div>
                
            </div>
        </Link>
    )
}

Card.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default Card
