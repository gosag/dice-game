export default function Die(props) {
  const dots = Array.from({ length: props.value }, (_, i) => <span key={i} className="dot"></span>);

  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  return (
    <div
      className={`die dots-${props.value}`} 
      style={style}
      onClick={props.HoldDice}
    >
      {dots}
    </div>
  );
}
