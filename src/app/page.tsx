import ReferenceForm from "@/components/Form";
import Script from "next/script";

export default function Home() {
  return (
    <div className="h-full bg-gray-50 flex items-center justify-center ">
      <Script
        src="https://eia.followupboss.com/embeddedApps-v1.0.1.js"
        strategy="beforeInteractive"
      />
      <ReferenceForm />
    </div>
  );
}
