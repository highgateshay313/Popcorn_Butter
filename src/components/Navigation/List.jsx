
import styles from './List.module.css';

function List() {
    return (
        <div className={styles.list}>
              <ul className={styles.list_items}>
                    <li className={styles.item}>In Theaters</li>
                    <li className={styles.item}>Popular</li>
                    <li className={styles.item}>Most Rated</li>
                    <li className={styles.item}>PG13 Movies</li>
                </ul>
        </div>
    )
}

export default List;