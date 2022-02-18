import { NextPage } from "next";
import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Editor from "../../components/Editor";
import Textbox from "../../components/Textbox";

const CreatePage: NextPage = () => {
  const [title, setTitle] = useState('')

  return (
    <div style={{'width': '100%'}}>
      <Card>
        <Textbox value={title} onChange={setTitle} big fullWidth placeholder="Title" type="text" />

        <Editor />

        <div className="reverse-btn-row">
          <div className="spacer"></div>
          <Button secondary>Draft</Button>
          <Button color="green">Upload Post</Button>
        </div>
      </Card>
    </div>
  )
}

export default CreatePage