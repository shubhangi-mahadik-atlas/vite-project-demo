import axios from "axios";
import React, { useState, useEffect } from "react";

interface ShowProps {}
interface IUser {
    id: string; 
    name: string;
    image: string; 
}

const initialUser: IUser = { id: "", name: "", image: "" };

const Show: React.FC<ShowProps> = () => {
    const [user, setUser] = useState<IUser>(initialUser);
    const [users, setUsers] = useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("https://api.restful-api.dev/objects");
                console.log(result);
                const mappedUsers: IUser[] = result.data.map((item: any) => ({
                    id: item.id || '', 
                    name: item.name || 'No Name',
                    image: item.data?.image || '' 
                }));
                setUsers(mappedUsers);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const user = users.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()));
        const d = user?.length > 0? user : [];
        setUsers(d)
    };

    const shuffleArray = ()=> {
        // Create a shallow copy of the array to avoid mutating the state directly
        const newArray = [...users]; 
        
        let currentIndex = newArray.length;
        let randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
      
            // And swap it with the current element.
            [newArray[currentIndex], newArray[randomIndex]] = [
                newArray[randomIndex], newArray[currentIndex]
            ];
        }
      setUsers(newArray);
    };

    return (
        <>
            fname: <input type="text" value={searchTerm} onChange={search}/>
                         <br/><button onClick={() => { shuffleArray() }}>Shuffle</button>
            <hr />
            
            {users.map((u) => {
                return (
                    <React.Fragment key={u.id}>
                        <h1>{u.name}</h1>
                        <hr />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default Show;