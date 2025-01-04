import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProp {
  handleLoadMoreClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProp> = ({ handleLoadMoreClick }) => {
  return (
    <button className={css.loadBtn} type="button" onClick={handleLoadMoreClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
