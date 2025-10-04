import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUsersTo, type IUser } from '../redux/slice';

function Users() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const reduxUsers: IUser[] = useSelector(state => state.data);

        useEffect(() => {
                getEmp();
        }, []);

        const getEmp = () => {
            const token = localStorage.getItem('token');
            if (token != undefined) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                axios.get('http://localhost:9999/emps', {
                    headers
                }).then((result) => {
                    dispatch(setUsersTo(result.data))
                }).catch((err) => {
                    console.log(err);
                });
            }

        }

        const deleteEmp = (id: number) => {
            const token = localStorage.getItem('token');
            if (token != undefined) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                axios.delete('http://localhost:9999/emps/' + id?.toString(), {
                    headers
                }).then(() => {
                    getEmp();
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    return ( <> 
                
                <table width={"100%"}>
                    <thead>
                    <tr>
                        <th style={ {border: "1px solid white"}}>Id</th>
                        <th style={ {border: "1px solid white"}}>Name</th>
                        <th style={ {border: "1px solid white"}}>Address</th>
                        <th style={ {border: "1px solid white"}}>Edit</th>
                        <th style={ {border: "1px solid white"}}>Delete</th>
                    </tr>
                    </thead>
                    <tbody> {reduxUsers.map((user) => (
                    <tr key={user.No}>
                        <td style={ {border: "1px solid white"}} >
                            <h3>{user.No}</h3>
                        </td>
                        <td style={ {border: "1px solid white"}}>
                            <h3>{user.Name}</h3>
                        </td>
                        <td style={ {border: "1px solid white" }}>
                            <h3> {user.Address}</h3>
                        </td>
                        <td style={ {border: "1px solid white" }} 
                        onClick={() => navigate(`/user/${user.No}`, {replace: true})}>
                            <h3> Edit</h3>
                        </td>
                        <td style={ {border: "1px solid white" }} onClick={() => deleteEmp(user.No)}>
                            <h3> Delete</h3>
                        </td>
                        </tr>
                    ))}</tbody>
                </table>
     </>);
    
}

export default Users;