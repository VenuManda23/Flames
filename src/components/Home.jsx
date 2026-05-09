import React, { useState } from "react";
import axios from "axios";

function Home() {
    const [name, setName] = useState("");
    const [pname, setPartnername] = useState("");
    const [result, setResult] = useState("");

    const calculate = () => {
        const data = [
            "Friends",
            "Lovers",
            "Affection",
            "Marriage",
            "Enemy",
            "Sister"
        ];
        let first=name.toLowerCase().replace(/\s/g, "");
        let second=pname.toLowerCase().replace(/\s/g, "");

        if(name==="" || pname===""){
            alert("Please enter both names");
            return;
        }

        for(let char of first){
            if(second.includes(char)){
                first=first.replace(char,"");
                second=second.replace(char,"");
            }
        }
        let count=first.length+second.length;
        let index=0;
        while(data.length>1){
            index=(index+count-1)%data.length;
            data.splice(index,1)
        }
        const finalResult = data[0];

        setResult(finalResult);

        axios.post("https://backend-flames.onrender.com/flames",{
            name:name,
            partner_name:pname,
            result:finalResult
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    };

    return (
        <div className="body">
            <h1>Welcome to Flames Website</h1>

            <p>Enter your Name:</p>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
             id="inp"/>

            <p>Enter your Partner Name:</p>
            <input
                type="text"
                onChange={(e) => setPartnername(e.target.value)}
             id="inp"/>

            <br /><br />

            <button onClick={calculate}>
                Find your relation
            </button>

            <p id="con">
                {result}
            </p>
        </div>
    );
}

export default Home;