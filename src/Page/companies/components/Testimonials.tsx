type DataProps = {
  data: {
    blockQuote: string;
    avatar: string;
    name: string;
  };
};

export function Testimonials() {
  const TestimonialsData = [
    {
      blockQuote:
        "When a company responds quickly and politely to inquiries, it shows they actually value customers. I'm more likely to buy from a dealer that treats me with respect and urgency.",
      avatar: "/src/assets/avatar-1.jpg",
      name: "Austin D.",
    },
    {
      blockQuote:
        "If a company offers flexible payment or financing options, that's a game changer. It shows they understand not every buyer can pay all at once and that makes me want to buy from them.",
      avatar: "/src/assets/avatar-2.jpg",
      name: "Richard S.",
    },
    {
      blockQuote:
        "Seeing warranty information, service history, or any kind of after sale support from a company gives me peace of mind. It tells me they're not just trying to sell and disappear.",
      avatar: "/src/assets/avatar-3.jpg",
      name: "Jeffrey A.",
    },
    {
      blockQuote:
        "I respect companies that are honest about a car's condition even if it has minor issues. That level of transparency builds trust and helps me make faster decisions.",
      avatar: "/src/assets/avatar-4.jpg",
      name: "McJolly P.",
    },
  ];
  return (
    <section className="max-w-[1300px] mx-auto mb-25">
      <div className="mx-6">
        <h2 className="text-center text-[40px] md:text-[48px] mb-10 font-semibold max-w-150 mx-auto">
          What are <span className="text-[#02f47f] italic">customers</span>{" "}
          looking out for?
        </h2>
        <ul className="flex justify-center items-center gap-5">
          {TestimonialsData.map((data, index) => (
            <TestimonialCard data={data} key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({ data }: DataProps) {
  const { blockQuote, avatar, name } = data;
  return (
    <li className="bg-gray-100 rounded-[15px] px-5">
      <blockquote className="text-sm mt-7">{blockQuote}</blockquote>
      <figure className="flex items-center gap-3 my-5">
        <img
          src={avatar}
          className="w-10 h-10 rounded-full"
          alt={`${name} avatar`}
        />
        <figcaption className="font-medium">{name}</figcaption>
      </figure>
    </li>
  );
}
