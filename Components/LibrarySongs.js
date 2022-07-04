import React from "react";


const LibrarySong = ({song, songs, setCurrentSong , id, audioRef, isPlaying, setSongs}) => {
    const songSelectHandler = async () => {
        //returns array
        const selectedSong = songs.filter((state) => state.id === id);
        console.log(selectedSong);
        await setCurrentSong(selectedSong[0]);
        // adding active states
       
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                ...song,
                active: true,
                };
            } else {
                    return{
                        ...song,
                        active: false,
                };
            }
        });
        setSongs(newSongs);
        if(isPlaying) audioRef.current.play();

        //checks if song is playing
   
    };
    return (                                                      //if song is active add selected as a class
        <div onClick={songSelectHandler} className={`Library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
       

    )
}

export default LibrarySong;
/*const newSongs = songs.map((song) => {
    if(song.id === id){
        return{
            ...song,
            active: true,
        }
    }   else{
         return{
        ...song,
        active: false,
        };
    }
});
setSongs(newSongs);
*/