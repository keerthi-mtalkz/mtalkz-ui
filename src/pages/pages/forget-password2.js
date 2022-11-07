import Centered from '../../layouts/centered'
import {withRedux} from '../../lib/redux'
import Form from '../../components/forgot-password-2'
import ls from 'local-storage'
const ForgotPassword = () => {
  return (
    <Centered>
      <Form  email={ls.get("userEmail")}/>
    </Centered>
  )
}

export default withRedux(ForgotPassword)
