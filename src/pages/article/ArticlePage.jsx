import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import Atclsettings from "../../components/atclsettings/Atclsettings";
import { useGetOneProductQuery } from "../../store/RTKQuery/adsApi";

export default function ArticlePage() {
  const [isShow, setIsShow] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(false);
  const navigate = useNavigate();
  const idAds = useParams().id;
  const { data = [], isLoading } = useGetOneProductQuery(idAds);
  console.log(data)
  const [bigImg, setBigImg] = useState( null);
  const [numberOfShowImg, setNumberOfShowImg] = useState(1);
  useEffect(() => {
    setBigImg(data?.images?.[0]?.url ?? null);
  }, [data]);
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
                    <div className={styles.articleImg}>
                      <img
                        src=
                        {
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
                      <p className={styles.articleDate}>{data?.created_on}</p>
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
                    <p className={styles.articlePrice}>2 200 ₽</p>
                    <button
                      className={`${styles.articleBtnBig} ${styles.btnHov02}`}
                    >
                      Показать телефон
                      <span>8 905 XXX XX XX</span>
                    </button>
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
                            navigate("/sellerprofile");
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
                <p className={styles.mainText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </>
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
        )}
      </main>
      {isShow && <Reviews setIsShow={setIsShow} />}
      {isShowSettings && <Atclsettings setIsShowSettings={setIsShowSettings} />}
    </>
  );
}
