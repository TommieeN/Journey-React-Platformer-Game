import "./WinScreen.scss"

function WinScreen() {
    return (
        <div className="win-screen">
           <p>You Beat the Game!</p>
           <p>Press <span className="win-screen--enter">Spacebar</span> to Restart</p>
        </div>
    )
}

export default WinScreen;