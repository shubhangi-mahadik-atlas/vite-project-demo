import type {FunctionComponent} from "react";
import { useSelector } from "react-redux";
import { type IUser } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const Home: FunctionComponent = () => {
    const navigate = useNavigate();

    const users: IUser[] = useSelector(state => state.data);

return <>
    <ul> {users.map((user) => (
        <li key={user.No}>{user.Name}</li>
))}</ul>

    <button onClick={() => {navigate('/about', {replace: true})}}>Add</button>
    </>
    
}
export default Home;