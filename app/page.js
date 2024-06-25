"use client";

import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>
        Hi from the initial beta version for MKT-Coverage :o
      </h1>

      <h2>
        Take a look to this page and try the item coverage online tool for Mario Kart Tour
      </h2>

      <ul>
        <li> <a href="http://localhost:3000/Coverage"> Item Coverage page</a></li>

      </ul>
    </main>
  );
}
