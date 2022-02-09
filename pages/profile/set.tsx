import { NextPage } from "next";
import { useState } from "react";
import Card from "../../components/Card";
import ImageButton from "../../components/ImageButton";
import Textbox from "../../components/Textbox";
import { validateUsername } from "../../lib/validators";

const SetProfile: NextPage = () => {
  const [username, setUsername] = useState('')

  return (
    <div className="center">
      <Card>
        <h3 style={{'marginBottom': '0'}}>Your Account has been created!</h3>
        <p style={{'marginBottom': '2em'}}>Now it's time to customise your profile...</p>

        <div style={{'marginBottom': '1.5em'}}>
          <ImageButton src="/default profile pic.jpg" color="blue">Change Profile Pic</ImageButton>
        </div>

        <Textbox type="text" placeholder="Username" value={username} onChange={setUsername} 
        icon validator={() => validateUsername(username)}/>

      </Card>
    </div>
  )
}

export default SetProfile