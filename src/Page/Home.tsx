
import { User } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen ">
      {/* Header Navigation */}
      <header className=" ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl  text-foreground cor">
              Lemren <span className="text-[#02f47f]">.</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Popular Listings</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Browse Cars</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Companies</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button className="bg-foreground text-background hover:bg-foreground/90">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Text Section */}
    <div className="space-y-6">
      <h1 className="text-5xl lg:text-6xl font-black cor leading-tight">
        The largest marketplace to buy, sell, rent and hire vehicles.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Join thousands of trusted users renting, buying, leasing, and selling vehicles anytime, anywhere.
      </p>
      <button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-lg rounded-full">
        View cars
      </button>
    </div>

    {/* Image Layout */}
    <div className="grid grid-cols-3 gap-4">
      <div className="aspect-[4/6] bg-muted rounded-2xl overflow-hidden">
        <img 
          src="/src/assets/white jeep.jpg" 
          alt="White SUV in modern garage" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="aspect-[4/6] bg-muted rounded-3xl overflow-hidden pt-8">
        <img 
          src="/src/assets/merc.jpg" 
          alt="Silver sports car" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="aspect-[4/6] bg-muted rounded-2xl overflow-hidden">
        <img 
          src="/src/assets/db.jpg" 
          alt="Gray Mercedes AMG GT" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-foreground">2,000+</div>
            <div className="text-muted-foreground">Cars sold over time</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-foreground">45,000+</div>
            <div className="text-muted-foreground">Rental deals closed</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-foreground">12,000+</div>
            <div className="text-muted-foreground">Vehicles hired overtime</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl lg:text-5xl font-bold text-foreground">3,000+</div>
            <div className="text-muted-foreground">Registered companies</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
