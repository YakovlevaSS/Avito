import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function SearchBlog({ products, setSortData }) {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (search) {
      const sortProducts = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      setSortData(sortProducts);
    } else {
      setSortData(products);
    }
  };

  return (
    <div className={`${styles.mainSearch} ${styles.search}`}>
      <NavLink className={styles.searchLogoLink} to="/">
        <img className={styles.searchLogoImg} src="img/logo.png" alt="logo" />
      </NavLink>
      <NavLink className={styles.searchLogoMobLink} to="/">
        <img
          className={styles.searchLogoMobImg}
          src="img/logo-mob.png"
          alt="logo"
        />
      </NavLink>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <input
          className={styles.searchTextMob}
          type="search"
          placeholder="Поиск"
          name="search-mob"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button className={`${styles.searchBtn} ${styles.btnHov02}`}>
          Найти
        </button>
      </form>
    </div>
  );
}
