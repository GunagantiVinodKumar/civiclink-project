import { useState } from "react";
function Proof(){
    const [visible, setVisible] = useState(true);

    return(
        visible &&(
            <img
            className="inv"
            src={profile}
            alt="profile"
            onClick={() => setVisible(false)}
            />
        )
    );
}
export default Proof