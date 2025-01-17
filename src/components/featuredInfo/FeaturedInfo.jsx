import "./featuredInfo.css";
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';


export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,200</span>
          <span className="featuredMoneyRate">
            +5.8 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">New Subscriptions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">1,200</span>
          <span className="featuredMoneyRate">
            +8.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Active Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10,500</span>
          <span className="featuredMoneyRate">
            -3.2 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
