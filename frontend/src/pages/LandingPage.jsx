import Navbar from "#/components/Navbar";
import Hero from "#/components/dashboard/Hero";
import Card from "#/components/dashboard/Card";
import DataInsight from "#/components/dashboard/DataInsight";

export default function LandingPage() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Card />
        <DataInsight />
    </div>
  )
}