import YouTube from "react-youtube";

const opts = {
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
};

export default function YTVideo({videoId}) {
    return (
        <YouTube
            opts={opts}
            videoId={videoId}/>
    )
}
