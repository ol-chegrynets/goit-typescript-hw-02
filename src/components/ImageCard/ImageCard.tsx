import React from 'react';
import css from './ImageCard.module.css';
import { ImagesProps } from '../../types';

interface Props extends Pick<ImagesProps, 'description' | 'urls'> {
  openModal: (regular: string, description: string) => void;
}
const ImageCard: React.FC<Props> = ({ description, urls, openModal }) => {
  return (
    <img
      className={css.image}
      src={urls.small}
      alt={description}
      onClick={() => openModal(urls.regular, description)}
    />
  );
};

export default ImageCard;
