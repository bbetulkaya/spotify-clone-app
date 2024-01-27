import useSpotify from "@/hooks/useSpotify";
import React from "react";
import { millisToMinutesAndSeconds } from "../../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    try {
      // Check if the Spotify API is available
      if (!spotifyApi) {
        console.error("Spotify API not available.");
        return;
      }
      // Use the Spotify API to play the track
      await spotifyApi.play({
        uris: [track.track.uri],
      });

      // Log success and update state
      console.log(`Track ${track.track.uri} is now playing!`);
      setCurrentTrackId(track.track.id);
      setIsPlaying(true);
    } catch (error) {
      // Log any errors
      console.error("Error playing track:", error);
    }
  };
  return (
    <div
      className="grid grid-cols-2 py-4 px-5 text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40 ">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
