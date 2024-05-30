'use client';

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

const TrackModule = ({ track }: { track: CleanTrackInfo }) => {
  return (
    <div className="flex items-center p-2 border border-gray-300 rounded-md max-w-xs">
      <img
        src={track.imageUrl}
        alt={track.name}
        className="w-20 h-20 mr-2 rounded-md"
      />
      <div className="flex-1">
        <h3 className="m-0 text-lg">{track.name}</h3>
        <p className="my-1 text-gray-600">{track.artist}</p>
        <p className="my-1 text-gray-600">{track.albumName}</p>
        <audio controls src={track.previewUrl} className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default TrackModule;
