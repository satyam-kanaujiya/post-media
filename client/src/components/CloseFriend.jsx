
import noUserImg from '../assets/noProfile.jpg';
function CloseFriend({friend}) {
  return (
    <li className="flex items-center gap-2">
        <img src={friend.profilePicture || noUserImg} alt="person" className="w-8 h-8 aspect-square object-cover rounded-[50%]"/>
        <span>{friend.username || "anonymous"}</span>
    </li>
)}

export default CloseFriend