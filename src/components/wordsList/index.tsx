import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// import RightArrow from 'public/blog/right-arrow.svg'
import { AllPostsData } from "../../types/blog";
import { BlogListItem } from "../blogListItem";
import { ListWrap } from "../listWrap";

export const WordsList: FC<{
  allPostsData: AllPostsData;
}> = ({ allPostsData }) => {
  return (
    <ListWrap title="自留地" showMoreLink="">
      <>
        {allPostsData.map((data) => (
          <BlogListItem postsData={data} key={data.id} />
        ))}
      </>
    </ListWrap>
  );
};
