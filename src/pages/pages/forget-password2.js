import Centered from '../../layouts/centered'
import {withRedux} from '../../lib/redux'
import Form from '../../components/forgot-password-2'

const ForgotPassword = () => {
  return (
    <Centered>
      <Form  email={localStorage.getItem("userEmail")}/>
    </Centered>
  )
}

export default withRedux(ForgotPassword)
