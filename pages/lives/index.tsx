import {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next';
import {lusitana} from '@/ui/fonts';
import {getLives} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {Live} from "@/lib/definitions";


export const getStaticProps: GetStaticProps = (async (context) => {
    const response = await getLives()
    return { props: { items: response.items } }
})


function LivesPge  ({ items }: InferGetStaticPropsType<typeof getStaticProps>) {
    const RenderLives = () => {
        return (
            items.map((item: Live) => {
                return (
                    <div key={item.category_id}>
                        <Image
                            src={item.image}
                            className=""
                            alt={`${item.title}'s profile picture`}
                            width={350}
                            height={100}
                        />
                        <Link href={`/live/${item.category_id}`}><h3>{item.title}</h3></Link>
                    </div>
                )
            })
        )
    }

    return (
        <main>
            <Head>
                 <title>{ 'Lives' }</title>
            </Head>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <RenderLives/>
            </div>
        </main>
    );
}

export default LivesPge
