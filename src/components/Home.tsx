import { Allotment } from 'allotment'
import useWindowDimensions from 'lib/useWindowDimensions'
import SectionList from './SectionList'
import PageList from './PageList'
import Editor from './Editor'
import Header from './Header'

const Home = () => {
  const { width, height } = useWindowDimensions()

  return (
    <div className="app-wrapper">
      <Header />
      <Allotment defaultSizes={[200, 200, width - 400]} minSize={150}>
        <SectionList />
        <PageList />
        <Editor />
      </Allotment>
    </div>
  )
}

export default Home
