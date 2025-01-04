import { ImagesProps } from '../../types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface Props {
  images: ImagesProps[];
  openModal: (...keys: string[]) => void;
}

const ImageGallery: React.FC<Props> = ({ images, openModal }) => {
  return (
    <ul className={css.imageMenu}>
      {images.map(({ id, description, urls }) => {
        return (
          <li key={id} className={css.imageItem}>
            <ImageCard
              urls={urls}
              description={description}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
