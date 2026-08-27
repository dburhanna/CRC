import RealityDashboard from "@/components/RealityDashboard";

export default function Home() {
  return (
    <main className="shell">
      <header className="hero">
        <div className="eyebrow">CRC Production v0.3 — Sprint S3</div>
        <h1>Curriculum Reality Check</h1>
        <p className="lede">Edit real curriculum durations, configure abbreviated and exam-day schedules, and watch every affected Reality Check recalculate immediately.</p>
      </header>
      <RealityDashboard />
    </main>
  );
}
