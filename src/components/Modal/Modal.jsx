import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, bigImage }) => {
  


  useEffect(() => {
      const handleKeyDown = e => { if (e.code === 'Escape') { onClose() } };
      window.addEventListener('keydown', handleKeyDown);
      // Заборона скролу під модалкою (3 строки)
      const tags = document.getElementsByTagName('html');
      tags[0].style.overflow = 'hidden';
      return () => {
      tags[0].style.overflow = 'initial';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);



  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

return createPortal(
      <div className={css.Overlay} onClick={handleBackdropClick} >
        <div className={css.Modal}>
          <img src={bigImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  bigImages: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};




// export class Modal extends Component {

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//     }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div className={css.Modal}>
//           <img src={this.props.bigImage} alt="" />
//           {this.props.children}
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }


