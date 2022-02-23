import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import SectionList from './SectionList'
import PageList from './PageList'
import Editor from './Editor'
import Header from './Header'

const Home = () => (
  <div className="app-wrapper">
    <Header />
    <div className="main">
      <ReflexContainer orientation="vertical" windowResizeAware>
        <ReflexElement minSize={120} maxSize={250}>
          <SectionList />
        </ReflexElement>
        <ReflexSplitter className="reflex-border" />
        <ReflexElement minSize={120} maxSize={250}>
          <PageList />
        </ReflexElement>
        <ReflexSplitter propagate className="reflex-border" />
        <ReflexElement>
          <Editor />
        </ReflexElement>
      </ReflexContainer>
    </div>
  </div>
)

export default Home
