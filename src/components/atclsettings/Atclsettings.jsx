import styles from './styles.module.css'

const Atclsettings = () => {
  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Редактировать объявление</h3>
          <div className={styles.modalBtnClose}>
            <div className={styles.modalBtnCloseLine}></div>
          </div>
          <form className={`${styles.modalFormNewArt} ${styles.formNewArt}`} id="formNewArt" action="#">
            <div className={styles.formNewArtBlock}>
              <label htmlFor="name">Название</label>
              <input
                className={styles.formNewArtInput}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
                value="Ракетка для большого тенниса Triumph Pro STС Б/У"
              />
            </div>
            <div className={styles.formNewArtBlock}>
              <label htmlFor="text">Описание</label>
              <textarea
                className={styles.formNewArtArea}
                name="text"
                id="formArea"
                cols="auto"
                rows="10"
                placeholder="Введите описание"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </textarea>
            </div>
            <div className={styles.formNewArtBlock}>
              <p className={styles.formNewArtP}>
                Фотографии товара<span>не более 5 фотографий</span>
              </p>
              <div className={styles.formNewArtBarImg}>
                <div className={styles.formNewArtImg}>
                  <img src="" alt="" />
                  <div className={styles.formNewArtImgCover}></div>
                </div>
                <div className={styles.formNewArtImg}>
                  <img src="" alt="" />
                  <div className={styles.formNewArtImgCover}></div>
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover}></div>
                  <img src="" alt="" />
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover}></div>
                  <img src="" alt="" />
                </div>
                <div className={styles.formNewArtImg}>
                  <div className={styles.formNewArtImgCover}></div>
                  <img src="" alt="" />
                </div>
              </div>
            </div>
            <div className={`${styles.formNewArtBlock} ${styles.blockPrice}`}>
              <label htmlFor="price">Цена</label>
              <input className={styles.formNewArtInputPrice} type="text" name="price" id="formName" value="2 200" />
              <div className={styles.formNewArtInputPriceCover}></div>
            </div>

            <button className={`${styles.formNewArtBtnPub} ${styles.btnHov02}`} id="btnPublish">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Atclsettings;
