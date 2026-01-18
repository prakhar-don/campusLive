import React ,{use, useContext, useState} from 'react'

const RegisteredEventList = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading]= useState(false);

    const {user}= useContext(AppContext);

    const navigate= useNavigate();

    










  return (
    <div>RegisteredEventList</div>
  )
}

export default RegisteredEventList