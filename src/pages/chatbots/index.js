import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'


const Chatbots=()=>{
    return (
        <Layout>
     <SectionTitle title="Chatbot" subtitle="" />
       
      </Layout>
    )
}

export default withRedux(Chatbots)
