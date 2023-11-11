import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType, NextPage} from 'next';
import {getLiveDetail, getLivesPaths} from "@/lib/data";
import Link from "next/link";
import Head from 'next/head';
import {Live} from "@/lib/definitions";
import {redirect} from "next/navigation";

type Data = {
    title: string;
    image: string;
    type: string;
    description: string;
    id: number;
    route: string;
    source: string;
}

export const getStaticPaths: GetStaticPaths = (async () => {
    const response = await getLivesPaths()
    console.log(response)
    return {
        paths: response.map((item: string) => ({
            params: {id: item}
        })),
        fallback: "blocking", // false or "blocking"
    }
})

export const getStaticProps: GetStaticProps = (async ({params}) => {
    const {id} = params as { id: string }
    console.log(id)
    const data = await getLiveDetail(id)
    if (!data){
        return {
            redirect: {destination: '/lives', permanent: false}
        }
    }
    console.log("DATA EN PROPS", data)
    return {props: {live: data}, revalidate: 60}
})


export default function LiveDetail({live}: InferGetStaticPropsType<typeof getStaticProps>) {
    console.log("RENDERING")
    return (
        <>{live ? (
            <>
                < Head>
                    < title> {live.title || 'LiveDetail'}</title>
                    <meta name="description" content={live.description}/>
                </Head>
                <main>
                    <div className="container">
                        <Link href="/lives" className="m-3 btn btn-primary">
                            <button>Back</button>
                        </Link>
                        <h1>{live.title}</h1>
                        <p>{live.description}</p>
                        <p>{live.id}</p>
                        <Link href={live.route}>More Information here</Link>
                    </div>
                </main>
            </>) : (<></>)
        }
        </>
    )
}
