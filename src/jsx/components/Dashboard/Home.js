import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { SVGICON } from "./Content";
import { TeacherDetails } from "./Elements/TeacherDetails";
import { UnpaidStudentTable } from "./Elements/UnpaidStudentTable";
import fetchData from "../../../axios";

const SchoolPerformance = loadable(() =>
  pMinDelay(import("./Elements/SchoolPerformance"), 2000)
);
const SchoolOverView = loadable(() =>
  pMinDelay(import("./Elements/SchoolOverView"), 1000)
);

const cardBlog = [
  {
    title: "Companies",
    svg: SVGICON.user2,
    number: "200",
    change: "teach-data",
  },
  { title: "Managers", svg: SVGICON.event, number: "55", change: "event-data" },
  { title: "Individuals", svg: SVGICON.user, number: "24", change: "std-data" },
  {
    title: "Certificates",
    svg: SVGICON.message,
    number: "20",
    change: "food-data",
  },
];

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  const makeRequest = fetchData();
  const [cardBlog, setCardBlog] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    makeRequest("GET", "/info/super-admin-dashboard-data")
      .then((res) => {
        setDashboardData(res.data.response);
        console.log(res.data.response?.new_company_users);
        setCardBlog([
          {
            title: "Companies",
            svg: SVGICON.user2,
            number: res.data.response.company_users_count,
            change: "teach-data",
          },
          {
            title: "Managers",
            svg: SVGICON.user2,
            number: res.data.response?.manager,
            change: "event-data",
          },
         
          {
            title: "Individuals",
            svg: SVGICON.user,
            number: res.data.response.individual_users_count,
            change: "std-data",
          },
          {
            title: "Certificates",
            svg: SVGICON.message,
            number: res.data.response.certificates_count,
            change: "food-data",
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body pb-xl-4 pb-sm-3 pb-0">
              <div className="row">
                {cardBlog?.map((item, ind) => (
                  <div className="col-xl-3 col-6" key={ind}>
                    <div className="content-box">
                      <div className={`icon-box icon-box-xl ${item?.change}`}>
                        {item?.svg}
                      </div>
                      <div className="chart-num">
                        <p>{item?.title}</p>
                        <h2 className="font-w700 mb-0">{item?.number}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 ">
          <div className="card crypto-chart ">
            <div className="card-header pb-0 border-0 flex-wrap">
              <div className="mb-2 mb-sm-0">
                <div className="chart-title mb-3">
                  <h2 className="heading">Revenue</h2>
                </div>
              </div>
              <div className="p-static">
                <div className="d-flex align-items-center mb-3 mb-sm-0">
                  <div className="round weekly" id="dzOldSeries">
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="radio"
                        value="weekly"
                      />
                      <label htmlFor="checkbox1" className="checkmark"></label>
                    </div>
                    <div>
                      <span className="fs-14">This Week</span>
                    </div>
                  </div>
                  <div className="round" id="dzNewSeries">
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox"
                        name="radio"
                        value="monthly"
                      />
                      <label htmlFor="checkbox" className="checkmark"></label>
                    </div>
                    <div>
                      <span className="fs-14">Last Week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-2 custome-tooltip pb-0 px-2">
              <SchoolPerformance />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card h-auto">
            <SchoolOverView />
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-xl-4 wow fadeInUp" data-wow-delay="1.5s">
					<div className="card">
						<div className="card-header pb-0 border-0 flex-wrap">
							<div>
								<div className="mb-3">
									<h2 className="heading mb-0">Care Calendar</h2>	
								</div>
							</div>
						</div>
						<div className="card-body text-center event-calender dz-calender py-0 px-1">							
							<DatePicker
								selected={startDate}								
								onChange={(date) => setStartDate(date)}						
								inline
								fixedHeight
							/>
						</div>
					</div>
				</div> */}
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header py-3 border-0 px-3">
              <h4 className="heading m-0">New Companies</h4>
            </div>
            <div className="card-body p-0">
              {dashboardData?.new_company_users && (
                <TeacherDetails companies={dashboardData?.new_company_users} />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-xl-12">
				<div className="card">
					<div className="card-header border-0 p-3">
						<h4 className="heading mb-0">Unpaid Student Intuition</h4>
					</div>
					<div className="card-body p-0">
						<UnpaidStudentTable />
					</div>
				</div>	
			</div>	 */}
    </>
  );
};
export default Home;
