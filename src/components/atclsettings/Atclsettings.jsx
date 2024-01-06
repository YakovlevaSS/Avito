import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "../../store/RTKQuery/adsApi";

const Atclsettings = ({ setIsShowSettings, adv }) => {
  console.log(adv);
  const id = adv.id
  const [nameAdv, setNameAdv] = useState(adv?.title);
  const [descriptionAdv, setDescriptionAdv] = useState(adv?.description);
  const [priceAdv, setPriceAdv] = useState(adv?.price);
  const [errorForm, setErrorForm] = useState(null);
  const [offButton, setOffButton] = useState(true);
  const navigate = useNavigate();
  const [updateProduct, { isLoading, error }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (!nameAdv || !descriptionAdv || !priceAdv) {
      setOffButton(true);
    } else {
      setOffButton(false);
    }
  }, [nameAdv, descriptionAdv, priceAdv]);

  const handleSentText = async (event) => {
    event.preventDefault();
    if (!nameAdv || !descriptionAdv || !priceAdv) {
      setErrorForm("Не все поля заполнены");
      return;
    }
    try {
      const response = await updateProduct({
        nameAdv,
        descriptionAdv,
        priceAdv,
        id,
      });
      console.log(response);
      navigate(`/myartycle/${response.data?.id}`);
      setIsShowSettings(false);
    } catch (err) {
      // Handle errors if needed
      console.error("Add product error:", err);
    }
  };

  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
        <div className={styles.modalTitleBlog}>
            <svg className={styles.articleFillImgSvg}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="21"
              viewBox="0 0 12 21"
              fill="none"
              onClick={() => {
                setIsShowSettings(false);
              }}
            >
              <path
                d="M11 1.5L2 10.5L11 19.5"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            </div>
          <h3 className={styles.modalTitle}>Редактировать объявление</h3>
          <div className={styles.modalBtnClose}>
            <div
              className={styles.modalBtnCloseLine}
              onClick={() => {
                setIsShowSettings(false);
              }}
            ></div>
          </div>
          <form
            className={`${styles.modalFormNewArt} ${styles.formNewArt}`}
            id="formNewArt"
            action="#"
            onSubmit={handleSentText}
          >
            {errorForm && <div className={styles.error}>{errorForm}</div>}
            {error && <div className={styles.error}>{error.message}</div>}
            <div className={styles.formNewArtBlock}>
              <label className={styles.formLabel} htmlFor="name">
                Название
              </label>
              <input
                className={styles.formNewArtInput}
                type="text"
                name="name"
                id="formName"
                placeholder="Введите название"
                value={nameAdv}
                onChange={(event) => {
                  setNameAdv(event.target.value);
                }}
              />
            </div>
            <div className={styles.formNewArtBlock}>
              <label className={styles.formLabel} htmlFor="text">
                Описание
              </label>
              <textarea
                className={styles.formNewArtArea}
                name="text"
                id="formArea"
                cols="auto"
                rows="10"
                placeholder="Введите описание"
                value={descriptionAdv}
                onChange={(event) => {
                  setDescriptionAdv(event.target.value);
                }}
              />
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
              <label className={styles.formLabel} htmlFor="price">
                Цена
              </label>
              <input
                className={styles.formNewArtInputPrice}
                type="text"
                name="price"
                id="formName"
                value={priceAdv}
                onChange={(event) => {
                  setPriceAdv(event.target.value);
                }}
              />
              <div className={styles.formNewArtInputPriceCover}></div>
            </div>

            <button
              className={offButton? (`${styles.formNewArtBtnPub}`) : (`${styles.formNewArtBtnPubActive} ${styles.btnHov02}`)}
              id="btnPublish"
              disabled={offButton}
              type="submit"
            >
              {isLoading ? "Публикуем..." : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Atclsettings;
