'use client'

import Link from "next/link";
import { LinkWrapper, MainWrapper } from "../design";

const Community = () => {
    return (
        <MainWrapper>
            <h1>Community</h1>
            <LinkWrapper>
                <Link href='/'>Home</Link>
            </LinkWrapper>
        </MainWrapper>
    );
};

export default Community;