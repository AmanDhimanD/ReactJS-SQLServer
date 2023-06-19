import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function All() {
  const [apiData, setApiData] = useState([]);

  const { id } = useParams();

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

  const user = apiData.find((item) => item.EMPLOYEE_ID.toString() === id);

  return (
    <div className="flex justify-center items-center ">
      <div>
        <h1 className="text-center font-bold pt-10">User Details:</h1>
        {user ? (
          <div>
            {Object.entries(user).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default All;
