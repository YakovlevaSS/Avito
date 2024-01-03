import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import SearchBlog from "../../components/searchBlog/SearchBlog";
import CardItem from "../../components/card/Card";
import { useGetAllProductsQuery } from "../../store/RTKQuery/adsApi";

export default function MainPage() {
  const { data = [], isLoading } = useGetAllProductsQuery();
  console.log(data);
  const [sortData, setSortData] = useState(data);

  // useEffect(() => {
  //   setSortData(data);
  // }, [data]);

  return !isLoading ? (
    <main className={styles.main}>
      <SearchBlog products={data} setSortData={setSortData}/>
      <div className={styles.mainContainer}>
        <h2 className={styles.mainH2}>Объявления</h2>
        <div className={styles.mainContent}>
          <div className={`${styles.contentCards} ${styles.cards}`}>
            <CardItem products={sortData.length !== 0? sortData : data} page="Объявления" />
          </div>
        </div>
      </div>
    </main>
  ) : (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
  );
}
