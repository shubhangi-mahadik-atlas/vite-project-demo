import {useEffect, useState, type FunctionComponent} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddUser: FunctionComponent= () => {
        const navigate = useNavigate();
        const [user, setUser] = useState({
            No: 0,
            Name: "",
            Address: ""
        });
        const params = useParams();

         useEffect(() => {
            if (Number(params.id) > 0) {
            getEmp();
            }
        }, []);

        const getEmp = () => {
            const token = localStorage.getItem('token');
            if (token != undefined) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                axios.get('http://localhost:9999/emps/' + params.id?.toString() , {
                    headers
                }).then((result) => {
                    if (result.data.length > 0) {
                    setUser(result.data[0]);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }

        const editEmp = () => {
            const token = localStorage.getItem('token');
            if (token != undefined) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                axios.put('http://localhost:9999/emps/' + params.id?.toString(), user, {
                    headers
                }).then((result) => {
                    setUser(result.data[0]);
                    navigate('/users', {replace: true});
                }).catch((err) => {
                    console.log(err);
                });
            }
        }

        const OnTextChange = (e) => {
            const replicaUser = {
                ...user
            };
            replicaUser[e.target.name] = e.target.value;
            setUser(replicaUser);
        }

        const addUser = () => {
            const token = localStorage.getItem('token');
            if (token != undefined) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                axios.post('http://localhost:9999/emps', user, {
                    headers
                }).then((result) => {
                    console.log(result);
                    navigate('/users', {replace: true});
                }).catch((err) => {
                    console.log(err);
                });
            }
        }

    return (<>
            Name : 
            <input type="text" name="Name" value={user.Name} onChange={OnTextChange}/>
            <hr/>
            Address : 
            <input type="text" name="Address" value={user.Address} onChange={OnTextChange}/>
            <hr/>
            <button onClick={Number(params.id) > 0 ? editEmp: addUser}>Add User</button>
        </>);
}

export default AddUser;

