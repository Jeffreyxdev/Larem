export function ReasonsToStart() {
  return (
    <section className="px-4 sm:px-8 md:px-16 max-w-[1210px] mx-auto mb-25">
      <h2 className="text-center text-[40px] md:text-[48px] font-semibold mb-10">
        So many reasons to <span className="text-[#02f47f] italic">start</span>
      </h2>

      <div className="bg-gray-100 rounded-[20px] overflow-hidden p-5">
        {/* TEMPORARY BLACK BACKGROUND ILLUSTRATION */}
        <div className="bg-black h-[120px] w-full rounded-[20px] mb-5"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          <ReasonsToStartCards
            title="Wider Market Reach"
            description="Tap into a large, growing audience of online car buyers beyond
              your local showroom. Expand your brand’s visibility nationally or
              globally."
          />

          <ReasonsToStartCards
            title="Increased Sales Opportunities"
            description="More eyes on your listings means more inquiries and faster
              conversions. Our platform helps reduce inventory turn‑around time."
          />

          <ReasonsToStartCards
            title="Easy Onboarding, No Tech Skills Needed"
            description=" List your cars in minutes. Our support team helps you set up,
              upload inventory, and go live with zero stress."
          />

          <ReasonsToStartCards
            title="24/7 Sales Channel"
            description="Unlike physical dealerships, your cars are visible and shoppable 24/7—capturing 
            late‑night browsers and mobile shoppers alike."
          />
        </div>
      </div>
    </section>
  );
}

function ReasonsToStartCards({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2 lg:min-h-[50px]">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}
