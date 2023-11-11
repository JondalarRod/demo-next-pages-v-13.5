import {Live} from "@/lib/definitions";

export async function getLives(): Promise<any> {
    const result = await fetch(`https://9z720zm66a.execute-api.us-east-1.amazonaws.com/prod/content/live/1`,
        {
            next: {
                revalidate: 10
            }
        }
    )
    return await result.json()
}

export async function getLivesPaths(): Promise<any> {
    const result = await fetch(`https://9z720zm66a.execute-api.us-east-1.amazonaws.com/prod/content/live/1`,
        {
            next: {
                revalidate: 10
            }
        }
    )
    const generalLives = await result.json();
    console.log(generalLives.items)
    return generalLives.items.map((live: Live) => live.category_id.toString());
}

export async function getLiveDetail(idLive: string): Promise<any> {
    const result = await fetch(`https://9z720zm66a.execute-api.us-east-1.amazonaws.com/prod/content/detail/${idLive}`)
    return await result.json()
}
