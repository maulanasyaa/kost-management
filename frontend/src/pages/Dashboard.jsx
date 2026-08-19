import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="flex-col h-screen">
      <Navbar></Navbar>
      <div className="flex flex-auto h-full">
        <Sidebar></Sidebar>
        <div className="bg-red-200 flex-auto">ini dashboard</div>
      </div>
    </div>
  );
}
export default Dashboard;
