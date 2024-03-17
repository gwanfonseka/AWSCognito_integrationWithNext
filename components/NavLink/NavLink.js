'use client';

import Link from "next/link";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }) => {
    const path = usePathname();
    return (
        <Link
            href={href}
            className={path.startsWith(href) ? `${styles.navElement} ${styles.active}` : styles.navElement}>
            {children}
        </Link>
    );
};

export default NavLink;