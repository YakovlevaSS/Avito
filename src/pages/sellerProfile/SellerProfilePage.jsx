import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import CardItem from "../../components/card/Card";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useGetAllProductsQuery } from "../../store/RTKQuery/adsApi";
import { FormatSellingSince } from "../../components/dateBlog/DataBlog";
import { FormatPhoneNumberClose } from "../../components/phoneBlog/PhoneBlog";
import LoadingBlog from "../../components/loadingBlog/LoadingBlog";
import ErrorBlog from "../../components/errorBlog/ErrorBlog";

export default function SellerProfilePage() {
  const idSeller = Number(useParams().id);
  console.log(idSeller);
  const { data = [], isLoading, error } = useGetAllProductsQuery();
  console.log(data);
  const sellerProducts = data?.filter((item) => item.user_id === idSeller);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  // Обработка ошибки
  if (error) {
    return <ErrorBlog errorMessage={error.message} />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.mainCenterBlock}>
          <LogoBlog />
          {!isLoading ? (
            <>
              <div className={styles.modalTitleBlog}>
                <svg
                  className={styles.fillImgSvg}
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="21"
                  viewBox="0 0 12 21"
                  fill="none"
                  onClick={() => {navigate(-1)}}
                >
                  <path
                    d="M11 1.5L2 10.5L11 19.5"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
                <h2 className={styles.mainH2}>Профиль продавца</h2>
              </div>

              <div
                className={`${styles.mainProfileSell} ${styles.profileSell}`}
              >
                <div className={styles.profileSellContent}>
                  <div
                    className={`${styles.profileSellSeller} ${styles.seller}`}
                  >
                    <div className={styles.sellerLeft}>
                      <div className={styles.sellerImg}>
                        <NavLink>
                          <img
                            src={
                              sellerProducts[0]?.user.avatar
                                ? `http://localhost:8090/${sellerProducts[0]?.user.avatar}`
                                : "/img/no-foto.png"
                            }
                            alt="ava"
                          />
                        </NavLink>
                      </div>
                    </div>
                    <div className={styles.sellerRight}>
                      <h3 className={styles.sellerTitle}>
                        {sellerProducts[0]?.user.name}
                      </h3>
                      <p className={styles.sellerCity}>
                        {sellerProducts[0]?.user.city}
                      </p>
                      <p className={styles.sellerInf}>
                        <FormatSellingSince
                          dateString={sellerProducts[0]?.user.sells_from}
                        />
                      </p>
                      <div className={styles.sellerImgMobBlock}>
                        <div className={styles.sellerImgMob}>
                          <NavLink>
                            <img
                              src={
                                sellerProducts[0]?.user.avatar
                                  ? `http://localhost:8090/${sellerProducts[0]?.user.avatar}`
                                  : "/img/no-foto.png"
                              }
                              alt="product"
                            />
                          </NavLink>
                        </div>
                      </div>
                      <button
                        className={`${styles.sellerBtn} ${styles.btnHov02}`}
                        onClick={() => {
                          setIsShow(!isShow);
                        }}
                      >
                        Показать&nbsp;телефон
                        <FormatPhoneNumberClose
                          phoneNumber={sellerProducts[0]?.user.phone}
                          isShow={isShow}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className={styles.mainTitle}>Товары продавца</h3>
            </>
          ) : (
            <LoadingBlog />
          )}
        </div>
        {!isLoading ? (
          <div className={styles.mainContent}>
            <div className={`${styles.contentCards} ${styles.cards}`}>
              <CardItem products={sellerProducts} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
