export default function Die({ holdDice, value, isHeld }) {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die-face"
            style={styles}
            onClick={holdDice}
        >
            <h2 className="die-num" >{value}</h2>
        </div>
    )
}
