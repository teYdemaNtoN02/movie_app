import Header from "../components/Header";
import "../css/Home.css";

function Home(){
    return (
        <div className="Home">
            <Header />
            <div className="Informations">
                <h1>Welcome to MovieApp</h1>
                <p>This website was created to showcase the power of React and TypeScript.</p>
            </div>
        </div>
    );
}

export default Home;