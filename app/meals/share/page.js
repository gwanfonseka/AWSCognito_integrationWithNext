'use client'

import Link from "next/link";
import { LinkWrapper, MainWrapper } from "../../design";

const Share = () => {
    return (
        <MainWrapper>
            <h1>Share a meal</h1>
            <LinkWrapper>
                <Link href='/meals'>Back to meals</Link>
            </LinkWrapper>
        </MainWrapper >
    );
};

export default Share;