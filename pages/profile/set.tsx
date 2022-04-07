import { doc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import CropImage from "../../components/CropImage";
import Textarea from "../../components/Textarea";
import Textbox from "../../components/Textbox";
import { setProfilePic } from "../../lib/auth";
import { auth, db } from "../../lib/firebase";
import { validateUsername } from "../../lib/validators";

const SetProfile: NextPage = () => {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('/default profile pic.jpg')

  const [user] = useAuthState(auth)
  const router = useRouter()

  const [usernameState, setUsernameState] = useState('neutral')

  const [cropperImage, setCropperImage]: any = useState('')
  const ImageUploadRef: any = useRef(null)

  useEffect(() => {
    checkUsername(username)
  }, [username])

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      const valid = await validateUsername(username)

      setUsernameState(valid)
    }, 500),
    []
  )

  const create = async () => {
    if (usernameState === 'valid') {
      const ref = doc(db, `users/${user?.uid}`)

      let downloadUrl;
      if (image !== '/default profile pic.jpg') downloadUrl = await setProfilePic(image, user?.uid)

      await setDoc(ref, {
        username: username,
        bio: bio,
        email: user?.email,
        photo: image
      })

      router.push('/')
    }
  }

  const uploadImage = (e: any) => {
    if (e.target.files.length === 0) return;

    const file: File = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      setCropperImage(reader.result)
    }
  }

  const updateProfilePic = (img: any) => {
    setImage(img)
    setCropperImage('')
  }

  const skip = async () => {
    let name: any = user?.email?.split('@')[0]
    for (let i = 0; i < 4; i++) {
      name += String(Math.floor(Math.random() * 10))
    }
    
    const valid = await validateUsername(name)

    if (valid === 'valid') {
      const ref = doc(db, `users/${user?.uid}`)
      await setDoc(ref, {
        username: name,
        photo: '/default profile pic.jpg',
        email: user?.email
      })

      router.push('/')
    }
    else {
      skip()
    }
  }

  return (
    <div className="center">
      <div style={{'width': '100%', 'maxWidth': '430px'}}>
        <Card>
          <h3 style={{'marginBottom': '0'}}>Your Account has been created!</h3>
          <p style={{'marginBottom': '2em'}}>Now it's time to customise your profile...</p>

          <div style={{'marginBottom': '1.5em', 'display': 'flex'}}>
            <input type="file" hidden onChange={uploadImage} ref={ImageUploadRef} />
            <Avatar src={image} width={3} />
            <Button color="blue" onClick={() => ImageUploadRef ? ImageUploadRef.current.click() : null}>
              Change Profile Pic
            </Button>
          </div>

          {cropperImage && <CropImage src={cropperImage} onEnd={updateProfilePic}
          onCancel={() => setCropperImage('')} />}

          <Textbox type="text" placeholder="Username" value={username} onChange={setUsername} 
          icon validationState={usernameState} error_msg="Username is already taken"/>

          <Textarea placeholder="Bio" height={6} value={bio} onChange={setBio}/>

          <div className="btn-row">
            <Button color="green" onClick={create}>Create</Button>
            <Button secondary onClick={skip}>Skip for Now</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SetProfile