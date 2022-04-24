import { useState } from 'react'
import Head from 'next/head'
import Topbar from '../src/Topbar'
import Subscriptions from '../src/Subscriptions'
import Budgeting from '../src/Budgeting'
import Cashflow from '../src/Cashflow'

const Home = () => {

  // for lifting
  const [ ts, setTs ] = useState(0);
  const [ tb, setTb ] = useState(0);
  const [ refresh, setRefresh ] = useState(false);

  const handleChangeTs = (total) => {
    setTs(total);
    setRefresh(!refresh)
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
          <Subscriptions onChangeTotal={handleChangeTs} />
        </div>
        <div className="layout--centre">
          <Budgeting onChangeTotal={setTb} />
        </div>
        <div className="layout--right">
          <Cashflow ts={ts} tb={tb} />
        </div>
      </div>

    </div>
  )
}

export default Home
