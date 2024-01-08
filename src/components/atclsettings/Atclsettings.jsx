/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  useAddProductImageMutation,
  useDeleteProductImageMutation,
} from "../../store/RTKQuery/adsApi";

const Atclsettings = ({ setIsShowSettings, adv }) => {
  console.log(adv);
  const id = adv.id;
  const [nameAdv, setNameAdv] = useState(adv?.title || "");
  const [descriptionAdv, setDescriptionAdv] = useState(adv?.description || "");
  const [priceAdv, setPriceAdv] = useState(adv?.price || "");
  const [errorForm, setErrorForm] = useState(null);
  const [offButton, setOffButton] = useState(true);
  const navigate = useNavigate();
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();
  const [addProductImage, { isLoading: imageIsLoading, error: imageError }] =
    useAddProductImageMutation();
  const [
    delProductImage,
    { isLoading: delImageIsLoading, error: delImageError },
  ] = useDeleteProductImageMutation();

  const [filePickers, setFilePickers] = useState(
    Array.from({ length: 5 }, () => useRef())
  );
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(adv?.images || []);

  useEffect(() => {
    if (!nameAdv || !descriptionAdv || !priceAdv) {
      setOffButton(true);
    } else {
      setOffButton(false);
    }
  }, [nameAdv, descriptionAdv, priceAdv]);

  const handleSentAdv = async (event) => {
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

      const adId = response.data?.id;

      // Загрузка новых изображений, если они есть
      if (selectedImages.length > 0) {
        selectedImages.forEach(async (image, index) => {
          try {
            const imageResponse = await addProductImage({
              id: adId,
              file: image,
            });
            console.log(`Image ${index + 1} response:`, imageResponse);
          } catch (error) {
            setErrorForm(error);
          }
        });
      }

      navigate(`/myartycle/${response.data?.id}`);
      setIsShowSettings(false);
    } catch (error) {
      setErrorForm(error);
    }
  };

  const handleAddImage = (index) => {
    filePickers[index].current.click();
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file && selectedImages.length < 5) {
      setSelectedImages([...selectedImages, file]);
    }
  };

  const handleDelImgServer = async (url) => {
    try {
      await delProductImage({ id: adv.id, url: url });
    } catch (error) {
      setErrorForm(error);
    }
  };

  const handleDelImgAdd = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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
                setIsShowSettings(false);
              }}
            >
              <path d="M11 1.5L2 10.5L11 19.5" stroke="black" strokeWidth="2" />
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
            onSubmit={handleSentAdv}
          >
            {errorForm && <div className={styles.error}>{errorForm}</div>}
            {error && <div className={styles.error}>{error.message}</div>}
            {delImageError && (
              <div className={styles.error}>{delImageError.message}</div>
            )}
            {imageError && (
              <div className={styles.error}>{imageError.message}</div>
            )}
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
                {/* Добавление изображений, которые пришли с бэка */}
                {adv.images.map((image, index) => (
                  <div key={index} className={styles.formNewArtImg}>
                    <img
                      src={`http://localhost:8090/${image.url}`}
                      alt={`product ${index + 1}`}
                    />
                    <div
                      className={styles.imgDel}
                      onClick={() => {
                        handleDelImgServer(image.url);
                      }}
                    >
                      x
                    </div>
                    <div className={styles.formNewArtImgCover} />
                  </div>
                ))}
                {/* Добавление пустых блоков для недостающих изображений */}
                {Array.from({
                  length: Math.max(
                    5 - adv.images.length - selectedImages.length,
                    0
                  ),
                }).map((_, index) => (
                  <div
                    key={index}
                    className={styles.formNewArtImg}
                    onClick={() => handleAddImage(index)}
                  >
                    <input
                      type="file"
                      accept="image/*, .png, .jpg, .gif, .web, .jpeg"
                      ref={filePickers[index]}
                      style={{ display: "none" }}
                      onChange={(event) => handleImageChange(index, event)}
                    />
                    <img src="" alt="" />
                    <div className={styles.formNewArtImgCover} />
                  </div>
                ))}
                {/* Отображение выбранных изображений */}
                {selectedImages.map((image, index) => (
                  <div key={index} className={styles.formNewArtImg}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index + 1}`}
                    />
                    <div
                      className={styles.imgDel}
                      onClick={() => {
                        handleDelImgAdd(index);
                      }}
                    >
                      x
                    </div>
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
              <div className={styles.formNewArtInputPriceCover}></div>
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
              {isLoading ? "Публикуем..." : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Atclsettings;
