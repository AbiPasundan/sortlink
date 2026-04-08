import DashboardPagination from "#/components/dashboard/DashboardPagination"
import Footer from "#/components/Footer"
import Navbar from "#/components/Navbar"
import DashboardLayout from "#/components/dashboard/DashboardLayout"
import DashboardHeader from "#/components/dashboard/DashboardHeader"
import DashboardMain from "#/components/dashboard/DashboardMain"

function Dashboard() {
  return (
    <>
    <Navbar />
    <DashboardLayout>
        <DashboardHeader />
        <DashboardMain />
        <DashboardPagination />
    </DashboardLayout>
    <Footer />
    </>
  )
}

export default Dashboard