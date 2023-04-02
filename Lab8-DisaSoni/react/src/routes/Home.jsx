import Question from "../components/Question";
export default function Home(){
    return(
        <main id="main">
            <h1>Welcome to Trivia</h1>
            <p> Here is some random Question</p>
            <Question />
        </main>
    );
}