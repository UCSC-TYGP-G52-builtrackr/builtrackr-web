import React from "react";
import SiteCard from '../../components/SiteManager/SiteCard';
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";

const sites = [
  { id: 1, name: "Kumbuka" },
  { id: 2, name: "NSBM" },
  { id: 3, name: "Kithulgala" },
  { id: 4, name: "Havelock" },
  { id: 5, name: "Horana" },
  { id: 6, name: "Ragama" },
];


const SiteDashboard = () => {
  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]">
    <div className="dashboard  items-center justify-center flex flex-wrap gap-2 p-2">
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} className="min-w-[300px] max-w-[300px]"/>
      ))}
      
    </div>
    </div>
    </div>
    </>
  );
};

export default SiteDashboard;
