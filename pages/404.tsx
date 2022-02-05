import Link from 'next/link'
import Button from '../components/Button'

const FourOhFour = () => {
  return (
    <div style={{'textAlign': 'center', 'marginTop': '4em'}}>
      <h2>404 - Page Not Found</h2>
      <Button onClick={() => {}} color="grey">
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  )
}

export default FourOhFour