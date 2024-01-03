import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import Atclsettings from "../../components/atclsettings/Atclsettings";
import {
  useGetOneProductQuery,
  useDeleteProductMutation,
} from "../../store/RTKQuery/adsApi";
import { DateBlock } from "../../components/dateBlog/DataBlog";

export default function MyArticlePage() {
  const [isShow, setIsShow] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);
  const navigate = useNavigate();
  const idAds = useParams().id;
  const { data = [], isLoading, isError, error } = useGetOneProductQuery(idAds);
  console.log(data);
  const [bigImg, setBigImg] = useState(null);
  const [numberOfShowImg, setNumberOfShowImg] = useState(1);
  const [
    deleteProduct,
    { isLoadingDel = isLoading, isErrorDel = isError, errorDel = error },
  ] = useDeleteProductMutation();
  console.log(errorDel)

  useEffect(() => {
    setBigImg(data?.images?.[0]?.url ?? null);
  }, [data]);
  console.log(data);

  const handleNextImg = () => {
    if (window.innerWidth <= 768) {
      if (numberOfShowImg < data?.images.length) {
        setNumberOfShowImg(numberOfShowImg + 1);
        setBigImg(data?.images[numberOfShowImg]?.url);
      } else {
        setNumberOfShowImg(1);
        setBigImg(data?.images[0]?.url);
      }
    }
  };

  const id = idAds;

  const handleDelText = async () => {
    try {
      const response = await deleteProduct({
     id
      });
      console.log(response);
      navigate(`/`);
      setIsShowSettings(false);
    } catch (err) {
      // Handle errors if needed
      console.error("Add product error:", err);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <LogoBlog />
        {!isLoading ? (
          <>
            <div className={`${styles.mainArtic} ${styles.artic}`}>
              <div className={`${styles.articContent} ${styles.article}`}>
                <div className={styles.articleLeft}>
                  <div className={styles.articleFillImg}>
                    <div className={styles.articleImg} onClick={handleNextImg}>
                      <img
                        src={
                          bigImg
                            ? `http://localhost:8090/${bigImg}`
                            : "/img/no-foto.png"
                        }
                        alt="phot"
                      />
                    </div>
                    <div className={styles.articleImgBar}>
                      {data?.images.map((photo) => (
                        <div
                          key={photo.id}
                          className={styles.articleImgBarDiv}
                          onClick={() => setBigImg(photo.url)}
                        >
                          <img
                            src={`http://localhost:8090/${photo.url}`}
                            alt="phot"
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      className={`${styles.articleImgBarMob} ${styles.imgBarMob}`}
                    >
                      <div
                        className={`${styles.imgBarMobCircle} ${styles.circleActive}`}
                      ></div>
                      {data?.images.map((photo) =>
                        photo.id === data?.images[numberOfShowImg - 1].id ? (
                          <div
                            key={photo.id}
                            className={`${styles.imgBarMobCircle} ${styles.imgBarMobCircleActive}`}
                          ></div>
                        ) : (
                          <div
                            key={photo.id}
                            className={styles.imgBarMobCircle}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.articleRight}>
                  <div className={styles.articleBlock}>
                    <h3 className={`${styles.articleTitle} ${styles.title}`}>
                      {data?.title}
                    </h3>
                    <div className={styles.articleInfo}>
                      <p className={styles.articleDate}>
                        <DateBlock time={data?.created_on} />
                      </p>
                      <p className={styles.articleCity}>{data?.user?.city}</p>
                      <button
                        className={styles.articleLink}
                        onClick={() => {
                          setIsShow(true);
                        }}
                      >
                        23 отзыва
                      </button>
                    </div>
                    <p className={styles.articlePrice}>{data?.price} ₽</p>
                    <div
                      className={`${styles.articleBtnBlock} ${styles.btnBlock}`}
                    >
                      <button
                        className={`${styles.articleBtn} ${styles.btnRedact} ${styles.btnHov02}`}
                        onClick={() => {
                          setIsShowSettings(true);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        className={`${styles.articleBtn} ${styles.btnRemove} ${styles.btnHov02}`}
                      onClick={handleDelText}>
                        Снять с публикации
                      </button>
                    </div>
                    <div className={`${styles.articleAuthor} ${styles.author}`}>
                      <div className={styles.authorImg}>
                        <img
                          src={`http://localhost:8090/${data.user.avatar}`}
                          alt=""
                        />
                      </div>
                      <div className={styles.authorCont}>
                        <p
                          className={styles.authorName}
                          onClick={() => {
                            navigate(`/sellerprofile/${data?.user_id}`);
                          }}
                        >
                          {data?.user.name}
                        </p>
                        <p className={styles.authorAbout}>
                          {`Продает товары с ${data?.user.sells_from}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mainContainer}>
              <h3 className={`${styles.mainTitle} ${styles.title}`}>
                Описание товара
              </h3>
              <div className={styles.mainContent}>
                <p className={styles.mainText}>{data?.description}</p>
              </div>
            </div>
          </>
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
        )}
      </main>
      {isShow && <Reviews setIsShow={setIsShow} />}
      {isShowSettings && (
        <Atclsettings setIsShowSettings={setIsShowSettings} adv={data} />
      )}
    </>
  );
}
