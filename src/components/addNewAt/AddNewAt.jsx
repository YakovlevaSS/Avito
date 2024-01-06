import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddProductTextMutation,
  useAddProductImageMutation,
} from "../../store/RTKQuery/adsApi";

const AddNewAt = ({ setIsShow }) => {
  const [nameAdv, setNameAdv] = useState("");
  const [descriptionAdv, setDescriptionAdv] = useState("");
  const [priceAdv, setPriceAdv] = useState("");
  const [errorForm, setErrorForm] = useState(null);
  const [offButton, setOffButton] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const filePicker = useRef(null);
  const [addProductText, { isLoading, error }] = useAddProductTextMutation();
  const [addProductImage, { isLoading: imageIsLoading, error: imageError }] =
    useAddProductImageMutation();

  //Validation
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
      const response = await addProductText({
        nameAdv,
        descriptionAdv,
        priceAdv,
      });
      console.log(response);
      const adId = response.data?.id;
      console.log(adId)

      // Отправка изображений
      const imageResponses = await Promise.all(
        selectedImages.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image);

          return await addProductImage(formData, { id: adId });
        })
      );

      console.log("Image responses:", imageResponses);

      navigate(`/myartycle/${response.data?.id}`);
      setIsShow(false);
    } catch (error) {
      setErrorForm(error);
    }
  };

  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitleBlog}>
            <svg
              className={styles.articleFillImgSvg}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="21"
              viewBox="0 0 12 21"
              fill="none"
              onClick={() => {
                setIsShow(false);
              }}
            >
              <path
                d="M11 1.5L2 10.5L11 19.5"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
            <h3 className={styles.modalTitle}>Новое объявление</h3>
          </div>
          <div className={styles.modalBtnClose}>
            <div
              className={styles.modalBtnCloseLine}
              onClick={() => {
                setIsShow(false);
              }}
            />
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
                rows={10}
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
                {Array.from({ length: Math.max(5 - selectedImages.length, 0) }).map((_, index) => (
                  <div key={index} className={styles.formNewArtImg} onClick={() => filePicker.current.click()}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={filePicker}
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (selectedImages.length < 5) {
                          setSelectedImages([...selectedImages, file]);
                        }
                      }}
                    />
                    <img src="" alt="" />
                    <div className={styles.formNewArtImgCover} />
                  </div>
                ))}
                {selectedImages.map((image, index) => (
                  <div key={index} className={styles.formNewArtImg}>
                    <img src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} />
                    <div className={styles.formNewArtImgCover} />
                  </div>
                ))}
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
              <div className={styles.formNewArtInputPriceCover} />
            </div>
            <button
              className={
                offButton
                  ? `${styles.formNewArtBtnPub}`
                  : `${styles.formNewArtBtnPubActive} ${styles.btnHov02}`
              }
              id="btnPublish"
              disabled={offButton}
              type="submit"
            >
              {isLoading ? "Публикуем..." : "Опубликовать"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAt;
