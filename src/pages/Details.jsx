import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SummaryPage from "../components/UI/SummaryPage";
import LoadingIndicator from '../components/UI/LoadingIndicator';

function DetailsPage() {
    const [anime, setAnime] = useState(null);
    const [manga, setManga] = useState(null);
    const { mangaId, animeId } = useParams();

    const getManga = async () => {
        try {
            const temp = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/full`);
            const manga = await temp.json();
            setManga(manga.data);
        } catch (err) {
            throw new Error('Something went wrong', err);
        }
    }

    const getAnime = async () => {
        try {
            const temp = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
            const anime = await temp.json();
            setAnime(anime.data);
        } catch (err) {
            throw new Error('Something went wrong', err);
        }
    }

    useEffect(() => {
        if (mangaId) {
            getManga();
        }
        
        if (animeId) {
            getAnime();
        }
    }, [mangaId, animeId])
    
    return (
        <>
            {!manga && !anime && <LoadingIndicator />}
            {manga && !anime && <SummaryPage data={manga} id={mangaId} />}
            {anime && !manga && <SummaryPage data={anime} id={animeId} />}
        </>
    )
}

export default DetailsPage;