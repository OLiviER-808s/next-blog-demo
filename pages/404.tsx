import Link from 'next/link'
import Button from '../components/Button'

const FourOhFour = () => {
  return (
    <div style={{'textAlign': 'center', 'marginTop': '4em'}}>
      <h2>404 - Page Not Found</h2>
      <div className='center'>
        <Button onClick={() => {}} color="grey">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default FourOhFour