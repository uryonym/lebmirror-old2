import SectionList from './SectionList'
import PageList from './PageList'
import Editor from './Editor'
import Header from './Header'

const Home = () => (
  <div className="app-wrapper">
    <Header />
    <div className="main">
      <SectionList />
      <PageList />
      <Editor />
    </div>
  </div>
)

export default Home
