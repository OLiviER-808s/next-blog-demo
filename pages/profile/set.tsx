import { doc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Textarea from "../../components/Textarea";
import Textbox from "../../components/Textbox";
import { useUsernameCheck } from "../../lib/auth";
import { auth, db } from "../../lib/firebase";
import { validateUsername } from "../../lib/validators";

const SetProfile: NextPage = () => {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('/default profile pic.jpg')

  const [error, setError] = useState(false)

  const [user] = useAuthState(auth)
  const router = useRouter()

  const create = async () => {
    if (!validateUsername(username)) return;

    const usernameAccepted = await useUsernameCheck(username);

    if (usernameAccepted) {
      const ref = doc(db, `users/${user?.uid}`);
      await setDoc(ref, {
        username: username,
        bio: bio,
        email: user?.email,
        photo: image
      });

      router.push('/');
    }
    else setError(true);
  }

  return (
    <div className="center">
      <div style={{'width': '100%', 'maxWidth': '430px'}}>
        <Card>
          <h3 style={{'marginBottom': '0'}}>Your Account has been created!</h3>
          <p style={{'marginBottom': '2em'}}>Now it's time to customise your profile...</p>

          <div style={{'marginBottom': '1.5em', 'display': 'flex'}}>
            <Avatar src={image} width={3} />
            <Button color="blue">Change Profile Pic</Button>
          </div>

          <Textbox type="text" placeholder="Username" value={username} onChange={setUsername} 
          icon validator={() => validateUsername(username)} error={error}/>

          <Textarea placeholder="Bio" height={6} value={bio} onChange={setBio}/>

          {error && <p className="error">Username is already taken. Try entering a different one</p>}

          <div className="btn-row">
            <Button color="green" onClick={create}>Create Profile</Button>
            <Button secondary>Skip for Now</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SetProfile