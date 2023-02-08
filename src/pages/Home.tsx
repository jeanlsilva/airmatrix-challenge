import { Menu } from "../components/Menu";

export function Home() {
    return (
        <div className='video-container'>
            <iframe 
                src="https://www.youtube.com/embed/Kt2noQR5lUA?controls=0&amp;start=7&autoplay=1&playlist=Kt2noQR5lUA&loop=1&mute=1" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>
            <Menu page='home' />
        </div>
    )
}