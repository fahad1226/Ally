import CustomEditor from '@/components/CustomEditor'
import { GrammerLayout } from '@/components/GrammerLayout'
import { Header } from '@/components/Header'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Check Grammer</title>
      </Head>
      <Header />
      <GrammerLayout title="Correct your grammer">
        <div className="space-y-6">
          <CustomEditor />
        </div>
      </GrammerLayout>
    </>
  )
}
