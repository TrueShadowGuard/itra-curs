import YouTube from "react-youtube";

const opts = {
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
};

export default function YTVideo({videoId}) {
    const video = videoId?.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
    return (
        <YouTube
            opts={opts}
            videoId={video && video[2]}/>
    )
}
