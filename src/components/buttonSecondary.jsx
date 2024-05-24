import PropTypes from 'prop-types';

export default function ButtonSecondary({ text, onClick }) {
    return (
        <button className='secondary' onClick={onClick}>{text}</button>
    );
}

ButtonSecondary.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};