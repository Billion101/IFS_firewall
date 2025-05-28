import './Home.css'
import memeImage from '../src/assets/image.jpg' 

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome Home!</h1>
       <img src={memeImage} alt="meme" className="home-image" />
    </div>
  )
}

export default Home
