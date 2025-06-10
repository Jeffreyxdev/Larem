// CompanyShowcase.tsx
import CompanyCard, {type Company } from "./CompanyCard"; // Import Company as a named export

const CompanyShowcase = () => {
  const companies: Company[] = [ // This type annotation will now work
    {
      name: "Abuja Cars",
      verified: true,
      messages: [
        { type: "sent", content: "Hi, i need an SUV for an airport pickup tomorrow" },
        { type: "received", content: "Sure, your pickup has been booked" },
        { type: "received", content: "contact the driver +2347012347678" },
        { type: "sent", content: "Alright, thanks" },
      ]
    },
    {
      name: "Sarkin Moto",
      verified: true,
      messages: [
        { type: "sent", content: "Good day sarkin, i need car way civil servant no fit afford" },
        { type: "received", content: "Alright my broda i got you!" },
        { type: "received", content: "Mercedes c300 2024 model availabe" },
        { type: "sent", content: "how much habibi?" },
      ]
    },
    {
      name: "Ola of Lagos",
      verified: true,
      messages: [
         { type: "sent", content: "Goodday,I need to rent 4 range rovers for my wedding on saturday, fully paid" },
        { type: "received", content: "Please hold, i'd book an order for that in few minutes" },
        { type: "received", content: "payment confirmed, your order has been placed" },
        { type: "sent", content: "thanks" },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
      {companies.map((company, index) => (
        <CompanyCard key={index} company={company} />
      ))}
    </div>
  );
};

export default CompanyShowcase;