import Layout from '../components/Layout'
import '../styles/globals.css'
import { AuthProvider } from '../utils/AuthContext'
import { BasketProvider } from '../utils/PanierContext'

function MyApp({ Component, pageProps }) {
  return <div>
    <BasketProvider>
      <AuthProvider >

        <Layout>
          <Component {...pageProps} />
        </Layout>

      </AuthProvider>
    </BasketProvider>
  </div>
}

export default MyApp
