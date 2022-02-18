import { NextPage } from "next";
import { useState } from "react";
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
      </Card>
    </div>
  )
}

export default CreatePage