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
    <ListWrap title="自留地" showMoreLink="https://github.com/programmerZbb/notes">
      <>
        {allPostsData.map((data) => (
          <BlogListItem href={`/words/${data.id}`} postsData={data} key={data.id} />
        ))}
      </>
    </ListWrap>
  );
};
