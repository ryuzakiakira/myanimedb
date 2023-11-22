import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SummaryPage from "../components/UI/SummaryPage";
import LoadingIndicator from '../components/UI/LoadingIndicator';

function DetailsPage() {
    const [anime, setAnime] = useState(null);
    const [manga, setManga] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { mangaId, animeId } = useParams();

    const getManga = async () => {
        setIsLoading(true);

        try {
            const temp = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/full`);
            const manga = await temp.json();
            setManga(manga.data);
            setAnime(null);
        } catch (err) {
            throw new Error('Something went wrong', err);
        } finally {
          setIsLoading(false);
        }
    }

    const getAnime = async () => {
      setIsLoading(true)
        try {
            const temp = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
            const anime = await temp.json();
            setAnime(anime.data);
            setManga(null);
        } catch (err) {
            throw new Error('Something went wrong', err);
        } finally {
          setIsLoading(false)
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
            {isLoading && <LoadingIndicator />}
            {!isLoading && manga && !anime && <SummaryPage data={manga} id={mangaId} />}
            {!isLoading && anime && !manga && <SummaryPage data={anime} id={animeId} />}
        </>
    )
}

export default DetailsPage;