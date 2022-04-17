import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { DATA_TEMPLATE_EXAMPLE } from '../constants'
import Topbar from '../src/Topbar'
import Subscriptions from '../src/Subscriptions'
import Budgeting from '../src/Budgeting'
import Cashflow from '../src/Cashflow'

const Home: NextPage = () => {
  const [data, setData] = useState(DATA_TEMPLATE_EXAMPLE);

  const subscriptionsProps = {
    rows: data.subscriptions
  }

  return (
    <div className="wrapper">
      <Head>
        <title>gliss.to</title>
        <meta name="description" content="template your cashflow to be mindful of your finances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />

      {/* TODO: can abstract each layouts' content (left, centre, right) */}
      <div className="layout">
        <div className="layout--left">
          <Subscriptions {...subscriptionsProps} />
        </div>
        <div className="layout--centre">
          <Budgeting />
        </div>
        <div className="layout--right">
          <Cashflow />
        </div>
      </div>

    </div>
  )
}

export default Home
