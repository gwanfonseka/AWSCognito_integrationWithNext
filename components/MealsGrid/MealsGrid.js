import styles from "./styles.module.css";
import MealItem from "@/components/MealItem/MealItem";

const MealsGrid = ({ meals }) => {
    return (
        <ul className={styles.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsGrid;