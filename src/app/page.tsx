import ReferenceForm from "@/components/Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <script
        type="text/javascript"
        src="https://eia.followupboss.com/embeddedApps-v1.0.1.js"
        defer
      ></script>
      <ReferenceForm />
    </div>
  );
}
