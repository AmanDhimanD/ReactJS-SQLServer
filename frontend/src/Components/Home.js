import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchFun = () => {
    fetch("http://localhost:8000")
      .then((response) => {
        //console.log(response.json())
        return response.json();
      })
      .then((dataValue) => {
        //console.log(dataValue);
        setData(dataValue);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    //console.log(data)
    fetchFun();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <p>Loading....</p>
      ) : (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          {data.map((item) => (
            <Link to={`/employee/${item.EMPLOYEE_ID}`}>
              <div
                class=" bg-green-900 max-w-sm rounded overflow-hidden shadow-lg m-2 "
                key={item.EMPLOYEE_ID}
              >
                <div class="px-6 py-6 ">
                  <div class="font-bold text-xl mb-2 text-white">
                    Employee ID: {item.EMPLOYEE_ID}
                  </div>
                  <p class="text-white ">First Name: {item.First_name}</p>
                  <p class="text-white ">Last Name: {item.LAST_NAME}</p>
                  <p class="text-white ">Email: {item.EMAIL}</p>
                  <p class="text-white ">Phone Number: {item.PHONE_NUMBER}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
