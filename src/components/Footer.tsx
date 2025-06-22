
const Footer = () => {
  return (
    <> <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-black mb-4">
                Lem<span className="text-lemren-green">ren</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Your trusted platform for car rentals and sharing across Nigeria.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-lemren-green transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-lemren-green transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-lemren-green transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-lemren-green transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Lemren. All rights reserved.
            </p>
          </div>
        </div>
      </footer></>
  )
}

export default Footer