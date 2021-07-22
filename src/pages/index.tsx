import { Container } from '../components/chakra/Container'
import { DarkModeSwitch } from '../components/chakra/DarkModeSwitch'
import Head from 'next/head'

const Index = () => {
  return (
    <>
    <Head>
      <title>Reddit</title>
    </Head>
      <Container height="100vh">
        Hello World
        <DarkModeSwitch />
      </Container>
    </>
  )
}

export default Index
