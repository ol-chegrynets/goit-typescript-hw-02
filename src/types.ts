export interface ImagesProps {
  id: string;
  description: string;
  urls: { small: string; regular: string };
}
export interface ModalProps {
  isOpen: boolean;
  imgUrl: string;
  imgAlt: string;
}
export interface Response {
  results: ImagesProps[];
  total: number;
  total_pages: number;
}
