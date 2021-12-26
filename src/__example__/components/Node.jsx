import PropTypes from 'prop-types';
import styles from './Node.module.scss';

const Node = ({ id }) => {
  return (
    <div>
      {id}
    </div>
  );
};

Node.propTypes = {
  id: PropTypes.string,
};

export default Node;
