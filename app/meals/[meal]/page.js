'use client'

import Link from "next/link";
import { LinkWrapper, MainWrapper } from "../../design";

const Meal = () => {
    return(
        <MainWrapper>
            <h1>This is meal 1 route</h1>
            <LinkWrapper>
                <Link href='/'>Home</Link>
                <Link href='/meals'>Back to meals</Link>
            </LinkWrapper>
        </MainWrapper>
    );
};

export default Meal;