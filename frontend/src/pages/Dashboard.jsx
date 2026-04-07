import DashboardPagination from "#/components/dashboard/DashboardPagination"
import Footer from "#/components/Footer"
import Navbar from "#/components/Navbar"
import DashboardLayout from "#/components/dashboard/DashboardLayout"

function Dashboard() {
  return (
    <>
    <Navbar />
    <DashboardLayout>
        <DashboardPagination />
    </DashboardLayout>
    <Footer />
    </>
  )
}

export default Dashboard