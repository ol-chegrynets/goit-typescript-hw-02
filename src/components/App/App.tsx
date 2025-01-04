import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import { getPhotos } from '../../images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { ImagesProps, ModalProps } from '../../types';
import ImageModal from '../ImageModal/ImageModal';


function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<ImagesProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    imgUrl: '',
    imgAlt: '',
  });

  const handleSubmit = (searchValue: string): void => {
    setQuery(searchValue);
    setImages([]);
    setPage(1);
    setNextPage(false);
    setIsEmpty(false);
    setError(null);
  };

  interface Response {
    results: ImagesProps[];
    total: number;
    total_pages: number;
  }
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const { results, total, total_pages }: Response = await getPhotos(
          query,
          page
        );

        if (!total) {
          setIsEmpty(true);

          const notify = () =>
            toast('No photos for such query!', {
              duration: 3000,
              position: 'top-center',
              style: { marginTop: 100 },
              icon: '😢',
            });
          notify();
        }
        setImages(prevImages => [...prevImages, ...results]);
        setNextPage(page < total_pages);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMoreClick = (): void => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (url: string, alt: string): void => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt });
  };

  const closeModal = (): void => {
    setModal({ ...modal, isOpen: false, imgUrl: '', imgAlt: '' });
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {nextPage && <LoadMoreBtn handleLoadMoreClick={handleLoadMoreClick} />}
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {isEmpty && <Toaster />}
      <ImageModal
        isOpen={modal.isOpen}
        imgUrl={modal.imgUrl}
        imgAlt={modal.imgAlt}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
