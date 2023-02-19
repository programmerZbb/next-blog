export interface PostsData {
    title: string;
    date: string;
    id: string;
}
export type AllPostsData = Array<PostsData>;

export interface FullPostData {
    title: string;
    date: string;
    id: string;
    contentHtml: string;
}
