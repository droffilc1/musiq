interface PlaylistCardProps {
  name: string;
  imageUrl: string;
  spotifyUrl: string;
}

const PlaylistCard = ({ name, imageUrl, spotifyUrl }: PlaylistCardProps) => {
  return (
    <li className="playlist-card">
      <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={`${name} cover`} width={150} height={150} />
        <h3>{name || "No Description"}</h3>
      </a>
    </li>
  );
};

export default PlaylistCard;

