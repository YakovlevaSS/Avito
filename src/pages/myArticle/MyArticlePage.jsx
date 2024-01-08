import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import Atclsettings from "../../components/atclsettings/Atclsettings";
import { CommentsBlog } from "../../components/commentsBlog/CommentsBlog";
import {
  useGetOneProductQuery,
  useDeleteProductMutation,
} from "../../store/RTKQuery/adsApi";
import {
  DateBlock,
  FormatSellingSince,
} from "../../components/dateBlog/DataBlog";
import LoadingBlog from "../../components/loadingBlog/LoadingBlog";
import ErrorBlog from "../../components/errorBlog/ErrorBlog";

export default function MyArticlePage() {
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);
  const [errorDel, setErrorDel] = useState(null);
  const navigate = useNavigate();
  const idAds = useParams().id;
  const [isSkipRefetching, setIsSkipRefetching] = useState(false);
  const {
    data = [],
    isLoading,
    error,
  } = useGetOneProductQuery(idAds, { skip: isSkipRefetching });
  const [bigImg, setBigImg] = useState(null);
  const [numberOfShowImg, setNumberOfShowImg] = useState(1);

  useEffect(() => {
    setBigImg(data?.images?.[0]?.url ?? null);
    setId(data?.id);
  }, [data]);

  const [deleteProduct, { isLoading: isLoadingDel }] =
    useDeleteProductMutation(id);

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

  const handleDelText = async () => {
    const id = idAds;
    setIsSkipRefetching(true);
    try {
      const response = await deleteProduct(id);
      console.log(response);
      navigate(`/`);
      setIsSkipRefetching(false);
      setIsShowSettings(false);
    } catch (errorDel) {
      setErrorDel(errorDel.message);
    }
  };

  // Обработка ошибки
  if (error) {
    return <ErrorBlog errorMessage={error.message} />;
  }

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
                  <NavLink to="/profile">
                    <svg className={styles.articleFillImgSvg}
                      width="14"
                      height="25"
                      viewBox="0 0 14 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 1L1.5 12.5L13 24"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                    </NavLink>
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
                      <CommentsBlog setIsShow={setIsShow} id={data?.id} />
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
                        onClick={handleDelText}
                      >
                        {isLoadingDel
                          ? "Удаляем объявление"
                          : "Снять с публикации"}
                      </button>
                      {errorDel && (
                        <div className={styles.error}>{errorDel}</div>
                      )}
                    </div>
                    <div className={`${styles.articleAuthor} ${styles.author}`}>
                      <div className={styles.authorImg}>
                        <img
                          src={`http://localhost:8090/${data.user.avatar}`}
                          alt="ava"
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
                          <FormatSellingSince
                            dateString={data?.user.sells_from}
                          />
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
          <LoadingBlog />
        )}
      </main>
      {isShow && <Reviews setIsShow={setIsShow} id={data?.id} />}
      {isShowSettings && (
        <Atclsettings setIsShowSettings={setIsShowSettings} adv={data} />
      )}
    </>
  );
}
