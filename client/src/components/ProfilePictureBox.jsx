import React,{useState,useEffect} from 'react'


const ProfilePictureBox = ({userId}) => {
    const [pictureURL,setPictureURL] = useState("")

    useEffect(()=>{
        const getPictureURL = async (userID)=>{
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${userID}`)
            const data = await res.json()
            setPictureURL(data.profileURL)
        }
        getPictureURL(userId)
    },[])
  return (
    <div>
        <img src={pictureURL} alt={userId} className="w-5 h-5 object-cover" />
    </div>
  )
}

export default ProfilePictureBox