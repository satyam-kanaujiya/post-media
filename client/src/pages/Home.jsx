import Content from "../components/Content"
import Leftbar from "../components/Leftbar"
import Navbar from "../components/Navbar"
import Rightbar from "../components/Rightbar"
import {useState} from 'react';

function Home() {
  const [timeline,setTimeline] = useState(false);
  
  // console.log(timeline);
  const handleTimelineSuccess = (checkTrue) =>{
    setTimeline(checkTrue);
  }
  return (
    <>
      <Navbar handleTimelineSuccess={handleTimelineSuccess}/>
      <div className="flex w-full">
        <Leftbar/>
        <Content timeline={timeline} />
        <Rightbar />
      </div>
      
    </>
  )
}

export default Home