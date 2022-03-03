import { doc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import CropImage from "../../components/CropImage";
import Textarea from "../../components/Textarea";
import Textbox from "../../components/Textbox";
import AuthCheck from "../../lib/AuthCheck";
import { AuthContext } from "../../lib/AuthProvider";
import { db } from "../../lib/firebase";
import { validateUsername } from "../../lib/validators";

const EditProfile: NextPage = () => {
  const user = useContext(AuthContext) || null

  const [username, setUsername] = useState(user?.username || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [image, setImage] = useState(user?.photo || '/default profile pic.jpg')

  const router = useRouter()

  const [usernameState, setUsernameState] = useState('neutral')

  const [cropperImage, setCropperImage]: any = useState('')
  const ImageUploadRef: any = useRef(null)

  useEffect(() => {
    checkUsername(username)
  }, [username])

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username !== user?.username) {
        const valid = await validateUsername(username)

        setUsernameState(valid)
      }
      else {
        setUsernameState('neutral')
      }
    }, 500),
    []
  )

  const edit = async () => {
    if (usernameState === 'valid') {
      const ref = doc(db, `users/${user?.uid}`)
      await setDoc(ref, {
        username: username,
        bio: bio,
        email: user?.email,
        photo: image
      })

      router.push(`/profile/${user.username}`)
    }
  }

  const cancel = () => {
    router.push(`/profile/${user.username}`)
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

  return (
    <AuthCheck>
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
              <Button color="green" onClick={edit}>Edit Profile</Button>
              <Button secondary onClick={cancel}>Cancel</Button>
            </div>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}

export default EditProfile