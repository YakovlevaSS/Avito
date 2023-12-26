import styles from './styles.module.css'

const AddNewAt = ({setIsShow}) => {
  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Новое объявление</h3>
          <div className={styles.modalBtnClose}>
            <div className={styles.modalBtnCloseLine} onClick={() => {setIsShow(false)}}/>
          </div>
          <form
            className={`${styles.modalFormNewArt} ${styles.formNewArt}`}
            id="formNewArt"
            action="#"
          >
            <div className={styles.formNewArtBlock}>
              <label htmlFor="name">Название</label>
              <input
                className={styles.formNewArtInput}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
              />
            </div>
            <div className={styles.formNewArtBlock}>
              <label htmlFor="text">Описание</label>
              <textarea
                className={styles.formNewArtArea}
                name="text"
                id="formArea"
                cols="auto"
                rows={10}
                placeholder="Введите описание"
                defaultValue={""}
              />
            </div>
            <div className={styles.formNewArtBlock}>
              <p className={styles.formNewArtP}>
                Фотографии товара<span>не более 5 фотографий</span>
              </p>
              <div className={styles.formNewArtBarImg}>
                <div className={styles.formNewArtImg}>
                  <img src="" alt="" />
                  <div className={styles.formNewArtImgCover} />
                </div>
                <div className={styles.formNewArtImg}>
                  <img src="" alt="" />
                  <div className={styles.formNewArtImgCover} />
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover} />
                  <img src="" alt="" />
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover} />
                  <img src="" alt="" />
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover} />
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div className={`${styles.formNewArtBlock} ${styles.blockPrice}`}>
              <label htmlFor="price">Цена</label>
              <input
                className={styles.formNewArtInputPrice}
                type="text"
                name="price"
                id="formName"
              />
              <div className={styles.formNewArtInputPriceCover} />
            </div>
            <button
              className={`${styles.formNewArtBtnPub} ${styles.btnHov02}`}
              id="btnPublish"
            >
              Опубликовать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAt;
