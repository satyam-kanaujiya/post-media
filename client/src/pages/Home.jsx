import Content from "../components/Content"
import Leftbar from "../components/Leftbar"
import Navbar from "../components/Navbar"
import Rightbar from "../components/Rightbar"
import {useState} from 'react';

function Home() {
  const [timeline,setTimeline] = useState(false);
  
  const handleTimelineSuccess = (checkTrue) =>{
    setTimeline(checkTrue);
  }
  return (
    <>
      <Navbar handleTimelineSuccess={handleTimelineSuccess} timeline={timeline}/>
      <div className="flex w-full">
        <Leftbar/>
        <Content timeline={timeline} />
        <Rightbar />
      </div>
      
    </>
  )
}

export default Home