import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Card from "../../components/Card";
import CropImage from "../../components/CropImage";
import Loader from "../../components/Loader";
import Textarea from "../../components/Textarea";
import Textbox from "../../components/Textbox";
import { setProfilePic } from "../../lib/auth";
import AuthCheck from "../../lib/AuthCheck";
import { AuthContext } from "../../lib/AuthProvider";
import { db } from "../../lib/firebase";
import { validateUsername } from "../../lib/validators";
import { ProfileEditedToast } from "../../lib/toast";

const EditProfile: NextPage = () => {
  const user = useContext(AuthContext) || null

  const [username, setUsername] = useState(user?.username || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [image, setImage] = useState(user?.photo || '/default profile pic.jpg')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [usernameState, setUsernameState] = useState('neutral')

  const [cropperImage, setCropperImage]: any = useState('')
  const ImageUploadRef: any = useRef(null)

  useEffect(() => {
    setUsername(user?.username)
    setBio(user?.bio)
    setImage(user?.photo)
  }, [user])

  useEffect(() => {
    checkUsername(username)
  }, [username])

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (user && username !== user.username) {
        const valid = await validateUsername(username)

        setUsernameState(valid)
      }
      else {
        setUsernameState('neutral')
      }
    }, 500),
    [username]
  )

  const edit = async () => {
    if (usernameState !== 'error') {
      setLoading(true)

      const batch = writeBatch(db)

      // updates profile
      let downloadUrl = user.photo
      if (image !== user.photo) downloadUrl = await setProfilePic(image, user.uid)

      batch.update(doc(db, `users/${user?.uid}`), {
        username: username,
        bio: bio,
        photo: downloadUrl
      })
      
      if (username !== user.username) {
        batch.delete(doc(db, `usernames/${user.username}`))
        batch.set(doc(db, `usernames/${username}`), { uid: user.uid })
      }

      // updates associated posts and comments
      const posts_q = query(collection(db, 'posts'), where('uid', '==', user.uid))
      const comments_q = query(collection(db, 'comments'), where('uid', '==', user.uid))

      const posts = await getDocs(posts_q)
      posts.docs.forEach(post => {
        batch.update(doc(db, `posts/${post.id}`), { authorname: username })
      })

      const comments = await getDocs(comments_q)
      comments.docs.forEach(comment => {
        batch.update(doc(db, `comments/${comment.id}`), { authorname: username, photo: downloadUrl })
      })

      await batch.commit()

      router.push(`/profile/${username}`)
      setLoading(false)

      ProfileEditedToast()
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

  return (
    <AuthCheck>
      <div className="center">
        <div style={{'width': '100%', 'maxWidth': '430px'}}>
          <Card>
            <h2 style={{'marginBottom': '1.2em'}}>Edit Your Profile</h2>

            {loading ? (
              <div className="center">
                <Loader show />
              </div>
            ) : (
              <>
                <div style={{'marginBottom': '1.5em', 'display': 'flex'}}>
                  <input type="file" hidden onChange={uploadImage} ref={ImageUploadRef} />
                  <div style={{'marginRight': '1em'}}>
                    <Avatar src={image} width={3} />
                  </div>

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
                  <Button color="green" onClick={edit}>Confirm</Button>
                  <Button secondary onClick={() => router.back()}>Cancel</Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}

export default EditProfile