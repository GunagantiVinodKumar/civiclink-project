function ButtonClickEvent(){

    const handleClick = (e) => e.target.textContent = "Dead";

     return(<button onDoubleClick={(e) => handleClick(e)}>HouseFly</button>)
}
export default ButtonClickEvent