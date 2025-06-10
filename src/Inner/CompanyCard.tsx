// CompanyCard.tsx
import { Check } from "lucide-react";

export interface Message {
  type: "sent" | "received";
  content: string;
}

export interface Company {
  name: string;
  verified: boolean;
  messages: Message[];
}

export interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-lg mt-10">
      {/* Header */}
      <div className="bg-black/90 text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{company.name}</span>
          {company.verified && (
            <div className="bg-blue-500 rounded-full p-1">
              <Check size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="bg-gray-100 p-6 h-84 flex flex-col justify-end gap-3">
        {company.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg text-sm max-w-[80%] ${ // Added padding, text-size, max-width
                message.type === "sent"
                  ? "bg-green-500 text-white self-end" 
                  : "bg-gray-300 text-gray-800 self-start" 
              }`}
            >
              {message.content} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;