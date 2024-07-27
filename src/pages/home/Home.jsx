import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  //below the memo hook is used to stop rerendering as because the value always remains conatant
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  // represents the current statistics 
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    //The original stats for the new Users every month is being fetched requesting the API
    const getStats = async () => {
      try {
        const res = await axios.get("https://netflix-mern-backend.onrender.com/api/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTdmNjFjNTFjZmQ3NjNhYzc2OGMxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTQ0OTcyMSwiZXhwIjoxNzUyOTg1NzIxfQ.w-p_iPxt4VXnvgYWi3OPFs7cYRDnDmMTIbD-_6m8YMI"          
            },
        });
        //The Months os the stats are being sorted so that the data appears sequentially
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        //Now the user state is being set
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,//this line represents the previous state before setting up the userStats again
            { name: MONTHS[item._id - 1], "New User": item.total },//This line adds two more obj to the currently occuring element
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);



  return (
    <div className="home">
      <FeaturedInfo />
      {/* below the fetched data from the api is being passed to ensure the availability of the graph acc to data */}
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
      </div>
    </div>
  );
}
