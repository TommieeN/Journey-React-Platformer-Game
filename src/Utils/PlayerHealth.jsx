import Heart from "../Assets/Health/HP_Value_0.png"
import "./PlayerHealth.scss"


function PlayerHearts() {
    return (
        <div className="heart-container">
            <img src={Heart} alt="Player Hearts" />
        </div>
    )
}

export default PlayerHearts;