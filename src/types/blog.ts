import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'

export interface PostsData {
    title: string;
    date: string;
    id: string;
}
export type AllPostsData = Array<PostsData>;

export type Menu = AnchorLinkItemProps[];

export interface FullPostData {
    title: string;
    date: string;
    contentHtml: string;
    menu?: Menu;
}
