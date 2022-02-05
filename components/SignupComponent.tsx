import Button from "./Button"
import Textbox from "./Textbox"

const SignupComponent = () => {
  return (
    <div className="center">

      
      <form>
        <Textbox placeholder="Email" type="email"></Textbox>
        <Textbox placeholder="Password" type="password"></Textbox>
        <Textbox placeholder="Confirm Password" type="password"></Textbox>

        <div style={{'textAlign': 'center'}}>
          <Button color="blue">Next Step</Button>
        </div>
      </form>
    </div>
  )
}

export default SignupComponent