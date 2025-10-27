export default function Die(props) {
  // create dots dynamically based on dice value
  const dots = Array.from({ length: props.value }, (_, i) => <span key={i} className="dot"></span>);

  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  return (
    <div
      className={`die dots-${props.value}`} // 👈 adds class like dots-3, dots-5
      style={style}
      onClick={props.HoldDice}
    >
      {dots}
    </div>
  );
}
