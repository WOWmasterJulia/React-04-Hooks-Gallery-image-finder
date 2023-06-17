import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css'


export const ImageGallery = ({ images, onImageClick}) => (
<ul className={css.Gallery} onClick={onImageClick}>
    {/* Набор <li> с изображениями  */}
    { images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL} />
    ))}
</ul>
  )



  ImageGallery.propTypes = { 
    images: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired
}