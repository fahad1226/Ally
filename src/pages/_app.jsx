import '@/styles/tailwind.css'
import 'focus-visible'
import '../components/Tiptap/MenuBar.scss'
import '../components/Tiptap/MenuItem.scss'
import '../styles/editor.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
