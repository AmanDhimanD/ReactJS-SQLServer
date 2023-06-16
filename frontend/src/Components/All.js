import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function All() {
  const [apiData, setApiData] = useState([]);
  //const [selectedUser, setSelectedUser] = useState(null);

  const { id } = useParams();
  //console.log(id)

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // useEffect(() => {
  //   if (apiData.length > 0) {
  //     const user = apiData.find((item) => item.EMPLOYEE_ID.toString() === id);
  //     console.log(user)
  //     setSelectedUser(user);
  //   }
  // }, [apiData, id]);

  const user = apiData.find((item) => item.EMPLOYEE_ID.toString() == id);

  return (
    <div className="flex justify-center items-center ">
      <div>
        <h1 className="text-center font-bold pt-10">User Details:</h1>
        {user ? (
          <div>
            <p>Employee ID: {user.EMPLOYEE_ID}</p>
            <p>First Name: {user.First_name}</p>
            <p>Last Name: {user.LAST_NAME}</p>
            <p>Email: {user.EMAIL}</p>
            <p>Phone Number: {user.PHONE_NUMBER}</p>
            {/* Render other properties as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default All;
