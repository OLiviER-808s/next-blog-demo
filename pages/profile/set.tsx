import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Textarea from "../../components/Textarea";
import Textbox from "../../components/Textbox";
import { auth, db } from "../../lib/firebase";

const SetProfile: NextPage = () => {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('/default profile pic.jpg')

  const [user] = useAuthState(auth)
  const router = useRouter()

  const [usernameState, setUsernameState] = useState('neutral')

  useEffect(() => {
    checkUsername(username)
  }, [username])

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      const length = username.length

      if (length < 3 || length > 25 || username === 'set' || username === 'edit') {
        setUsernameState('neutral')
      }
      else {
        const ref = collection(db, 'users')
        const q = query(ref, where('username', '==', username))
        const snap = await getDocs(q)
        const exists = snap.size > 0
        setUsernameState(exists ? 'error' : 'valid')
      }
    }, 500),
    []
  )

  const create = async () => {
    if (usernameState === 'valid') {
      const ref = doc(db, `users/${user?.uid}`)
      await setDoc(ref, {
        username: username,
        bio: bio,
        email: user?.email,
        photo: image
      })

      router.push('/')
    }
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
          icon validationState={usernameState} error_msg="Username is already taken"/>

          <Textarea placeholder="Bio" height={6} value={bio} onChange={setBio}/>

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