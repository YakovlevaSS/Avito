import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { DateBlock } from "../dateBlog/DataBlog";

export default function CardItem({ page, products }) {
  return (
    <>
      {products?.map((item) => {
        return (
          <div className={styles.cardsItem} key={item.id}>
            <div className={`${styles.cardsCard} ${styles.card}`}>
              <div className={styles.cardImage}>
                <NavLink
                  to={
                    page === "Мои товары"
                      ? `/myartycle/${item.id}`
                      : `/artycle/${item.id}`
                  }
                >
                  <img
                    src={
                      item.images[0]?.url
                        ? `http://localhost:8090/${item.images[0]?.url}`
                        : "/img/no-foto.png"
                    }
                    alt="product"
                  />
                </NavLink>
              </div>
              <div className={styles.cardContent}>
                <NavLink
                  to={
                    page === "Мои товары"
                      ? `/myartycle/${item.id}`
                      : `/artycle/${item.id}`
                  }
                >
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </NavLink>
                <p className={styles.cardPrice}>{item.price}</p>
                <p className={styles.cardPlace}>{item.user.city}</p>
                <p className={styles.cardDate}>
                  <DateBlock time={item.created_on} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
