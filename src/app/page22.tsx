import Image from 'next/image'
import { Inter } from '@next/font/google'
import type { GetStaticProps } from 'next'

import { ContentLayout } from '@/components/contentLayout'
import { Profile } from '@/components/profile'
import { BlogList } from '@/components/blogList'
import type { AllPostsData } from '../types/blog'
import { getStoredPostsData } from '../lib/post'
import styles from './page.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home({allPostsData}: {allPostsData: AllPostsData}) {
  return (
    <main className={styles.main}>
      <ContentLayout>
        <Profile />
        <BlogList />
      </ContentLayout>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getStoredPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
